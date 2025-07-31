const canvas = document.getElementById('dust-layer');
const ctx = canvas.getContext('2d');

let particles = [];
const maxParticles = 50;
const colors = ['rgb(255, 0, 0)'];

// Scroll tracking variables
let lastScrollY = 0;
let scrollVelocity = 0;
let windForce = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Track scroll for wind effect
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  scrollVelocity = (currentScrollY - lastScrollY) * 0.1;
  windForce = Math.max(-15, Math.min(15, -scrollVelocity)); // clamp wind force (reversed)
  lastScrollY = currentScrollY;
});

function createParticle() {
  const height = canvas.height;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * (height * 0.3) + (height * 0.7), // spawn in bottom 30%
    radius: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.3,   // slight horizontal drift
    dy: -Math.random() * 0.3 - 0.1,    // mostly upward movement
    baseDy: -Math.random() * 0.3 - 0.1, // store original vertical speed
    life: Math.random() * 300 + 200,
    opacity: 0,
    fadeIn: true,
    color: colors[Math.floor(Math.random() * colors.length)],
    mass: Math.random() * 0.5 + 0.5 // different masses react differently to wind
  };
}

function updateParticle(p) {
  // Apply wind force based on scroll with momentum
  const windEffect = windForce / p.mass;
  
  // Add wind force to current velocity instead of replacing it
  p.dy += windEffect * 0.05; // gradual acceleration
  
  // Horizontal scatter when there's wind
  if (Math.abs(windForce) > 2) {
    p.dx += (Math.random() - 0.5) * 0.2; // scatter horizontally
  }
  
  // Apply drag/friction to velocities
  p.dx *= 0.98;
  p.dy *= 0.995; // slight drag on vertical movement
  
  // Gravity pulls particles back to their natural upward drift
  p.dy += (p.baseDy - p.dy) * 0.02;
  
  p.x += p.dx;
  p.y += p.dy;

  // Wrap particles that go off screen
  if (p.x < 0) p.x = canvas.width;
  if (p.x > canvas.width) p.x = 0;
  
  // If pushed too far down, respawn at top
  if (p.y > canvas.height + 50) {
    p.y = -50;
    p.x = Math.random() * canvas.width;
  }
  
  // If pushed too far up, respawn at bottom
  if (p.y < -50) {
    p.y = canvas.height + 50;
    p.x = Math.random() * canvas.width;
  }

  // fade in/out logic
  if (p.fadeIn) {
    p.opacity += 0.01;
    if (p.opacity >= 1) p.fadeIn = false;
  } else {
    p.opacity -= 0.005;
  }

  p.life--;
  return p.life > 0 && p.opacity > 0;
}

function drawParticle(p) {
  ctx.beginPath();
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gradually reduce wind force for natural feel
  windForce *= 0.95;

  if (particles.length < maxParticles) {
    particles.push(createParticle());
  }

  particles = particles.filter(p => updateParticle(p));

  for (let p of particles) {
    drawParticle(p);
  }

  requestAnimationFrame(animate);
}

animate();