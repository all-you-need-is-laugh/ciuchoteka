# Ciuchoteka - Setup Instructions

## Project Structure

```
ciuchoteka/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment workflow
├── public/                     # Static assets
│   ├── pwa-192x192.png        # PWA icon (192x192)
│   ├── pwa-512x512.png        # PWA icon (512x512)
│   └── apple-touch-icon.png   # Apple touch icon
├── src/
│   ├── components/            # React components
│   │   ├── BottomNav.tsx      # Bottom navigation
│   │   ├── BottomNav.css
│   │   ├── ClothingItemCard.tsx
│   │   ├── ClothingItemCard.css
│   │   ├── ClothingItemForm.tsx
│   │   ├── ClothingItemForm.css
│   │   ├── OutfitCard.tsx
│   │   ├── OutfitCard.css
│   │   ├── OutfitForm.tsx
│   │   └── OutfitForm.css
│   ├── hooks/                 # Custom React hooks
│   │   └── useAppData.ts      # Main data management hook
│   ├── pages/                 # Page components
│   │   ├── Wardrobe.tsx
│   │   ├── Wardrobe.css
│   │   ├── Outfits.tsx
│   │   ├── Outfits.css
│   │   ├── Statistics.tsx
│   │   └── Statistics.css
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── utils/                 # Utility functions
│   │   ├── imageCompression.ts
│   │   ├── statistics.ts
│   │   └── storage.ts
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   ├── index.css             # Global styles
│   └── vite-env.d.ts         # Vite type definitions
├── index.html                # HTML template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tsconfig.node.json        # TypeScript config for Node
├── vite.config.ts            # Vite configuration
└── README.md                 # Documentation
```

## Installation Steps

### 1. Install Dependencies

```bash
yarn install --frozen-lockfile
```

This will install:
- React & React DOM
- React Router DOM
- TypeScript
- Vite & plugins
- browser-image-compression
- PWA dependencies

### 2. Replace Icon Placeholders

The current icon files in `public/` are SVG placeholders. For production:

1. Create proper PNG icons:
   - `pwa-192x192.png` (192x192 pixels)
   - `pwa-512x512.png` (512x512 pixels)
   - `apple-touch-icon.png` (180x180 pixels)

2. You can use tools like:
   - [Figma](https://figma.com) for design
   - [RealFaviconGenerator](https://realfavicongenerator.net/) for generation
   - [Squoosh](https://squoosh.app/) for optimization

### 3. Update Configuration

In `vite.config.ts`, update the `base` property if your GitHub repository name is different:

```typescript
base: '/your-repo-name/',
```

Also update in `src/main.tsx` and `index.html` references to match.

### 4. Development

Start the development server:

```bash
yarn dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
yarn build
```

This creates an optimized build in the `dist/` folder.

### 6. Preview Production Build

```bash
yarn preview
```

## GitHub Pages Deployment

### Option 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "GitHub Actions" as the source
4. The workflow will automatically deploy on push to `main` branch

### Option 2: Manual Deployment

```bash
yarn deploy
```

This builds and deploys to `gh-pages` branch.

## Configuration Details

### PWA Configuration

The PWA is configured in `vite.config.ts` with:
- Auto-update service worker
- Offline support
- App manifest with icons and theme colors
- Cache-first strategy for static assets

### Storage Configuration

- Uses localStorage with 5MB limit
- Images compressed to max 80KB
- Warning at 80% storage usage
- Export/import functionality for data backup

### Image Compression

- Clothing items: max 600x600px, 80KB
- Outfits: max 800x800px, 80KB
- Quality: 70-75% JPEG
- Automatic compression on upload

## Browser Support

- **Primary**: Google Chrome on iOS
- **Compatible**: All modern browsers with PWA support
- **Required features**:
  - localStorage
  - Service Workers
  - File API
  - Camera access (for photo capture)

## Troubleshooting

### Icons Not Showing

1. Clear browser cache
2. Verify icon files exist in `public/`
3. Check file names match manifest configuration

### Service Worker Not Registering

1. Ensure HTTPS (or localhost)
2. Check browser console for errors
3. Verify path matches in `main.tsx`

### Storage Full

1. Export data as backup
2. Clear old outfits
3. Delete unused clothing items
4. Import backup if needed

### Camera Not Working

1. Ensure HTTPS connection
2. Grant camera permissions
3. Check browser camera support
4. Alternative: use file picker instead

## Development Tips

### Adding New Features

1. Types: Add to `src/types/index.ts`
2. Storage: Update `src/utils/storage.ts`
3. Hooks: Update `src/hooks/useAppData.ts`
4. UI: Create components in `src/components/`

### Testing Offline

1. Build production version
2. Serve with `yarn preview`
3. Open DevTools → Application → Service Workers
4. Check "Offline" mode
5. Test functionality

### Debugging

1. React DevTools for component inspection
2. Redux DevTools (if state management added)
3. Chrome DevTools → Application for PWA testing
4. Lighthouse for PWA audit

## Performance Optimization

- Images automatically compressed
- Lazy loading for large lists (not yet implemented)
- Virtual scrolling for >50 items (not yet implemented)
- Service worker caching
- Code splitting with React Router

## Future Enhancements

Consider adding:
- [ ] Virtual scrolling for large lists
- [ ] Image editing (crop, rotate)
- [ ] Multiple photo uploads per item
- [ ] Tags/labels for items
- [ ] Search functionality
- [ ] Filters and sorting options
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Cloud sync (Firebase, etc.)
- [ ] Social sharing

## License

MIT License - feel free to use and modify for your needs.
