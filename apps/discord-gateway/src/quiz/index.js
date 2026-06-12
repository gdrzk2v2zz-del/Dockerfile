
const quizStart = require("./start");
const quizAnswer = require("./answer");
const quizLoop = require("./loop");
const { getQuizState } = require("./state");

function registerQuiz(client, node, Events) {

  client.on(Events.InteractionCreate, async (i) => {
    try {

      if (!i.isChatInputCommand()) return;

      if (i.commandName === "quizstart")
        return quizStart(i, node);

      if (i.commandName === "quizanswer")
        return quizAnswer(i);

      if (i.commandName === "quizloopstart") {
        const state = getQuizState(i.guild.id);
        state.loop = true;
        quizLoop(i.guild.id, node, i.channel);
        return i.reply("🔁 ループ開始");
      }

      if (i.commandName === "quizloopstop") {
        const state = getQuizState(i.guild.id);
        state.loop = false;
        return i.reply("⛔ 停止");
      }

    } catch (e) {
      console.error("[QUIZ ERROR]", e);
      return i.reply("エラー").catch(() => {});
    }
  });
}

module.exports = registerQuiz;

