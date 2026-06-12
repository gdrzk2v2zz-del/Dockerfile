const { Shoukaku, Connectors } = require("shoukaku");

let instance;

module.exports = function createShoukaku(client) {
  console.log("🔥 CREATE SHOUKAKU CALLED");
  if (global.__SHOUKAKU__) return global.__SHOUKAKU__;

  const nodes = [
    {
      name: "lavalink",
      url: `${"dockerfile-73aj.onrender.com"}:${"443"}`,
      auth: "youshallnotpass",
      secure: "true" === "true"
    }
  ];

  console.log("HOST:", "dockerfile-73aj.onrender.com");
  console.log("PORT:", "443");
  console.log("SECURE:", "true");
  console.log(
    "PASSWORD:",
    "youshallnotpass" ? "SET" : "MISSING"
  );
  console.log(
    "NODE URL:",
    `${"dockerfile-73aj.onrender.com"}:${"443"}`
  );

  instance = new Shoukaku(
    new Connectors.DiscordJS(client),
    nodes,
    {
      moveOnDisconnect: true,
      resume: true,
      resumeTimeout: 60,
      reconnectTries: Infinity,
      reconnectInterval: 5000
    }
  );

  global.__SHOUKAKU__ = instance;

  instance.on("ready", (name) => {
    console.log("🟢 SHOUKAKU CONNECTED:", name);
  });

  instance.on("error", (_name, err) => {
    console.error("🔴 SHOUKAKU ERROR:", err?.message || err);
  });

  instance.on("disconnect", () => {
    console.warn("🟠 SHOUKAKU DISCONNECTED");
  });

  return instance;
};
