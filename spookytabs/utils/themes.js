// Theme definitions and management
const ThemeManager = {
  themes: {
    ghostly: {
      name: 'Ghostly Minimalist',
      colors: {
        primary: '#0a0a0a',
        secondary: '#1a1a1a',
        accent: '#e8e8e8',
        highlight: '#ffffff',
        glow: 'rgba(232, 232, 232, 0.3)'
      },
      fonts: {
        primary: "'Courier New', monospace",
        accent: "'Georgia', serif"
      },
      particles: {
        type: 'floating',
        color: '#ffffff',
        opacity: 0.3,
        count: 30
      },
      sounds: {
        ambient: 'ghostly-whispers.mp3',
        newTab: 'soft-whisper.mp3',
        closeTab: 'fade-echo.mp3',
        switchTab: 'ethereal-whoosh.mp3'
      }
    },
    witchy: {
      name: 'Witchy Forest',
      colors: {
        primary: '#1a0f2e',
        secondary: '#2d1b4e',
        accent: '#8b4f9e',
        highlight: '#d4af37',
        glow: 'rgba(139, 79, 158, 0.4)'
      },
      fonts: {
        primary: "'Trebuchet MS', sans-serif",
        accent: "'Brush Script MT', cursive"
      },
      particles: {
        type: 'fireflies',
        color: '#d4af37',
        opacity: 0.6,
        count: 25
      },
      sounds: {
        ambient: 'forest-night.mp3',
        newTab: 'owl-hoot.mp3',
        closeTab: 'rustling-leaves.mp3',
        switchTab: 'mystical-chime.mp3'
      }
    },
    mansion: {
      name: 'Abandoned Mansion',
      colors: {
        primary: '#1c1410',
        secondary: '#2d2318',
        accent: '#8b4513',
        highlight: '#cd853f',
        glow: 'rgba(205, 133, 63, 0.3)'
      },
      fonts: {
        primary: "'Garamond', serif",
        accent: "'Palatino', serif"
      },
      particles: {
        type: 'dust',
        color: '#8b7355',
        opacity: 0.4,
        count: 40
      },
      sounds: {
        ambient: 'mansion-ambience.mp3',
        newTab: 'door-creak.mp3',
        closeTab: 'distant-footsteps.mp3',
        switchTab: 'wood-creak.mp3'
      }
    },
    cosmic: {
      name: 'Cosmic Horror',
      colors: {
        primary: '#0d0208',
        secondary: '#1a0f1e',
        accent: '#6a0572',
        highlight: '#9d4edd',
        glow: 'rgba(157, 78, 221, 0.5)'
      },
      fonts: {
        primary: "'Consolas', monospace",
        accent: "'Impact', sans-serif"
      },
      particles: {
        type: 'void',
        color: '#9d4edd',
        opacity: 0.5,
        count: 35
      },
      sounds: {
        ambient: 'void-drone.mp3',
        newTab: 'reality-tear.mp3',
        closeTab: 'void-whisper.mp3',
        switchTab: 'otherworldly-shift.mp3'
      }
    }
  },

  // Get theme by name
  getTheme(themeName) {
    return this.themes[themeName] || this.themes.ghostly;
  },

  // Get all theme names
  getThemeNames() {
    return Object.keys(this.themes);
  },

  // Apply theme to element
  applyTheme(element, themeName) {
    const theme = this.getTheme(themeName);
    element.style.setProperty('--color-primary', theme.colors.primary);
    element.style.setProperty('--color-secondary', theme.colors.secondary);
    element.style.setProperty('--color-accent', theme.colors.accent);
    element.style.setProperty('--color-highlight', theme.colors.highlight);
    element.style.setProperty('--color-glow', theme.colors.glow);
    element.style.setProperty('--font-primary', theme.fonts.primary);
    element.style.setProperty('--font-accent', theme.fonts.accent);
    element.setAttribute('data-theme', themeName);
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.ThemeManager = ThemeManager;
}
