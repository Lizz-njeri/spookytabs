// Audio management system
class AudioManager {
  constructor() {
    this.context = null;
    this.sounds = {};
    this.ambientSound = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.effectsGain = null;
    this.initialized = false;
  }

  // Initialize audio context (must be called after user interaction)
  async init() {
    if (this.initialized) return;
    
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create gain nodes for volume control
      this.masterGain = this.context.createGain();
      this.ambientGain = this.context.createGain();
      this.effectsGain = this.context.createGain();
      
      // Connect gain nodes
      this.ambientGain.connect(this.masterGain);
      this.effectsGain.connect(this.masterGain);
      this.masterGain.connect(this.context.destination);
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  // Load audio file
  async loadSound(name, url) {
    if (!this.initialized) await this.init();
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // Sound file doesn't exist - this is OK, extension works without sounds
        return false;
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      this.sounds[name] = audioBuffer;
      return true;
    } catch (error) {
      // Silently fail - sounds are optional
      return false;
    }
  }

  // Play sound effect
  playEffect(name, volume = 1.0) {
    if (!this.initialized || !this.sounds[name]) return;
    
    try {
      const source = this.context.createBufferSource();
      source.buffer = this.sounds[name];
      
      const gainNode = this.context.createGain();
      gainNode.gain.value = volume;
      
      source.connect(gainNode);
      gainNode.connect(this.effectsGain);
      source.start(0);
    } catch (error) {
      console.error(`Failed to play effect ${name}:`, error);
    }
  }

  // Play ambient loop
  playAmbient(name, volume = 1.0) {
    this.stopAmbient();
    
    if (!this.initialized || !this.sounds[name]) return;
    
    try {
      const source = this.context.createBufferSource();
      source.buffer = this.sounds[name];
      source.loop = true;
      
      const gainNode = this.context.createGain();
      gainNode.gain.value = volume;
      
      source.connect(gainNode);
      gainNode.connect(this.ambientGain);
      source.start(0);
      
      this.ambientSound = { source, gainNode };
    } catch (error) {
      console.error(`Failed to play ambient ${name}:`, error);
    }
  }

  // Stop ambient sound
  stopAmbient() {
    if (this.ambientSound) {
      try {
        this.ambientSound.source.stop();
        this.ambientSound = null;
      } catch (error) {
        console.error('Failed to stop ambient:', error);
      }
    }
  }

  // Set master volume (0-100)
  setMasterVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.value = volume / 100;
    }
  }

  // Set ambient volume (0-100)
  setAmbientVolume(volume) {
    if (this.ambientGain) {
      this.ambientGain.gain.value = volume / 100;
    }
  }

  // Set effects volume (0-100)
  setEffectsVolume(volume) {
    if (this.effectsGain) {
      this.effectsGain.gain.value = volume / 100;
    }
  }

  // Mute all
  mute() {
    if (this.masterGain) {
      this.masterGain.gain.value = 0;
    }
  }

  // Unmute
  unmute(volume) {
    if (this.masterGain) {
      this.masterGain.gain.value = volume / 100;
    }
  }
}

// Make available globally
if (typeof window !== 'undefined') {
  window.AudioManager = AudioManager;
}
