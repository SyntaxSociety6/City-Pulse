const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

// Health endpoint for this web server
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// Fallback to frontend index for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`CityPulse web server running on http://localhost:${PORT}`);
});

module.exports = app;
