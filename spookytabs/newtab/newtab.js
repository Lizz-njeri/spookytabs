// New tab page controller
let settings = {};
let audioManager = null;

// Spooky whispers for each theme
const whispers = {
  ghostly: [
    "They're watching...",
    "Can you hear them?",
    "You're not alone here...",
    "The veil grows thin...",
    "Something stirs in the darkness..."
  ],
  witchy: [
    "The moon calls to you...",
    "Magic flows through the night...",
    "The forest remembers...",
    "Ancient powers awaken...",
    "Your destiny awaits..."
  ],
  mansion: [
    "These halls remember everything...",
    "Footsteps echo in empty rooms...",
    "The past never truly leaves...",
    "Something creaks in the attic...",
    "Time stands still here..."
  ],
  cosmic: [
    "Reality bends and breaks...",
    "The void gazes back...",
    "Dimensions overlap here...",
    "Sanity is merely a suggestion...",
    "The stars are not what they seem..."
  ]
};

// Initialize
async function init() {
  settings = await StorageManager.getSettings();
  
  if (!settings.enabled) {
    document.body.style.opacity = '0.5';
    return;
  }
  
  // Apply theme
  ThemeManager.applyTheme(document.documentElement, settings.theme);
  
  // Initialize audio
  audioManager = new AudioManager();
  await initAudio();
  
  // Setup UI
  createParticles();
  createBouncingGraphics();
  showRandomWhisper();
  setInterval(showRandomWhisper, 12000);
  
  loadQuickLinks();
  
  // Event listeners
  document.getElementById('settingsToggle').addEventListener('click', openSettings);
  document.getElementById('searchInput').addEventListener('focus', () => {
    // Initialize audio on first user interaction
    if (audioManager && !audioManager.initialized) {
      audioManager.init();
    }
  });
  
  // Focus search on load
  document.getElementById('searchInput').focus();
}

// Initialize audio system
async function initAudio() {
  if (!settings.soundEnabled) return;
  
  const theme = ThemeManager.getTheme(settings.theme);
  const soundPath = '../assets/sounds/';
  
  // Try to load sounds (will fail gracefully if files don't exist)
  // Sounds are optional - extension works perfectly without them
  
  // Load ambient sound
  if (settings.sounds?.ambient && theme.sounds.ambient) {
    await audioManager.loadSound('ambient', soundPath + 'ambient/' + theme.sounds.ambient);
  }
  
  // Load effect sounds
  if (theme.sounds.newTab) {
    await audioManager.loadSound('newTab', soundPath + 'effects/' + theme.sounds.newTab);
  }
  if (theme.sounds.closeTab) {
    await audioManager.loadSound('closeTab', soundPath + 'effects/' + theme.sounds.closeTab);
  }
  if (theme.sounds.switchTab) {
    await audioManager.loadSound('switchTab', soundPath + 'effects/' + theme.sounds.switchTab);
  }
  
  // Set volumes
  audioManager.setMasterVolume(settings.masterVolume);
  audioManager.setAmbientVolume(settings.ambientVolume);
  audioManager.setEffectsVolume(settings.effectsVolume);
  
  // Play ambient if enabled and loaded
  if (settings.sounds?.ambient && audioManager.sounds['ambient']) {
    audioManager.playAmbient('ambient', settings.ambientVolume / 100);
  }
  
  // Play new tab sound if loaded
  if (settings.sounds?.newTab && audioManager.sounds['newTab']) {
    audioManager.playEffect('newTab', settings.effectsVolume / 100);
  }
}

