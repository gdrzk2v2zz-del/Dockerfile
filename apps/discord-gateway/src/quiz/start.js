
const { getQuizState } = require("./state");

async function quizStart(i, node) {
  const state = getQuizState(i.guild.id);

  state.channel = i.channel.id;
  state.locked = false;

  const res = await node.rest.resolve("ytsearch:intro quiz");

  const track = res.tracks[0];

  state.current = track;
  state.answer = track.info.title.toLowerCase();

  return i.reply("🎮 クイズ開始！");
}

module.exports = quizStart;

