const { Shoukaku, Connectors } = require("shoukaku");
const buildNodes = require("./nodes");

function createShoukaku(client) {
  if (global.__SHOUKAKU__) {
    console.log("⚠️ Shoukaku already exists (reuse)");
    return global.__SHOUKAKU__;
  }

  console.log("🧠 Shoukaku init (multi-fallback mode)");

  const shoukaku = new Shoukaku(
    new Connectors.DiscordJS(client),
    buildNodes(),
    {
      moveOnDisconnect: true,
      resume: true,
      resumeTimeout: 60,
      reconnectTries: Infinity,
      reconnectInterval: 5000,
      restTimeout: 20000,
      /**
       * 重要：接続失敗時でも落とさない
       */
      strict: false
    }
  );

  global.__SHOUKAKU__ = shoukaku;

  return shoukaku;
}

module.exports = createShoukaku;
