const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB Connection
const uri = "mongodb+srv://City-Pulse:01234567890@city-pulse.4q6bd32.mongodb.net/?retryWrites=true&w=majority&appName=City-Pulse";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error: ", err));

// MongoDB Schema for Reports
const reportSchema = new mongoose.Schema({
  reporterId: String,
  contact: String,
  description: String,
  photoUrl: String,
  location: {
    lat: Number,
    lng: Number
  },
  kind: String,
  status: {
    type: String,
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model('Report', reportSchema);

// MongoDB Schema for Projects
const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  status: String,
  location: {
    lat: Number,
    lng: Number
  },
  startedAt: Date,
  expectedCompletion: Date,
  lastUpdatedAt: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project', projectSchema);

// MongoDB Schema for Alerts
const alertSchema = new mongoose.Schema({
  type: String,
  severity: String,
  message: String,
  location: {
    lat: Number,
    lng: Number
  },
  source: {
    type: String,
    default: 'authority'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Alert = mongoose.model('Alert', alertSchema);

// MongoDB Schema for Congestion
const congestionSchema = new mongoose.Schema({
  location: {
    lat: Number,
    lng: Number
  },
  level: Number,
  causeHint: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Congestion = mongoose.model('Congestion', congestionSchema);

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// In-memory state (replace with DB in production)
const state = {
  projects: [],
  alerts: [],
  reports: [],
  congestion: [],
};

// SSE clients
/** @type {Array<{id:string, res:import('express').Response}>} */
const sseClients = [];

function broadcast(event, data) {
  const payload = `event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach((client) => {
    try {
      client.res.write(payload);
    } catch (_) {/* noop */}
  });
}

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// Get full public state
app.get('/state', async (_req, res) => {
  try {
    const [projects, alerts, reports, congestion] = await Promise.all([
      Project.find(),
      Alert.find(),
      Report.find(),
      Congestion.find()
    ]);
    
    res.json({
      projects: projects.map(p => p.toObject()),
      alerts: alerts.map(a => a.toObject()),
      reports: reports.map(r => r.toObject()),
      congestion: congestion.map(c => c.toObject())
    });
  } catch (error) {
    console.error('Error fetching state:', error);
    res.status(500).json({ error: 'Failed to fetch state' });
  }
});

// Projects CRUD (minimal)
app.post('/projects', async (req, res) => {
  try {
    const { name, description, category, status: projStatus, location, startedAt, expectedCompletion } = req.body || {};
    if (!name || !category || !projStatus || !location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      return res.status(400).json({ error: 'Invalid project payload' });
    }
    
    const project = new Project({
      name,
      description,
      category,
      status: projStatus,
      location,
      startedAt,
      expectedCompletion,
      lastUpdatedAt: new Date()
    });
    
    await project.save();
    broadcast('project.created', project);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Alerts (authority or system)
app.post('/alerts', async (req, res) => {
  try {
    const { type, severity, message, location, source } = req.body || {};
    if (!type || !severity || !message || !location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      return res.status(400).json({ error: 'Invalid alert payload' });
    }
    
    const alert = new Alert({
      type,
      severity,
      message,
      location,
      source: source || 'authority'
    });
    
    await alert.save();
    broadcast('alert.created', alert);
    res.status(201).json(alert);
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
});

// Citizen reports
app.post('/reports', async (req, res) => {
  try {
    const { reporterId, contact, description, photoUrl, location, kind } = req.body || {};
    if (!description || !kind || !location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      return res.status(400).json({ error: 'Invalid report payload' });
    }
    
    const report = new Report({
      reporterId,
      contact,
      description,
      photoUrl,
      location,
      kind,
      status: 'new'
    });
    
    await report.save();
    broadcast('report.created', report);
    res.status(201).json(report);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Failed to create report' });
  }
});

// Get all reports
app.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Update report status
app.patch('/reports/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['new', 'in_progress', 'resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    const report = await Report.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true, runValidators: true }
    );
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    broadcast('report.updated', report);
    res.json(report);
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Failed to update report' });
  }
});

// Congestion snapshot
app.post('/congestion', async (req, res) => {
  try {
    const { location, level, causeHint } = req.body || {};
    if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number' || typeof level !== 'number') {
      return res.status(400).json({ error: 'Invalid congestion payload' });
    }
    
    const snapshot = new Congestion({
      location,
      level: Math.max(0, Math.min(5, Math.round(level))),
      causeHint
    });
    
    await snapshot.save();
    broadcast('congestion.created', snapshot);
    res.status(201).json(snapshot);
  } catch (error) {
    console.error('Error creating congestion snapshot:', error);
    res.status(500).json({ error: 'Failed to create congestion snapshot' });
  }
});

// Simple seed route for demo
app.post('/seed/demo', async (_req, res) => {
  try {
    const now = new Date();
    
    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Alert.deleteMany({}),
      Congestion.deleteMany({})
    ]);
    
    // Create demo projects
    const projects = await Project.create([
      { name: 'Ring Road Expansion', category: 'road', status: 'ongoing', location: { lat: 28.6139, lng: 77.2090 }, lastUpdatedAt: now },
      { name: 'Community Health Center', category: 'public_infra', status: 'planned', location: { lat: 28.5355, lng: 77.3910 }, lastUpdatedAt: now },
      { name: 'Sunrise Apartments', category: 'real_estate', status: 'completed', location: { lat: 28.7041, lng: 77.1025 }, lastUpdatedAt: now }
    ]);
    
    // Create demo alerts
    const alerts = await Alert.create([
      { type: 'closure', severity: 'warning', message: 'Road closure near Sector 18', location: { lat: 28.567, lng: 77.321 }, source: 'authority' }
    ]);
    
    // Create demo congestion
    const congestion = await Congestion.create([
      { location: { lat: 28.61, lng: 77.23 }, level: 4, causeHint: 'Peak hour' }
    ]);
    
    broadcast('seed.loaded', { ok: true });
    res.json({ ok: true, projects, alerts, congestion });
  } catch (error) {
    console.error('Error seeding demo data:', error);
    res.status(500).json({ error: 'Failed to seed demo data' });
  }
});

// SSE endpoint
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders && res.flushHeaders();

  const clientId = nanoid();
  sseClients.push({ id: clientId, res });
  res.write(`event: hello\n` + `data: ${JSON.stringify({ ok: true, clientId })}\n\n`);

  req.on('close', () => {
    const idx = sseClients.findIndex((c) => c.id === clientId);
    if (idx >= 0) sseClients.splice(idx, 1);
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server running on http://localhost:${PORT}`);
});


