const yts = require("youtube-search-api");

async function resolveQuery(query) {
  // Spotify URL
  if (query.includes("spotify")) {
    return { type: "spotify" };
  }

  // YouTube search
  const res = await yts.GetListByKeyword(query, false, 1);
  return {
    type: "youtube",
    title: res.items?.[0]?.title,
    id: res.items?.[0]?.id,
  };
}

module.exports = { resolveQuery };
