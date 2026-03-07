# SolidariedadosMap 🗺️

Interactive map of Portugal with 20 districts, optimized island positioning, and configurable location markers.

## ✨ Features

- **20 Portuguese Districts** with realistic geography
- **Azores**: Compressed & positioned for optimal space usage
- **Madeira**: Compressed & positioned near Azores
- **District Labels**: Hover tooltips with district names
- **Location Markers**: Customizable with images, descriptions, and links
- **Interactive**: Zoom, pan, click popups
- **Professional Design**: Purple theme with light gray background

## 🚀 How to Run

### Option 1: Direct HTML (No Server Needed) ⭐ **RECOMMENDED**
Just open `index.html` directly in your browser:
```
Double-click: index.html
```

The map is now **fully static** with all data embedded!

### Option 2: Local Web Server (if you prefer)
Double-click: `START_SERVER.bat`

This will start a Python server at http://localhost:8000

## 📁 Project Structure

```
SolidariedadosMap/
├── index.html              Main page
├── js/
│   ├── districts-data.js   Embedded GeoJSON data (173KB)
│   ├── map.js              Map logic & transformations
│   └── locations.js        Configurable locations (POIs)
├── css/
│   └── style.css           Purple theme & responsive design
└── data/
    └── districts.json      Original data (not needed anymore)
```

## ✏️ Customize

### Add/Edit Locations
Edit `js/locations.js`:
```javascript
const LOCATIONS = [
  {
    name: "Your Organization",
    description: "Description here",
    image: "https://example.com/image.jpg",
    url: "https://example.com",
    lat: 38.7223,
    lng: -9.1393,
  },
];
```

### Adjust Island Positioning
Edit `js/map.js` - Find `ISLAND_TRANSFORMS`:
```javascript
azores: {
  target: [-11.2, 39.8],    // Adjust these values
},
madeira: {
  target: [-11.0, 38.2],    // Adjust these values
},
```

## 📊 Technical Details

| Aspect | Details |
|--------|---------|
| **Framework** | Leaflet.js |
| **Data** | GeoJSON (embedded) |
| **Data Size** | 173KB (minified) |
| **Compression** | Scale 0.20 for both islands |
| **Colors** | Purple (#7B3FF2) |
| **Browser** | Any modern browser (Chrome, Firefox, Safari, Edge) |
| **Requirements** | None! Works offline |

## 🎯 Island Positioning

- **Azores**: Scale 0.20, Position [-11.2°, 39.8°]
- **Madeira**: Scale 0.20, Position [-11.0°, 38.2°]

Islands are compressed to 20% of original size and positioned for optimal space usage while maintaining clarity.

## 📦 Deployment

### GitHub Pages (Free)
1. Push to GitHub repo
2. Enable Pages in settings
3. Get instant URL: `https://username.github.io/SolidariedadosMap`

### Netlify / Vercel (Free)
Drag & drop the folder or connect your GitHub repo.

### Your Own Server
Copy files to any web server (Apache, Nginx, etc.)

## 🔧 No Dependencies

- ✅ Leaflet.js (from CDN)
- ✅ All data embedded
- ✅ No backend server needed
- ✅ Works offline
- ✅ Pure HTML/CSS/JS

## 📝 Notes

- The GeoJSON data is now embedded in `js/districts-data.js` for offline use
- Original `data/districts.json` is kept for reference but no longer needed
- Map automatically fits to show all districts and islands
- All district labels are clickable (show tooltip on hover)

---

**Created with ❤️ using Leaflet.js**
