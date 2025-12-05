#!/bin/bash

# SpookyTabs Build Script
# Creates a production-ready ZIP file for Chrome Web Store

echo "🎃 Building SpookyTabs..."

# Create build directory
BUILD_DIR="build"
DIST_DIR="dist"
VERSION=$(grep '"version"' manifest.json | cut -d'"' -f4)

echo "📦 Version: $VERSION"

# Clean previous builds
rm -rf "$BUILD_DIR" "$DIST_DIR"
mkdir -p "$BUILD_DIR" "$DIST_DIR"

# Copy necessary files
echo "📋 Copying files..."
cp -r manifest.json "$BUILD_DIR/"
cp -r popup "$BUILD_DIR/"
cp -r newtab "$BUILD_DIR/"
cp -r background "$BUILD_DIR/"
cp -r content "$BUILD_DIR/"
cp -r utils "$BUILD_DIR/"
cp -r assets "$BUILD_DIR/"
cp README.md "$BUILD_DIR/"

# Remove development files
echo "🧹 Cleaning up..."
find "$BUILD_DIR" -name ".DS_Store" -delete
find "$BUILD_DIR" -name "*.log" -delete
find "$BUILD_DIR" -name ".gitkeep" -delete

# Create ZIP
echo "🗜️  Creating ZIP..."
cd "$BUILD_DIR"
zip -r "../$DIST_DIR/spookytabs-v$VERSION.zip" . -x "*.git*"
cd ..

echo "✅ Build complete!"
echo "📦 Output: $DIST_DIR/spookytabs-v$VERSION.zip"
echo ""
echo "Next steps:"
echo "1. Test the extension from the build folder"
echo "2. Upload to Chrome Web Store"
echo "3. Celebrate! 🎉"
