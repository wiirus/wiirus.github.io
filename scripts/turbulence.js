const turb = document.querySelector('#turbulence');
let t = 0;

function animateTurbulence() {
  t += 0.01; // Faster increment for stronger animation

  // Combine sine waves with higher amplitude and both X/Y variations
  const fx = 0.01 + 0.003 * Math.sin(t * 2) + 0.003 * Math.sin(t * 1.3 + 1);
  const fy = 0.01 + 0.003 * Math.cos(t * 1.5) + 0.003 * Math.cos(t * 2.7 + 2);

  // Direct string template avoids toFixed overhead
  turb.setAttribute('baseFrequency', `${fx} ${fy}`);

  requestAnimationFrame(animateTurbulence);
}

if (turb) animateTurbulence();
