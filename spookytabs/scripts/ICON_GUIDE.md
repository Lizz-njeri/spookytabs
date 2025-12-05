# Icon Generation Guide

## Quick Start

1. Open `generate-icons.html` in any web browser
2. Click "Download All Icons" button
3. Save the 4 PNG files to `../assets/images/`

That's it! Your extension now has professional icons.

## What You Get

The icon generator creates a ghostly figure with:
- **Dark purple gradient background** - Matches the extension theme
- **White ghost shape** - Simple, recognizable silhouette
- **Wavy bottom edge** - Classic ghost appearance
- **Two eyes** - Gives character and personality
- **Purple glow effect** - Adds mystical atmosphere

## Icon Sizes

- **16x16** - Shows in browser toolbar (small)
- **32x32** - Retina display toolbar icon
- **48x48** - Extension management page
- **128x128** - Chrome Web Store listing

## Customizing the Icons

If you want to modify the design, edit `generate-icons.html`:

### Change Colors

Find this section in the `drawIcon` function:
```javascript
// Background - dark purple gradient
const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
gradient.addColorStop(0, '#2d1b4e');  // Inner color
gradient.addColorStop(1, '#1a0f2e');  // Outer color
```

### Change Ghost Color
```javascript
ctx.fillStyle = '#e8e8e8';  // Change this hex color
```

### Change Glow Color
```javascript
ctx.shadowColor = '#8b4f9e';  // Change this hex color
```

### Adjust Ghost Size
```javascript
const headRadius = size * 0.25;  // Make larger: 0.30, smaller: 0.20
```

## Alternative: Use Your Own Icons

If you prefer custom icons:

1. Create 4 PNG files (16x16, 32x32, 48x48, 128x128)
2. Name them: `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`
3. Place in `spookytabs/assets/images/`
4. Make sure they're square and have transparent backgrounds

### Design Tips

- Keep it simple - icons are viewed at small sizes
- Use high contrast - dark background, light foreground
- Make it recognizable - should be clear what it represents
- Test at 16x16 - if it looks good small, it'll look good everywhere
- Use transparency - PNG format with alpha channel

## Recommended Tools

If you want to create custom icons:

- **Free Online**: Photopea (photopea.com)
- **Desktop**: GIMP (free), Photoshop, Affinity Designer
- **Vector**: Inkscape (free), Illustrator
- **Simple**: Canva (canva.com)

## Icon Requirements

For Chrome Web Store submission:
- PNG format
- Square dimensions
- Transparent background recommended
- Clear at small sizes
- No text (icons should be symbolic)
- Consistent style across all sizes

## Testing Your Icons

After generating/creating icons:

1. Reload extension at `chrome://extensions/`
2. Check toolbar icon (should be 16x16)
3. Check extension management page
4. View on both light and dark browser themes
5. Test on high-DPI displays if available

## Troubleshooting

### Icons don't show up
- Check file names match exactly: `icon16.png`, etc.
- Verify files are in `spookytabs/assets/images/`
- Reload extension
- Check browser console for errors

### Icons look blurry
- Make sure each size is exactly the right dimensions
- Don't resize a small icon to make a large one
- Generate each size separately for best quality

### Icons have white background
- Save as PNG with transparency
- Check alpha channel is preserved
- Don't use JPG format

## Need Help?

- Check `DEBUGGING_SETTINGS.md` for general troubleshooting
- Verify manifest.json points to correct icon paths
- Test with the default emoji icons first to rule out other issues
