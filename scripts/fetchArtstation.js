// scripts/fetchArtstation.js
const fetch = require('node-fetch');
const fs = require('fs');

async function main(username) {
  let page = 1, results = [];
  while (true) {
    const res = await fetch(
      `https://www.artstation.com/users/${username}/projects.json?page=${page}`
    );
    const json = await res.json();
    if (!json.data.length) break;
    json.data.forEach(item => {
      results.push({
        title: item.title,
        cover_url: item.cover.small,
        url: `https://www.artstation.com/artwork/${item.hash_id}`
      });
    });
    page++;
  }
  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync('data/artworks.json', JSON.stringify(results, null, 2));
}
main(process.argv[2]).catch(err => { console.error(err); process.exit(1); });
