
const db = require("./db");
const { getQuizState } = require("./state");

async function quizAnswer(i) {
  const state = getQuizState(i.guild.id);

  if (!state.current || state.locked) return;

  const userAnswer = i.options.getString("answer").toLowerCase();

  const correct =
    state.answer.includes(userAnswer) ||
    userAnswer.includes(state.answer);

  if (correct) {
    state.locked = true;

    db.run(
      `INSERT INTO quiz_score (guild_id, user_id, score)
       VALUES (?, ?, 1)
       ON CONFLICT(guild_id, user_id)
       DO UPDATE SET score = score + 1`,
      [i.guild.id, i.user.id]
    );

    return i.reply(`🏆 正解！`);
  }

  return i.reply("❌ 不正解");
}

module.exports = quizAnswer;

