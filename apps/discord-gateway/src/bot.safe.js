require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const createShoukaku = require("../../../services/lavalink");

console.log("BOOT PID:", process.pid);

// ===== Discord client =====
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

// ===== 重複起動防止 =====
if (global.__BOT_RUNNING__) {
  console.log("❌ Bot already running (prevent duplicate)");
  process.exit(1);
}
global.__BOT_RUNNING__ = true;

// ===== Discord ready =====
client.once("ready", () => {
  console.log("🟢 DISCORD READY:", client.user.tag);
});

// ===== Shoukaku init =====
const shoukaku = createShoukaku(client);

// ===== グローバルエラー吸収（クラッシュ防止） =====
process.on("unhandledRejection", (err) => {
  console.error("⚠️ unhandledRejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("⚠️ uncaughtException:", err);
});

client.login(process.env.TOKEN);
