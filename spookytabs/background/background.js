// Background service worker
let settings = {};

// Initialize on install
chrome.runtime.onInstalled.addListener(async () => {
  console.log('SpookyTabs installed!');
  
  // Load settings
  const result = await chrome.storage.local.get('spookySettings');
  if (!result.spookySettings) {
    // Set defaults on first install
    const defaults = {
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
        cursorTrail: false
      }
    };
    await chrome.storage.local.set({ spookySettings: defaults });
    settings = defaults;
  } else {
    settings = result.spookySettings;
  }
});

// Listen for tab events to trigger sounds
chrome.tabs.onCreated.addListener((tab) => {
  if (settings.enabled && settings.soundEnabled) {
    // Notify the new tab to play sound
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, { 
        type: 'playSound', 
        sound: 'newTab' 
      }).catch(() => {});
    }, 100);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (settings.enabled && settings.soundEnabled) {
    // Notify remaining tabs
    chrome.tabs.query({}, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          type: 'playSound', 
          sound: 'closeTab' 
        }).catch(() => {});
      }
    });
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (settings.enabled && settings.soundEnabled) {
    chrome.tabs.sendMessage(activeInfo.tabId, { 
      type: 'playSound', 
      sound: 'switchTab' 
    }).catch(() => {});
  }
});

// Listen for settings updates
chrome.storage.onChanged.addListener((changes) => {
  if (changes.spookySettings) {
    settings = changes.spookySettings.newValue;
  }
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getSettings') {
    sendResponse(settings);
  }
  return true;
});
