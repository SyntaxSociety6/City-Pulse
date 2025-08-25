import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMapEvents } from 'react-leaflet'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

function useEventStream(onEvent) {
  useEffect(() => {
    const es = new EventSource(`${API_BASE}/events`)
    es.onmessage = () => {
      // default message
    }
    const handler = (type) => (event) => {
      try { onEvent && onEvent(type, JSON.parse(event.data)) } catch (error) {
        console.warn('Failed to parse event data:', error)
      }
    }
    es.addEventListener('project.created', handler('project.created'))
    es.addEventListener('alert.created', handler('alert.created'))
    es.addEventListener('report.created', handler('report.created'))
    es.addEventListener('congestion.created', handler('congestion.created'))
    return () => es.close()
  }, [onEvent])
}

function ClickCapture({ onClick }) {
  useMapEvents({
    click(e) {
      onClick && onClick({ lat: e.latlng.lat, lng: e.latlng.lng })
    }
  })
  return null
}

function App() {
  const [state, setState] = useState({ projects: [], alerts: [], reports: [], congestion: [] })
  const [selectedPos, setSelectedPos] = useState(null)
  const [reportText, setReportText] = useState('')
  const [reportKind, setReportKind] = useState('other')
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const loadingRef = useRef(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`${API_BASE}/state`)
      const data = await res.json()
      setState(data)
    })()
  }, [])

  useEventStream((_type, payload) => {
    setState((prev) => {
      if (payload?.location) {
        if (payload.level !== undefined) return { ...prev, congestion: [...prev.congestion, payload] }
        if (payload.severity) return { ...prev, alerts: [...prev.alerts, payload] }
        if (payload.kind) return { ...prev, reports: [...prev.reports, payload] }
        return prev
      }
      if (payload?.status && payload?.name) return { ...prev, projects: [...prev.projects, payload] }
      return prev
    })
  })

  const center = useMemo(() => ({ lat: 28.6139, lng: 77.2090 }), [])

  async function submitReport() {
    if (!selectedPos || !reportText.trim() || loadingRef.current) return
    loadingRef.current = true
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: reportText, kind: reportKind, location: selectedPos })
      })
      if (!res.ok) throw new Error('Failed')
      setReportText('')
      setSelectedPos(null)
    } finally {
      loadingRef.current = false
    }
  }

  return (
    <div className="app-container">
      {/* Top Search Bar - Google Maps Style */}
      <div className="top-search-bar">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search for places, projects, or reports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Toggle Side Panel Button */}
      <button 
        className="toggle-panel-btn"
        onClick={() => setSidePanelOpen(!sidePanelOpen)}
      >
        {sidePanelOpen ? '✕' : '☰'} Menu
      </button>

      {/* Floating Action Button */}
      <button 
        className="fab"
        onClick={() => fetch(`${API_BASE}/seed/demo`, { method: 'POST' })}
        title="Load Demo Data"
      >
        📊
      </button>

      {/* Map Section */}
      <div className="map-section">
        <MapContainer center={center} zoom={12} className="map-container">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          <ClickCapture onClick={setSelectedPos} />

          {state.projects.map(p => (
            <Marker key={p.id} position={[p.location.lat, p.location.lng]}>
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#202124' }}>{p.name}</h4>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Status: <span style={{ fontWeight: '600', color: p.status === 'completed' ? '#137333' : p.status === 'ongoing' ? '#1a73e8' : '#ea8600' }}>{p.status}</span></p>
                  <p style={{ margin: '0', fontSize: '12px', color: '#5f6368' }}>Category: {p.category.replace('_', ' ')}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {state.alerts.map(a => (
            <Marker key={a.id} position={[a.location.lat, a.location.lng]}>
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#202124' }}>{a.type.replace('_', ' ')}</h4>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{a.message}</p>
                  <p style={{ margin: '0', fontSize: '12px', color: '#5f6368' }}>Severity: <span style={{ fontWeight: '600', color: a.severity === 'critical' ? '#c5221f' : a.severity === 'warning' ? '#ea8600' : '#1a73e8' }}>{a.severity}</span></p>
                </div>
              </Popup>
            </Marker>
          ))}

          {state.reports.map(r => (
            <Marker key={r.id} position={[r.location.lat, r.location.lng]}>
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#202124' }}>Report: {r.kind.replace('_', ' ')}</h4>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{r.description}</p>
                  <p style={{ margin: '0', fontSize: '12px', color: '#5f6368' }}>Status: <span style={{ fontWeight: '600', color: r.status === 'resolved' ? '#137333' : r.status === 'in_progress' ? '#1a73e8' : '#ea8600' }}>{r.status.replace('_', ' ')}</span></p>
                </div>
              </Popup>
            </Marker>
          ))}

          {state.congestion.map(c => (
            <CircleMarker key={c.id} center={[c.location.lat, c.location.lng]} radius={6 + c.level * 2} pathOptions={{ color: '#c5221f', fillColor: '#c5221f', fillOpacity: 0.7 }}>
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#202124' }}>Congestion Level: {c.level}/5</h4>
                  {c.causeHint && <p style={{ margin: '0', fontSize: '14px' }}>Cause: {c.causeHint}</p>}
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {selectedPos && (
            <CircleMarker center={[selectedPos.lat, selectedPos.lng]} radius={8} pathOptions={{ color: '#1a73e8', fillColor: '#1a73e8', fillOpacity: 0.8 }} />
          )}
        </MapContainer>
      </div>

      {/* Side Panel - Google Maps Style */}
      <div className={`side-panel ${sidePanelOpen ? 'open' : ''}`}>
        <div className="side-panel-header">
          <h2>CityPulse</h2>
          <p>Urban Growth & Infrastructure Tracker</p>
        </div>

        <div className="side-panel-content">
          <div className="form-group">
            <label className="form-label">Report an Issue</label>
            <p style={{ fontSize: '12px', color: '#5f6368', marginBottom: '16px' }}>Click on the map to choose a location</p>
            
            <div className="form-group">
              <label className="form-label">Issue Type</label>
              <select className="form-select" value={reportKind} onChange={(e) => setReportKind(e.target.value)}>
                <option value="pothole">🕳️ Pothole</option>
                <option value="waterlogging">💧 Waterlogging</option>
                <option value="accident">🚨 Accident</option>
                <option value="closure">🚧 Road Closure</option>
                <option value="power">⚡ Power Outage</option>
                <option value="sewage">🚽 Sewage Overflow</option>
                <option value="other">❓ Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                className="form-textarea" 
                rows={4} 
                placeholder="Describe the issue in detail..." 
                value={reportText} 
                onChange={(e) => setReportText(e.target.value)} 
              />
            </div>

            <button 
              className="btn btn-full" 
              disabled={!selectedPos || !reportText.trim()} 
              onClick={submitReport}
            >
              📝 Submit Report
            </button>

            {selectedPos && (
              <div className="location-info">
                📍 Selected: {selectedPos.lat.toFixed(4)}, {selectedPos.lng.toFixed(4)}
              </div>
            )}
          </div>

          <div className="stats-section">
            <h3>Live Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{state.projects.length}</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{state.alerts.length}</div>
                <div className="stat-label">Alerts</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{state.reports.length}</div>
                <div className="stat-label">Reports</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{state.congestion.length}</div>
                <div className="stat-label">Congestion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
