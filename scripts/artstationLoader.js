// scripts/artstationLoader.js
(async () => {
  const res = await fetch('/data/artworks.json');
  const arts = await res.json();
  const container = document.getElementById('artworks-container');
  arts.forEach(({ title, cover_url, url }) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.innerHTML = `<img src="${cover_url}" alt="${title}">`;
    container.appendChild(a);
  });
})();
