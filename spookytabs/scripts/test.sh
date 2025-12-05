#!/bin/bash

# SpookyTabs Test Script
# Validates extension structure and files

echo "🧪 Testing SpookyTabs..."

ERRORS=0

# Check required files
echo "📋 Checking required files..."

REQUIRED_FILES=(
  "manifest.json"
  "popup/popup.html"
  "popup/popup.css"
  "popup/popup.js"
  "newtab/newtab.html"
  "newtab/newtab.css"
  "newtab/newtab.js"
  "background/background.js"
  "content/content.css"
  "content/content.js"
  "utils/storage.js"
  "utils/themes.js"
  "utils/audio.js"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Missing: $file"
    ((ERRORS++))
  else
    echo "✅ Found: $file"
  fi
done

# Check manifest version
echo ""
echo "📄 Checking manifest..."
if grep -q '"manifest_version": 3' manifest.json; then
  echo "✅ Manifest V3"
else
  echo "❌ Invalid manifest version"
  ((ERRORS++))
fi

# Check for icons
echo ""
echo "🎨 Checking icons..."
ICON_SIZES=(16 32 48 128)
for size in "${ICON_SIZES[@]}"; do
  if [ -f "assets/images/icon${size}.png" ]; then
    echo "✅ icon${size}.png found"
  else
    echo "⚠️  icon${size}.png missing (optional but recommended)"
  fi
done

# Check for sounds
echo ""
echo "🔊 Checking sounds..."
if [ -d "assets/sounds/ambient" ] && [ -d "assets/sounds/effects" ]; then
  echo "✅ Sound directories exist"
  SOUND_COUNT=$(find assets/sounds -name "*.mp3" | wc -l)
  echo "📊 Found $SOUND_COUNT MP3 files"
  if [ $SOUND_COUNT -eq 0 ]; then
    echo "⚠️  No sound files (extension will work without them)"
  fi
else
  echo "❌ Sound directories missing"
  ((ERRORS++))
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
  echo "✅ All tests passed!"
  echo "🚀 Extension is ready to load"
else
  echo "❌ Found $ERRORS error(s)"
  echo "⚠️  Fix errors before loading extension"
  exit 1
fi
