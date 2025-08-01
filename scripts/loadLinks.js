// scripts/loadLinks.js

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('links-container');
  if (!container) return;

  fetch('assets/data/links.json')
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch links.json: ${res.status}`);
      return res.json();
    })
    .then(data => {
      const links = Array.isArray(data) ? data : data.links;
      container.innerHTML = '';

      links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.title = link.name;

        // Inline the SVG so it inherits `currentColor`
        fetch(link.icon)
          .then(r => {
            if (!r.ok) throw new Error(`SVG not found: ${link.icon}`);
            return r.text();
          })
          .then(svgText => {
            const span = document.createElement('span');
            span.className = 'link-icon';
            span.innerHTML = svgText.trim();
            a.appendChild(span);
            a.appendChild(document.createTextNode(link.name));
            container.appendChild(a);
          })
          .catch(err => {
            console.warn(err);
            // Fallback to text-only link
            a.textContent = link.name;
            container.appendChild(a);
          });
      });
    })
    .catch(err => console.error('Error loading links:', err));
});
