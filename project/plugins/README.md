rf-studio

High availability Discord Music / Bot system

Distributed Lavalink + Discord shard + failover architecture.

⸻

Requirements

* Docker
* Docker Compose
* 2GB+ RAM recommended
* Linux VPS recommended for production

⸻

Start

docker compose up -d --build

⸻

Stop

docker compose down

⸻

Logs

docker compose logs -f

⸻

Architecture

Discord Bot
    ↓
Orchestrator
    ↓
Shard Manager
    ↓
Event Bus (Redis Streams)
    ↓
Playback Router
    ↓
Lavalink Cluster
 ├─ Primary
 └─ Backup

⸻

Components

Core

* discord-music
* discord-quiz
* discord-orchestrator

Infrastructure

* Redis
* PostgreSQL
* Lavalink

Routing

* playback-router
* edge-gateway

Monitoring

* Prometheus
* Grafana

⸻

Plugin Compatibility

Supported plugins:

* youtube-plugin.jar
* lavasrc-plugin.jar
* lavasearch-plugin.jar

Important:

* Keep plugin versions pinned
* Match plugin versions with Lavalink version
* Never auto-download plugins in production

⸻

Healthcheck

Container health status:

docker ps

Manual Lavalink check:

curl http://localhost:2333/v4/info

Prometheus metrics:

curl http://localhost:2333/metrics

⸻

Backup / Restore

Backup

bash scripts/backup.sh

Restore

bash scripts/restore.sh

Backups are stored in:

/project/backups

⸻

Monitoring

Prometheus

http://localhost:9090

Grafana

http://localhost:3001

Default Grafana credentials:

admin / admin

Change immediately in production.

⸻

Failover Flow

Primary Lavalink DOWN
        ↓
Playback Router detects failure
        ↓
Automatic switch to Backup Lavalink
        ↓
Bot reconnects automatically

⸻

Production Recommendations

Recommended

* Reverse proxy (Nginx / Traefik)
* Cloudflare
* Managed PostgreSQL
* Redis Sentinel
* VPS with SSD storage
* Daily backups

Avoid

* Auto-downloading plugins
* Running as root
* Exposing Lavalink publicly
* Using default passwords

⸻

Troubleshooting

Lavalink not starting

Check:

docker compose logs lavalink-primary

Common causes:

* invalid plugin
* invalid application.yml
* wrong Java version

⸻

Bot cannot connect

Check:

* TOKEN
* CLIENT_ID
* Lavalink password
* firewall
* Discord intents

⸻

Audio stuttering

Increase:

bufferDurationMs
frameBufferDurationMs

Reduce:

youtubePlaylistLoadLimit

⸻

Directory Structure

project/
├─ plugins/
├─ src/
├─ scripts/
├─ configs/
├─ logs/
├─ backups/
├─ Dockerfile
├─ docker-compose.yml
├─ application.yml
├─ .env
└─ README.md

⸻

License

Private / Internal Use
