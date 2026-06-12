require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "play",
    description: "音楽再生",
    options: [
      {
        name: "query",
        type: 3,
        required: true,
        description: "曲名 or URL"
      }
    ]
  },
  {
    name: "skip",
    description: "スキップ"
  },
  {
    name: "queue",
    description: "キュー表示"
  },
  {
    name: "stop",
    description: "停止"
  },
  {
    name: "nowplaying",
    description: "現在再生中"
  }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Deploying commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("Done");
  } catch (e) {
    console.error(e);
  }
})();
