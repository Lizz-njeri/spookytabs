# SpookyTabs Scripts & Tools

This folder contains helpful tools for developing and testing SpookyTabs.

## 🎨 Icon Generator

**File:** `generate-icons.html`

Creates professional extension icons in all required sizes.

**How to use:**
1. Open `generate-icons.html` in any browser
2. Click "Download All Icons"
3. Save the 4 PNG files to `../assets/images/`

**What it creates:**
- Ghost silhouette with wavy bottom
- Dark purple gradient background
- Purple glow effect
- All 4 sizes: 16x16, 32x32, 48x48, 128x128

**Documentation:** See `ICON_GUIDE.md` for customization options

---

## 🧪 Settings Tester

**File:** `test-settings.html`

Comprehensive testing tool for extension settings functionality.

**How to use:**
1. Load SpookyTabs extension in Chrome
2. Open `test-settings.html` in a new tab
3. Run through all test sections
4. Check for green (success) or red (error) messages

**What it tests:**
- Extension API availability
- Storage read/write operations
- Settings persistence
- Theme switching
- Visual effects toggles
- Setting value changes

**When to use:**
- Settings popup isn't working
- Changes don't persist
- Visual effects not applying
- After making code changes

---

## 📚 Documentation

### ICON_GUIDE.md
Complete guide to icon generation and customization:
- How to use the generator
- Customization instructions
- Design tips
- Alternative methods
- Troubleshooting

### sound-guide.md (if exists)
Guide for adding sound files to the extension

---

## Quick Reference

### Problem: Settings don't work
→ Open `test-settings.html` and run tests
→ Check `../DEBUGGING_SETTINGS.md`

### Problem: Need new icons
→ Open `generate-icons.html`
→ Download and replace in `../assets/images/`

### Problem: Want custom icons
→ Read `ICON_GUIDE.md`
→ Create 4 PNG files (16, 32, 48, 128)
→ Place in `../assets/images/`

---

## Development Tips

### Testing Changes
1. Make code changes
2. Reload extension at `chrome://extensions/`
3. Run `test-settings.html` to verify
4. Test on actual websites

### Debugging
1. Right-click extension icon → "Inspect popup"
2. Check Console for errors
3. Use `test-settings.html` to isolate issues
4. See `../DEBUGGING_SETTINGS.md` for detailed help

### Icon Updates
1. Modify `generate-icons.html` if needed
2. Regenerate all sizes
3. Replace in `../assets/images/`
4. Reload extension
5. Check toolbar icon

---

## File Structure

```
scripts/
├── README.md              ← You are here
├── generate-icons.html    ← Icon generator tool
├── test-settings.html     ← Settings testing tool
├── ICON_GUIDE.md         ← Icon documentation
└── sound-guide.md        ← Sound setup guide (optional)
```

---

## Contributing

When adding new tools to this folder:
1. Create an HTML file for interactive tools
2. Add documentation in markdown
3. Update this README
4. Test thoroughly before committing
5. Add usage instructions to main docs

---

## Browser Compatibility

All tools work in:
- Chrome/Chromium
- Edge
- Brave
- Any Chromium-based browser

Note: Tools are standalone HTML files and don't require the extension to be loaded (except test-settings.html which tests the extension).
