
const quizStates = new Map();

function getQuizState(guildId) {
  if (!quizStates.has(guildId)) {
    quizStates.set(guildId, {
      current: null,
      answer: null,
      used: new Set(),
      loop: false,
      channel: null,
      locked: false
    });
  }
  return quizStates.get(guildId);
}

module.exports = { getQuizState };

