// Popup UI controller
let currentSettings = {};

// Theme icons mapping
const themeIcons = {
  ghostly: '👻',
  witchy: '🔮',
  mansion: '🏚️',
  cosmic: '🌌'
};

// Initialize popup
async function init() {
  try {
    // Wait for utilities to load
    if (typeof StorageManager === 'undefined' || typeof ThemeManager === 'undefined') {
      console.error('Utilities not loaded');
      throw new Error('Required utilities not loaded');
    }
    
    currentSettings = await StorageManager.getSettings();
    renderThemes();
    updateUI();
    attachEventListeners();
  } catch (error) {
    console.error('Failed to initialize popup:', error);
    // Show error in UI if possible
    const container = document.querySelector('.popup-container');
    if (container) {
      container.innerHTML = `
        <div style="padding: 20px; text-align: center; color: #ff6b6b;">
          <h2>⚠️ Error Loading Extension</h2>
          <p>Please reload the extension and try again.</p>
          <p style="font-size: 12px; margin-top: 10px;">${error.message}</p>
        </div>
      `;
    }
  }
}

// Render theme cards
function renderThemes() {
  const themeGrid = document.getElementById('themeGrid');
  if (!themeGrid) {
    console.error('Theme grid element not found');
    return;
  }
  
  const themeNames = ThemeManager.getThemeNames();
  
  themeGrid.innerHTML = themeNames.map(themeName => {
    const theme = ThemeManager.getTheme(themeName);
    const isActive = currentSettings.theme === themeName;
    return `
      <div class="theme-card ${isActive ? 'active' : ''}" data-theme="${themeName}">
        <div class="theme-icon">${themeIcons[themeName]}</div>
        <div class="theme-name">${theme.name}</div>
      </div>
    `;
  }).join('');
}

// Update UI with current settings
function updateUI() {
  // Toggle button
  const toggleBtn = document.getElementById('toggleEnabled');
  if (!toggleBtn) {
    console.error('Toggle button not found');
    return;
  }
  
  toggleBtn.classList.toggle('disabled', !currentSettings.enabled);
  const toggleIcon = toggleBtn.querySelector('.toggle-icon');
  if (toggleIcon) {
    toggleIcon.textContent = currentSettings.enabled ? '🌙' : '☀️';
  }
  
  // Intensity
  document.getElementById('intensitySlider').value = currentSettings.intensity;
  document.getElementById('intensityValue').textContent = `${currentSettings.intensity}%`;
  
  // Sound controls
  document.getElementById('soundEnabled').checked = currentSettings.soundEnabled;
  document.getElementById('masterVolume').value = currentSettings.masterVolume;
  document.getElementById('masterVolumeValue').textContent = `${currentSettings.masterVolume}%`;
  document.getElementById('ambientVolume').value = currentSettings.ambientVolume;
  document.getElementById('ambientVolumeValue').textContent = `${currentSettings.ambientVolume}%`;
  document.getElementById('effectsVolume').value = currentSettings.effectsVolume;
  document.getElementById('effectsVolumeValue').textContent = `${currentSettings.effectsVolume}%`;
  
  // Visual effects
  document.getElementById('particles').checked = currentSettings.visualEffects.particles;
  document.getElementById('vignette').checked = currentSettings.visualEffects.vignette;
  document.getElementById('cursorTrail').checked = currentSettings.visualEffects.cursorTrail;
}

// Attach event listeners
function attachEventListeners() {
  // Toggle enabled
  document.getElementById('toggleEnabled').addEventListener('click', async () => {
    currentSettings.enabled = !currentSettings.enabled;
    await StorageManager.saveSettings(currentSettings);
    updateUI();
    notifyContentScripts();
  });
  
  // Theme selection
  document.getElementById('themeGrid').addEventListener('click', async (e) => {
    const card = e.target.closest('.theme-card');
    if (!card) return;
    
    currentSettings.theme = card.dataset.theme;
    await StorageManager.saveSettings(currentSettings);
    renderThemes();
    notifyContentScripts();
  });
  
  // Intensity slider
  const intensitySlider = document.getElementById('intensitySlider');
  intensitySlider.addEventListener('input', (e) => {
    document.getElementById('intensityValue').textContent = `${e.target.value}%`;
  });
  intensitySlider.addEventListener('change', async (e) => {
    currentSettings.intensity = parseInt(e.target.value);
    await StorageManager.saveSettings(currentSettings);
    notifyContentScripts();
  });
  
  // Sound enabled
  document.getElementById('soundEnabled').addEventListener('change', async (e) => {
    currentSettings.soundEnabled = e.target.checked;
    await StorageManager.saveSettings(currentSettings);
    notifyContentScripts();
  });
  
  // Volume sliders
  setupVolumeSlider('masterVolume', 'masterVolumeValue', 'masterVolume');
  setupVolumeSlider('ambientVolume', 'ambientVolumeValue', 'ambientVolume');
  setupVolumeSlider('effectsVolume', 'effectsVolumeValue', 'effectsVolume');
  
  // Visual effects checkboxes
  document.getElementById('particles').addEventListener('change', async (e) => {
    currentSettings.visualEffects.particles = e.target.checked;
    await StorageManager.saveSettings(currentSettings);
    notifyContentScripts();
  });
  
  document.getElementById('vignette').addEventListener('change', async (e) => {
    currentSettings.visualEffects.vignette = e.target.checked;
    await StorageManager.saveSettings(currentSettings);
    notifyContentScripts();
  });
  
  document.getElementById('cursorTrail').addEventListener('change', async (e) => {
    currentSettings.visualEffects.cursorTrail = e.target.checked;
    await StorageManager.saveSettings(currentSettings);
    notifyContentScripts();
  });
  
  // Action buttons
  document.getElementById('resetBtn').addEventListener('click', async () => {
    if (confirm('Reset all settings to defaults?')) {
      await StorageManager.resetSettings();
      currentSettings = await StorageManager.getSettings();
      renderThemes();
      updateUI();
      notifyContentScripts();
    }
  });
  
  document.getElementById('exportBtn').addEventListener('click', async () => {
    const json = await StorageManager.exportSettings();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spookytabs-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  });
  
  document.getElementById('importBtn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const text = await file.text();
        const success = await StorageManager.importSettings(text);
        if (success) {
          currentSettings = await StorageManager.getSettings();
          renderThemes();
          updateUI();
          notifyContentScripts();
          alert('Settings imported successfully!');
        } else {
          alert('Failed to import settings. Please check the file.');
        }
      }
    };
    input.click();
  });
}

// Setup volume slider
function setupVolumeSlider(sliderId, valueId, settingKey) {
  const slider = document.getElementById(sliderId);
  slider.addEventListener('input', (e) => {
    document.getElementById(valueId).textContent = `${e.target.value}%`;
  });
  slider.addEventListener('change', async (e) => {
    currentSettings[settingKey] = parseInt(e.target.value);
    await StorageManager.saveSettings(currentSettings);
    notifyContentScripts();
  });
}

// Notify content scripts of settings change
function notifyContentScripts() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { 
          type: 'settingsUpdated', 
          settings: currentSettings 
        }).catch((error) => {
          // Silently ignore errors for tabs that can't receive messages
          console.debug('Could not send message to tab', tab.id);
        });
      }
    });
  });
  
  // Also update storage to notify background script
  chrome.storage.local.set({ spookySettings: currentSettings });
}

// Start the popup when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
