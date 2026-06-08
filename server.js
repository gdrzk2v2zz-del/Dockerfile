const http = require("http");

const PORT = 5000;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>rf-studio — High Availability Discord Music Bot</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: #0d1117;
      color: #e6edf3;
      min-height: 100vh;
      padding: 2rem;
    }
    header {
      text-align: center;
      margin-bottom: 2.5rem;
    }
    header h1 {
      font-size: 2.4rem;
      font-weight: 700;
      color: #58a6ff;
      letter-spacing: -0.5px;
    }
    header p {
      color: #8b949e;
      margin-top: 0.4rem;
      font-size: 1rem;
    }
    .badge {
      display: inline-block;
      background: #21262d;
      border: 1px solid #30363d;
      border-radius: 999px;
      padding: 0.2rem 0.75rem;
      font-size: 0.78rem;
      color: #3fb950;
      margin-top: 0.6rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      max-width: 1100px;
      margin: 0 auto;
    }
    .card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 10px;
      padding: 1.25rem 1.5rem;
    }
    .card h2 {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #8b949e;
      margin-bottom: 0.9rem;
    }
    .arch-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .arch-list li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }
    .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .dot.blue  { background: #58a6ff; }
    .dot.green { background: #3fb950; }
    .dot.yellow{ background: #d29922; }
    .dot.purple{ background: #bc8cff; }
    .dot.red   { background: #f85149; }
    .dot.gray  { background: #8b949e; }
    .arrow {
      text-align: center;
      color: #444c56;
      font-size: 1.1rem;
      margin: 0.15rem 0;
    }
    pre {
      background: #0d1117;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 0.75rem;
      font-size: 0.78rem;
      color: #e6edf3;
      overflow-x: auto;
      line-height: 1.6;
    }
    .plugin-tag {
      display: inline-block;
      background: #1f2937;
      border: 1px solid #374151;
      border-radius: 4px;
      padding: 0.2rem 0.55rem;
      font-size: 0.78rem;
      color: #93c5fd;
      margin: 0.2rem;
    }
    .mode-badge {
      background: #0d419d22;
      border: 1px solid #1f6feb;
      border-radius: 4px;
      padding: 0.15rem 0.5rem;
      font-size: 0.78rem;
      color: #58a6ff;
    }
    .env-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.3rem 0;
      border-bottom: 1px solid #21262d;
      font-size: 0.82rem;
    }
    .env-row:last-child { border-bottom: none; }
    .env-key { color: #8b949e; }
    .env-val { color: #3fb950; font-family: monospace; }
    .env-val.warn { color: #d29922; }
    footer {
      text-align: center;
      color: #484f58;
      font-size: 0.78rem;
      margin-top: 2.5rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>rf-studio</h1>
    <p>High Availability Discord Music / Bot System</p>
    <span class="badge">● Project Dashboard</span>
  </header>

  <div class="grid">

    <!-- Architecture Flow -->
    <div class="card">
      <h2>Architecture Flow</h2>
      <ul class="arch-list">
        <li><span class="dot blue"></span>Discord Bot</li>
        <li class="arrow">↓</li>
        <li><span class="dot blue"></span>Orchestrator</li>
        <li class="arrow">↓</li>
        <li><span class="dot blue"></span>Shard Manager</li>
        <li class="arrow">↓</li>
        <li><span class="dot purple"></span>Event Bus (Redis Streams)</li>
        <li class="arrow">↓</li>
        <li><span class="dot yellow"></span>Playback Router</li>
        <li class="arrow">↓</li>
        <li><span class="dot green"></span>Lavalink Cluster</li>
        <li><span style="margin-left:1.2rem;font-size:0.82rem;color:#8b949e;">├─ Primary (port 2333)</span></li>
        <li><span style="margin-left:1.2rem;font-size:0.82rem;color:#8b949e;">└─ Backup  (port 2334)</span></li>
      </ul>
    </div>

    <!-- Lavalink Config -->
    <div class="card">
      <h2>Lavalink Configuration</h2>
      <div class="env-row"><span class="env-key">Version</span><span class="env-val">4.0.8</span></div>
      <div class="env-row"><span class="env-key">Port</span><span class="env-val">2333</span></div>
      <div class="env-row"><span class="env-key">Buffer Duration</span><span class="env-val">400 ms</span></div>
      <div class="env-row"><span class="env-key">Frame Buffer</span><span class="env-val">5000 ms</span></div>
      <div class="env-row"><span class="env-key">Opus Quality</span><span class="env-val">10 (high)</span></div>
      <div class="env-row"><span class="env-key">Resampling</span><span class="env-val">LOW</span></div>
      <div class="env-row"><span class="env-key">Playlist Limit</span><span class="env-val">6 tracks</span></div>
      <div class="env-row"><span class="env-key">Sources</span><span class="env-val">YouTube, SoundCloud, HTTP</span></div>
    </div>

    <!-- Cluster Config -->
    <div class="card">
      <h2>Cluster &amp; Failover</h2>
      <div class="env-row"><span class="env-key">Mode</span><span class="env-val"><span class="mode-badge">failover</span></span></div>
      <div class="env-row"><span class="env-key">Nodes</span><span class="env-val">primary, backup</span></div>
      <div class="env-row"><span class="env-key">Health Check</span><span class="env-val">every 5 s</span></div>
      <div class="env-row"><span class="env-key">Failover Timeout</span><span class="env-val">3 s</span></div>
      <div class="env-row"><span class="env-key">Retry Count</span><span class="env-val">3</span></div>
      <div class="env-row"><span class="env-key">Retry Backoff</span><span class="env-val">500 ms</span></div>
      <div class="env-row"><span class="env-key">Fallback</span><span class="env-val">enabled</span></div>
      <div class="env-row"><span class="env-key">Event Bus</span><span class="env-val">Redis Streams</span></div>
    </div>

    <!-- Infrastructure Services -->
    <div class="card">
      <h2>Infrastructure Services</h2>
      <ul class="arch-list">
        <li><span class="dot green"></span>Redis — event bus &amp; caching</li>
        <li><span class="dot blue"></span>PostgreSQL — persistent storage</li>
        <li><span class="dot yellow"></span>Prometheus — metrics (port 9090)</li>
        <li><span class="dot purple"></span>Grafana — dashboards (port 3001)</li>
        <li><span class="dot gray"></span>Lavalink Primary (port 2333)</li>
        <li><span class="dot gray"></span>Lavalink Backup (port 2334)</li>
      </ul>
    </div>

    <!-- Plugins -->
    <div class="card">
      <h2>Pinned Plugins</h2>
      <p style="font-size:0.82rem;color:#8b949e;margin-bottom:0.75rem;">Plugin versions are locked to ensure Lavalink 4.0.8 compatibility.</p>
      <div>
        <span class="plugin-tag">youtube-plugin v1.11.5</span>
        <span class="plugin-tag">lavasrc-plugin v4.0.0</span>
        <span class="plugin-tag">lavasearch-plugin v1.0.0</span>
      </div>
    </div>

    <!-- Quick Start -->
    <div class="card">
      <h2>Quick Start (Docker)</h2>
      <pre>
# Start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Health check
curl http://localhost:2333/v4/info

# Stop
docker compose down</pre>
    </div>

    <!-- Observability Endpoints -->
    <div class="card">
      <h2>Observability Endpoints</h2>
      <div class="env-row"><span class="env-key">Lavalink API</span><span class="env-val">:2333/v4/info</span></div>
      <div class="env-row"><span class="env-key">Metrics</span><span class="env-val">:2333/metrics</span></div>
      <div class="env-row"><span class="env-key">Prometheus</span><span class="env-val">:9090</span></div>
      <div class="env-row"><span class="env-key">Grafana</span><span class="env-val">:3001 (admin/admin)</span></div>
      <div class="env-row"><span class="env-key">Shard Manager</span><span class="env-val">:3000</span></div>
    </div>

    <!-- Failover Flow -->
    <div class="card">
      <h2>Failover Flow</h2>
      <ul class="arch-list" style="font-size:0.85rem;">
        <li><span class="dot red"></span>Primary Lavalink goes DOWN</li>
        <li class="arrow">↓</li>
        <li><span class="dot yellow"></span>Playback Router detects failure</li>
        <li class="arrow">↓</li>
        <li><span class="dot green"></span>Automatic switch to Backup</li>
        <li class="arrow">↓</li>
        <li><span class="dot blue"></span>Bot reconnects automatically</li>
      </ul>
    </div>

  </div>

  <footer>rf-studio &mdash; Private / Internal Use &mdash; Lavalink v4.0.8 &mdash; Node 20</footer>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`rf-studio dashboard running on http://0.0.0.0:${PORT}`);
});
