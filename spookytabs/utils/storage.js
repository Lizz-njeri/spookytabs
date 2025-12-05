// Storage utility for managing extension settings
const StorageManager = {
  // Default settings
  defaults: {
    enabled: true,
    theme: 'ghostly',
    intensity: 50,
    soundEnabled: true,
    masterVolume: 70,
    ambientVolume: 50,
    effectsVolume: 80,
    visualEffects: {
      particles: true,
      vignette: true,
      cursorTrail: false,
      screenShake: false
    },
    sounds: {
      newTab: true,
      closeTab: true,
      switchTab: true,
      ambient: true
    }
  },

  // Get all settings
  async getSettings() {
    try {
      const result = await chrome.storage.local.get('spookySettings');
      return { ...this.defaults, ...result.spookySettings };
    } catch (error) {
      console.error('Error loading settings:', error);
      return this.defaults;
    }
  },

  // Save settings
  async saveSettings(settings) {
    try {
      await chrome.storage.local.set({ spookySettings: settings });
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  // Update specific setting
  async updateSetting(key, value) {
    const settings = await this.getSettings();
    settings[key] = value;
    return await this.saveSettings(settings);
  },

  // Reset to defaults
  async resetSettings() {
    return await this.saveSettings(this.defaults);
  },

  // Export settings as JSON
  async exportSettings() {
    const settings = await this.getSettings();
    return JSON.stringify(settings, null, 2);
  },

  // Import settings from JSON
  async importSettings(jsonString) {
    try {
      const settings = JSON.parse(jsonString);
      return await this.saveSettings({ ...this.defaults, ...settings });
    } catch (error) {
      console.error('Error importing settings:', error);
      return false;
    }
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.StorageManager = StorageManager;
}
