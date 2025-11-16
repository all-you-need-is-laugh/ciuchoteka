# Ciuchoteka

A Progressive Web App for wardrobe and outfit management, optimized for mobile use.

## Features

- 📱 **PWA Support**: Install on your phone's home screen
- 👔 **Wardrobe Management**: Add, edit, and organize clothing items
- 📸 **Outfit Tracking**: Create and track outfits with photos
- 📊 **Statistics**: View insights on most/least worn items, cost per wear
- 💾 **Offline-First**: Works without internet connection
- 🗂️ **Data Management**: Export/import your wardrobe data
- 🖼️ **Image Compression**: Optimized storage with automatic image compression

## Tech Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **PWA**: vite-plugin-pwa
- **Storage**: localStorage with compression
- **Hosting**: GitHub Pages

## Getting Started

### Installation

```bash
yarn i
```

### Development

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

### Deploy to GitHub Pages

```bash
yarn deploy
```

## Usage

### Adding Clothing Items
1. Navigate to the Wardrobe page
2. Click "+ Add Item"
3. Take or select a photo
4. Fill in name, category, type, and optional cost
5. Save

### Creating Outfits
1. Navigate to the Outfits page
2. Click "+ Add Outfit"
3. Take or select a photo of your outfit
4. Select the clothing items from your wardrobe
5. Choose the date and save

### Viewing Statistics
- Total items and cost
- Most worn items (top 5)
- Least worn items
- Storage usage
- Cost per wear calculations

### Data Management
- **Export**: Download your data as JSON
- **Import**: Restore data from a backup file
- **Clear All**: Reset the app (with confirmation)

## Browser Support

Optimized for Google Chrome on iOS, but works on all modern browsers with PWA support.

## Storage Limits

- Maximum localStorage size: ~5MB
- Images are automatically compressed to 80KB or less
- Warning appears at 80% storage usage

## License

MIT
