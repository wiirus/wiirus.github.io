// scripts/artstationLoader.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('artstation-container');
  const username  = 'wiirus';
  let   page      = 1;
  const allProjects = [];

  // Use a CORS proxy
  const PROXY = 'https://api.allorigins.win/raw?url=';

  async function fetchProjects() {
    try {
      const targetUrl = encodeURIComponent(
        `https://www.artstation.com/users/${username}/projects.json?page=${page}`
      );
      const res = await fetch(PROXY + targetUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      allProjects.push(...json.data);
      if (json.has_more) {
        page++;
        await fetchProjects();
      } else {
        renderProjects(allProjects);
      }
    } catch (err) {
      console.error('ArtStation load error:', err);
      container.innerHTML = '<p>Unable to load artworks.</p>';
    }
  }

  function renderProjects(projects) {
    /* …same as before… */
  }

  fetchProjects();
});
