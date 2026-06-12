const Database = require("better-sqlite3");
const db = new Database("./music.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS states (
  guildId TEXT PRIMARY KEY,
  data TEXT
)
`).run();

const players = new Map();

function load(guildId) {
  const row = db.prepare("SELECT data FROM states WHERE guildId=?").get(guildId);
  return row ? JSON.parse(row.data) : null;
}

function save(guildId, state) {
  db.prepare(`
    INSERT INTO states (guildId, data)
    VALUES (?, ?)
    ON CONFLICT(guildId) DO UPDATE SET data=excluded.data
  `).run(guildId, JSON.stringify(state));
}

function getState(guildId) {
  if (!players.has(guildId)) {
    const saved = load(guildId);

    players.set(guildId, saved || {
      player: null,
      loop: "off",
      autoplay: false,
      queue: [],
      now: null,
    });
  }
  return players.get(guildId);
}

function setPlayer(guildId, player) {
  const state = getState(guildId);
  state.player = player;
  save(guildId, state);
}

module.exports = { getState, setPlayer, save };
