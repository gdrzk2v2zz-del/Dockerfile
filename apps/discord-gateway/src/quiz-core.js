
// =======================
// 🎮 QUIZ FINAL CORE
// =======================

const quiz = new Map();

function getState(guildId) {
  if (!quiz.has(guildId)) {
    quiz.set(guildId, {
      locked: false,
      answer: null,
      start: 0
    });
  }
  return quiz.get(guildId);
}

async function startQuiz(node, i) {

  const state = getState(i.guild.id);

  const res = await node.rest.resolve("ytsearch:intro quiz");

  const track = res.tracks[0];

  state.answer = track.info.title.toLowerCase();
  state.locked = false;
  state.start = Date.now();

  return i.reply("🎮 START");
}

async function answerQuiz(i) {

  const state = getState(i.guild.id);

  if (state.locked) return;

  const ans = i.options.getString("answer").toLowerCase();

  if (state.answer.includes(ans)) {
    state.locked = true;
    return i.reply(`🏆 ${i.user.username}`);
  }

  return i.reply("❌");
}

module.exports = { startQuiz, answerQuiz };

