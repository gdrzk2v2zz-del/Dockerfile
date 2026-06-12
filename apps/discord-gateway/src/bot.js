require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const initShoukaku = require("../../../services/lavalink");

if (global.__BOT_RUNNING__) {
  console.log("⚠️ Bot already running");
console.log("ENV DEBUG:", {TOKEN: !!process.env.TOKEN, LAVA: !!process.env.LAVALINK_PASSWORD});
  process.exit(1);
}
global.__BOT_RUNNING__ = true;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

console.log("BOOT PID:", process.pid);
console.log("ENV DEBUG:", {TOKEN: !!process.env.TOKEN, LAVA: !!process.env.LAVALINK_PASSWORD});

client.once("ready", () => {
  console.log("🟢 DISCORD READY:", client.user.tag);
console.log("ENV DEBUG:", {TOKEN: !!process.env.TOKEN, LAVA: !!process.env.LAVALINK_PASSWORD});
});

initShoukaku(client);

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

client.login(process.env.TOKEN);

console.log("STEP 1");
console.log("ENV DEBUG:", {TOKEN: !!process.env.TOKEN, LAVA: !!process.env.LAVALINK_PASSWORD});

client.once("ready", () => {
  console.log("STEP 2 READY");
console.log("ENV DEBUG:", {TOKEN: !!process.env.TOKEN, LAVA: !!process.env.LAVALINK_PASSWORD});
});

console.log("STEP 3");
console.log("ENV DEBUG:", {TOKEN: !!process.env.TOKEN, LAVA: !!process.env.LAVALINK_PASSWORD});


const createShoukaku = require("../../../services/lavalink");

if (!global.__SHOUKAKU_INIT__) {
  global.__SHOUKAKU_INIT__ = true;
  createShoukaku(client);
}

