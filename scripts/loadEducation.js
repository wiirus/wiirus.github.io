// scripts/loadEducation.js
// Groups degrees & certificates into separate folder-style cards

document.addEventListener('DOMContentLoaded', () => {
  const degContainer = document.getElementById('education-degrees');
  const skillContainer = document.getElementById('education-skills');

  fetch('assets/data/education.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      // EDUCATION CARD
      const degreeEntries = data.filter(d => d.type === 'degree');
      if (degreeEntries.length) {
        const card = document.createElement('div');
        card.className = 'edu-card';
        card.dataset.label = 'Degree';
        degreeEntries.forEach(e => {
          const title = document.createElement('h3'); title.textContent = e.title;
          const inst  = document.createElement('h4'); inst.textContent = e.institution;
          const dates = document.createElement('p'); dates.className = 'dates'; dates.textContent = `${e.start} – ${e.end}`;
          const desc  = document.createElement('p'); desc.className = 'description'; desc.textContent = e.description;
          card.append(title, inst, dates, desc);
        });
        degContainer.appendChild(card);
      }

      // CERTIFICATE CARD
      const certEntries = data.filter(d => d.type === 'certificate');
      if (certEntries.length) {
        const card = document.createElement('div');
        card.className = 'edu-card';
        card.dataset.label = 'Certificate';
        certEntries.forEach(e => {
          const title = document.createElement('h3'); title.textContent = e.title;
          const dates = document.createElement('p'); dates.className = 'dates'; dates.textContent = `${e.start} – ${e.end}`;
          const desc  = document.createElement('p'); desc.className = 'description'; desc.textContent = e.description;
          card.append(title, dates, desc);
        });
        degContainer.appendChild(card);
      }

      // SKILLS
      skillContainer.innerHTML = '<h2>Skills</h2>';
      const skills = data.filter(d => d.type === 'skill');
      const categories = [...new Set(skills.map(s => s.category))];
      categories.forEach(cat => {
        const group = document.createElement('div');
        group.className = 'skill-group';
        const heading = document.createElement('h3'); heading.textContent = cat;
        const wrap = document.createElement('div'); wrap.className = 'skill-badges';
        skills.filter(s => s.category === cat).forEach(s => {
          const badge = document.createElement('span'); badge.className = 'skill-badge'; badge.textContent = s.title;
          wrap.appendChild(badge);
        });
        group.append(heading, wrap);
        skillContainer.appendChild(group);
      });
    })
    .catch(err => {
      console.error(err);
      degContainer.textContent = 'Failed to load data.';
    });
});
