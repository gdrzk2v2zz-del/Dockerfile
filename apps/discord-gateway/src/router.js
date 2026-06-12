
// =======================
// 🌐 UI + COMMAND ROUTER
// =======================

module.exports = (client, handlers) => {

  client.on("interactionCreate", async (i) => {

    try {

      if (!i.isChatInputCommand() && !i.isButton()) return;

      const cmd = i.commandName || i.customId;

      if (handlers[cmd]) {
        return handlers[cmd](i);
      }

    } catch (e) {
      console.error("[ROUTER ERROR]", e);
    }

  });

};

