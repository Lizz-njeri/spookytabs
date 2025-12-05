// Content script - runs on all pages
let settings = {};
let particleContainer = null;
let cursorTrailEnabled = false;

// Initialize
async function init() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    await new Promise(resolve => {
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }

  // Get settings from background
  settings = await new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'getSettings' }, (response) => {
      resolve(response || {});
    });
  });

  if (settings.enabled) {
    applyEffects();
  }
}

// Apply visual effects
function applyEffects() {
  // Check if body exists
  if (!document.body) {
    console.warn('Document body not ready, deferring effects');
    return;
  }

  // Apply vignette
  if (settings.visualEffects?.vignette) {
    document.body.classList.add('spooky-vignette');
  } else {
    document.body.classList.remove('spooky-vignette');
  }

  // Apply particles
  if (settings.visualEffects?.particles) {
    createParticles();
  } else {
    removeParticles();
  }

  // Apply cursor trail
  if (settings.visualEffects?.cursorTrail) {
    enableCursorTrail();
  } else {
    disableCursorTrail();
  }
}

// Create particle system
function createParticles() {
  if (!document.body) return;

  removeParticles();

  particleContainer = document.createElement('div');
  particleContainer.className = 'spooky-particles';
  document.body.appendChild(particleContainer);

  const theme = settings.theme || 'ghostly';
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = `spooky-particle ${theme}`;

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 5}s`;

    particleContainer.appendChild(particle);
  }
}

// Remove particles
function removeParticles() {
  if (particleContainer) {
    particleContainer.remove();
    particleContainer = null;
  }
}

// Enable cursor trail
function enableCursorTrail() {
  if (cursorTrailEnabled) return;
  cursorTrailEnabled = true;
  document.addEventListener('mousemove', handleCursorTrail);
}

// Disable cursor trail
function disableCursorTrail() {
  cursorTrailEnabled = false;
  document.removeEventListener('mousemove', handleCursorTrail);
}

// Handle cursor trail effect
function handleCursorTrail(e) {
  if (!document.body) return;

  const trail = document.createElement('div');
  trail.className = 'spooky-cursor-trail';
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;

  // Theme-specific colors
  const colors = {
    ghostly: '#ffffff',
    witchy: '#d4af37',
    mansion: '#cd853f',
    cosmic: '#9d4edd'
  };
  trail.style.background = colors[settings.theme] || '#ffffff';

  document.body.appendChild(trail);

  setTimeout(() => trail.remove(), 800);
}

// Listen for messages from background or popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'settingsUpdated') {
    settings = message.settings;
    if (settings.enabled) {
      applyEffects();
    } else {
      removeEffects();
    }
  } else if (message.type === 'playSound') {
    // Sound playing will be handled in newtab page
    console.log('Play sound:', message.sound);
  }
});

// Remove all effects
function removeEffects() {
  if (document.body) {
    document.body.classList.remove('spooky-vignette');
  }
  removeParticles();
  disableCursorTrail();
}

// Start
init();
