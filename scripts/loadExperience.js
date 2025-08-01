// loadExperience.js

// Fetch and render your experience bubbles
fetch('assets/data/experience.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('experience-container');
    container.classList.add('bubble-grid');

    data.forEach(entry => {
      const bubble = document.createElement('div');
      bubble.classList.add('experience-bubble');

      // Calculate duration (skip if “Present”)
      const isPresent = entry.end.trim().toLowerCase() === 'present';
      const duration  = isPresent
        ? ''
        : calculateDuration(entry.start, entry.end);

      // Build the dates string
      const hasStart = entry.start && entry.start.trim() !== '';
      const hasEnd = entry.end && entry.end.trim() !== '';

      const datesText =
        (hasStart ? entry.start : '') +
        (hasStart && hasEnd ? ' – ' : '') +
        (hasEnd ? entry.end : '') +
        (duration ? ` (${duration})` : '');


      // Turn each newline into its own <p>
      const descHTML = entry.description
        .split('\n')
        .map(line => `<p>${line.trim()}</p>`)
        .join('');

      bubble.innerHTML = `
        <h3>${entry.position}</h3>
        <h4>${entry.company}</h4>
        <p class="dates">${datesText}</p>
        <div class="description">
          ${descHTML}
        </div>
      `;

      container.appendChild(bubble);
    });
  })
  .catch(err => {
    console.error('Failed to load experience data:', err);
  });

/**
 * Returns an “inclusive” month/year span between two “Mon YYYY” dates.
 * e.g. Jan 2022–Jan 2022 → “1 mo”
 *      Jan 2022–Mar 2022 → “3 mos”
 *      Jan 2020–Mar 2021 → “1 yr 3 mos”
 */
function calculateDuration(startStr, endStr) {
  const [startMonth, startYear] = startStr.split(' ');
  const [endMonth,   endYear]   = endStr.split(' ');

  const start = new Date(`${startMonth} 1, ${startYear}`);
  const end   = new Date(`${endMonth} 1, ${endYear}`);

  // +1 makes the range inclusive of both start- and end-month
  let diff = (end.getFullYear() - start.getFullYear()) * 12
           + (end.getMonth()      - start.getMonth())
           + 1;

  // Guard against negative or zero spans
  if (diff < 1) diff = 1;

  const years  = Math.floor(diff / 12);
  const months = diff % 12;

  let result = '';
  if (years > 0)  result += `${years} yr${years > 1 ? 's' : ''}`;
  if (months > 0) result += `${years > 0 ? ' ' : ''}${months} mo${months > 1 ? 's' : ''}`;

  return result;
}
