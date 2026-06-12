
// =======================
// 🧊 MUSIC CACHE (NO 429)
// =======================

const cache = new Map();

async function safeSearch(node, query) {
  if (cache.has(query)) return cache.get(query);

  const res = await node.rest.resolve(`ytsearch:${query}`);

  cache.set(query, res);

  return res;
}

module.exports = { safeSearch };

