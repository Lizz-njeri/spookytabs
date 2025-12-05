#!/usr/bin/env node

/**
 * Simple icon generator for SpookyTabs
 * Creates placeholder PNG icons using Canvas
 * Run with: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 SpookyTabs Icon Generator\n');

// Check if we're in the right directory
const outputDir = path.join(__dirname, '../assets/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('✅ Created assets/images directory');
}

const sizes = [16, 32, 48, 128];

console.log('📝 Note: This script creates SVG placeholders.');
console.log('   For PNG icons, use the HTML generator in your browser.\n');

// Create SVG icons
sizes.forEach(size => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="#1a0f2e"/>
  
  <!-- Ghost shape -->
  <g transform="translate(${size/2}, ${size/2.5})">
    <!-- Head -->
    <circle cx="0" cy="0" r="${size/3}" fill="#e8e8e8"/>
    
    <!-- Body -->
    <rect x="${-size/3}" y="0" width="${size*2/3}" height="${size*0.4}" fill="#e8e8e8"/>
    
    <!-- Eyes -->
    <circle cx="${-size*0.13}" cy="${-size*0.07}" r="${size*0.08}" fill="#1a0f2e"/>
    <circle cx="${size*0.13}" cy="${-size*0.07}" r="${size*0.08}" fill="#1a0f2e"/>
  </g>
  
  <!-- Glow border -->
  <rect x="1" y="1" width="${size-2}" height="${size-2}" fill="none" stroke="#8b4f9e" stroke-width="2" opacity="0.5"/>
</svg>`;

  const filename = path.join(outputDir, `icon${size}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✅ Created icon${size}.svg`);
});

console.log('\n🎉 SVG icons created!');
console.log('\n📌 Next steps:');
console.log('1. Open scripts/generate-icons.html in your browser');
console.log('2. Click "Download All" to get PNG versions');
console.log('3. Move PNG files to assets/images/');
console.log('4. Or use these SVG files temporarily\n');
