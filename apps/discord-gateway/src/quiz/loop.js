
const { getQuizState } = require("./state");

async function quizLoop(guildId, node, channel) {
  const state = getQuizState(guildId);

  if (!state.loop) return;

  const res = await node.rest.resolve("ytsearch:intro quiz");

  const track = res.tracks[0];

  state.current = track;
  state.answer = track.info.title.toLowerCase();
  state.locked = false;

  await channel.send("🔁 次の問題！");

  setTimeout(() => {
    quizLoop(guildId, node, channel);
  }, 15000);
}

module.exports = quizLoop;

