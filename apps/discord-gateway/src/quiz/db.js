
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./quiz.db");

db.run(`
CREATE TABLE IF NOT EXISTS quiz_score (
  guild_id TEXT,
  user_id TEXT,
  score INTEGER DEFAULT 0
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS quiz_speed (
  guild_id TEXT,
  user_id TEXT,
  time INTEGER
)
`);

module.exports = db;

