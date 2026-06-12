function attach(shoukaku) {
  if (!shoukaku || shoukaku.__attached) return;
  shoukaku.__attached = true;

  shoukaku.on("ready", (name) => {
    console.log("🟢 SHOUKAKU CONNECTED:", name);
  });

  shoukaku.on("error", (name, err) => {
    console.log("🔴 SHOUKAKU ERROR:", name, err?.message || err);
  });

  shoukaku.on("disconnect", (name) => {
    console.log("🟠 DISCONNECT:", name);
  });

  shoukaku.on("close", (name) => {
    console.log("🟡 CLOSE:", name);
  });

  shoukaku.on("debug", (msg) => {
    if (process.env.DEBUG_SHOUKAKU === "true") {
      console.log("🔵 DEBUG:", msg);
    }
  });
}

module.exports = attach;