// Create bouncing graphics
function createBouncingGraphics() {
  const container = document.getElementById('bouncingGraphics');
  container.innerHTML = '';
  
  const theme = settings.theme || 'ghostly';
  
  // Theme-specific bouncing items (using SVG images)
  const graphicsByTheme = {
    ghostly: ['ghost.svg', 'skull.svg', 'candle.svg', 'pumpkin.svg'],
    witchy: ['crystal-ball.svg', 'bat.svg', 'spider.svg', 'candle.svg'],
    mansion: ['candle.svg', 'skull.svg', 'pumpkin.svg', 'ghost.svg'],
    cosmic: ['eye.svg', 'crystal-ball.svg', 'ghost.svg', 'bat.svg']
  };
  
  const graphics = graphicsByTheme[theme] || graphicsByTheme.ghostly;
  const count = 6;
  
  for (let i = 0; i < count; i++) {
    const item = document.createElement('div');
    item.className = 'bouncing-item';
    
    // Create image element
    const img = document.createElement('img');
    img.src = `../assets/images/bouncing/${graphics[Math.floor(Math.random() * graphics.length)]}`;
    img.alt = 'Spooky graphic';
    item.appendChild(img);
    
    // Random position
    item.style.left = `${Math.random() * 85 + 5}%`;
    item.style.top = `${Math.random() * 75 + 10}%`;
    
    // Random animation delay and duration
    item.style.animationDelay = `${Math.random() * 2}s`;
    item.style.animationDuration = `${2 + Math.random() * 2}s`;
    
    container.appendChild(item);
  }
}

// Create particles
function createParticles() {
  const container = document.getElementById('particlesContainer');
  container.innerHTML = '';
  
  if (!settings.visualEffects?.particles) return;
  
  const theme = settings.theme || 'ghostly';
  const particleCount = Math.floor(30 * (settings.intensity / 100));
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = `particle ${theme}`;
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
  }
}

// Show random whisper
function showRandomWhisper() {
  const theme = settings.theme || 'ghostly';
  const whisperList = whispers[theme];
  const randomWhisper = whisperList[Math.floor(Math.random() * whisperList.length)];
  
  document.getElementById('whisperText').textContent = randomWhisper;
}

// Load quick links
function loadQuickLinks() {
  const container = document.getElementById('quickLinks');
  
  // Default quick links
  const links = [
    { icon: '📧', title: 'Mail', url: 'https://mail.google.com' },
    { icon: '📺', title: 'YouTube', url: 'https://youtube.com' },
    { icon: '🐙', title: 'GitHub', url: 'https://github.com' },
    { icon: '📱', title: 'Twitter', url: 'https://twitter.com' }
  ];
  
  container.innerHTML = links.map(link => `
    <a href="${link.url}" class="quick-link" target="_blank">
      <div class="quick-link-icon">${link.icon}</div>
      <div class="quick-link-title">${link.title}</div>
    </a>
  `).join('');
}

// Open settings (extension popup)
function openSettings() {
  // Try to open the popup - this may not work on new tab pages
  // Users can click the extension icon in the toolbar instead
  try {
    chrome.action.openPopup?.();
  } catch (error) {
    // Silently fail - user can click extension icon manually
    console.log('Click the extension icon in your toolbar to open settings');
  }
}

// Listen for settings updates
chrome.storage.onChanged.addListener(async (changes) => {
  if (changes.spookySettings) {
    const oldTheme = settings.theme;
    settings = changes.spookySettings.newValue;
    
    ThemeManager.applyTheme(document.documentElement, settings.theme);
    createParticles();
    createBouncingGraphics();
    
    // Reload audio if theme changed
    if (oldTheme !== settings.theme) {
      await initAudio();
    }
    
    // Update volumes
    if (audioManager) {
      audioManager.setMasterVolume(settings.masterVolume);
      audioManager.setAmbientVolume(settings.ambientVolume);
      audioManager.setEffectsVolume(settings.effectsVolume);
      
      // Toggle ambient
      if (settings.soundEnabled && settings.sounds?.ambient) {
        audioManager.playAmbient('ambient', settings.ambientVolume / 100);
      } else {
        audioManager.stopAmbient();
      }
    }
  }
});

// Listen for messages from background
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'playSound' && audioManager && settings.soundEnabled) {
    const soundName = message.sound;
    if (audioManager.sounds[soundName]) {
      audioManager.playEffect(soundName, settings.effectsVolume / 100);
    }
  }
});

// Start
init();
