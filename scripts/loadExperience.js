fetch('assets/data/experience.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('experience-container');
    container.classList.add('bubble-grid');

    data.forEach(entry => {
      const bubble = document.createElement('div');
      bubble.classList.add('experience-bubble');

      const duration = calculateDuration(entry.start, entry.end);

      bubble.innerHTML = `
        <h3>${entry.position}</h3>
        <h4>${entry.company}</h4>
        <p class="dates">${entry.start} – ${entry.end} (${duration})</p>
        <p class="description">${entry.description}</p>
      `;

      container.appendChild(bubble);
    });
  })
  .catch(err => {
    console.error('Failed to load experience data:', err);
  });

function calculateDuration(startStr, endStr) {
  const [startMonth, startYear] = startStr.split(' ');
  const [endMonth, endYear] = endStr.split(' ');

  const start = new Date(`${startMonth} 1, ${startYear}`);
  const end = new Date(`${endMonth} 1, ${endYear}`);

  const diff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

  const years = Math.floor(diff / 12);
  const months = diff % 12;

  let result = '';
  if (years > 0) result += `${years} yr${years > 1 ? 's' : ''}`;
  if (months > 0) result += `${years > 0 ? ' ' : ''}${months} mo${months > 1 ? 's' : ''}`;
  return result || 'Less than a month';
}
