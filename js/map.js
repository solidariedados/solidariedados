/**
 * SolidariedadosMap - Main Map Logic
 * Loads Portugal districts GeoJSON, transforms island coordinates, and renders interactive map
 */

// ============================================================================
// MAP INITIALIZATION
// ============================================================================

const map = L.map('map', {
  center: [39.5, -8.0],
  zoom: 6,
  zoomControl: true,
  attributionControl: true,
  maxBoundsViscosity: 1.0,
});

// Map bounds defined but not enforced to allow proper initial zoom
const mapBounds = [
  [34.0, -12.0],   // South-West (Madeira area)
  [45.0, -6.0],    // North-East (extended northward to add empty space at top)
];

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

// Island coordinate transformation offsets and scaling
// Azores uses scale+translate to compress the archipelago
// Madeira uses simple translation
const ISLAND_TRANSFORMS = {
  azores: {
    type: 'scale',
    center: [-28.15, 38.33],  // Original centroid
    scale: 0.20,              // Compress to 20% (left islands ~75% closer to center)
    target: [-11.2, 39.8],    // Target center position (moved 1/2 closer to mainland)
  },
  madeira: {
    type: 'scale',
    center: [-16.55, 31.57],  // Original centroid
    scale: 0.20,              // Compress to 20% (like Azores)
    target: [-11.0, 38.2],    // Target center position (south of Azores, closer to it)
  },
};

// Color palette
const COLORS = {
  district_fill: '#c4b5fd',      // Light purple fill
  district_stroke: '#7b3ff2',    // Dark purple stroke
  district_fill_hover: '#a78bfa', // Medium purple (hover)
  tooltip_bg: '#7b3ff2',
};

// District styles
const STYLE_DEFAULT = {
  fillColor: COLORS.district_fill,
  fillOpacity: 0.7,
  color: COLORS.district_stroke,
  weight: 1.5,
  opacity: 0.8,
};

const STYLE_HOVER = {
  fillColor: COLORS.district_fill_hover,
  fillOpacity: 0.85,
  color: COLORS.district_stroke,
  weight: 2.5,
  opacity: 1.0,
};

// Per-district label offsets (in pixels) for fine-tuning label positioning
// Format: { districtName: [offsetX, offsetY] }
// Positive offsetX moves left, negative moves right
// Negative offsetY moves up, positive moves down
const LABEL_OFFSETS = {
  'Lisboa': [45, 0],      // Move further left
  'Leiria': [40, 0],      // Move further left
  'Santarém': [55, 0],    // Move further left
  'Viana do Castelo': [45, 0], // Move further left
  'Aveiro': [20, 0],      // Move a little left
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Detect if a district name refers to islands
 */
function getIslandType(name) {
  if (!name) return null;
  const lower = name.toLowerCase();
  if (lower.includes('azore')) return 'azores';
  if (lower.includes('madeira')) return 'madeira';
  return null;
}

/**
 * Recursively transform coordinates
 * Supports both simple offset and scale+translate transformations
 */
function transformCoordinates(coords, transform) {
  if (typeof coords[0] === 'number') {
    // [lng, lat] pair
    const [lng, lat] = coords;

    if (transform.type === 'offset') {
      return [lng + transform.dlng, lat + transform.dlat];
    } else if (transform.type === 'scale') {
      // Scale + translate: final = target + (original - center) * scale
      const scaledLng = transform.center[0] + (lng - transform.center[0]) * transform.scale;
      const scaledLat = transform.center[1] + (lat - transform.center[1]) * transform.scale;
      return [
        scaledLng + (transform.target[0] - transform.center[0]),
        scaledLat + (transform.target[1] - transform.center[1]),
      ];
    }
    return [lng, lat];
  }
  // Nested array - recurse
  return coords.map(c => transformCoordinates(c, transform));
}

/**
 * Transform geometry based on island type
 */
function transformGeometry(geometry, islandType) {
  if (!islandType) return geometry;

  const transform = ISLAND_TRANSFORMS[islandType];
  return {
    ...geometry,
    coordinates: transformCoordinates(geometry.coordinates, transform),
  };
}

/**
 * Show loading indicator
 */
function showLoading() {
  const loading = document.getElementById('loading');
  if (loading) loading.classList.add('active');
}

/**
 * Hide loading indicator
 */
function hideLoading() {
  const loading = document.getElementById('loading');
  if (loading) loading.classList.remove('active');
}

/**
 * Show error message
 */
function showError(message) {
  const error = document.getElementById('error-message');
  if (error) {
    error.querySelector('p').textContent = message;
    error.classList.add('active');
  }
}

// ============================================================================
// LOAD AND RENDER DISTRICTS
// ============================================================================

// Create loading indicator in map
const loadingDiv = document.createElement('div');
loadingDiv.id = 'loading';
loadingDiv.innerHTML = `
  <div id="loading-spinner"></div>
  <div id="loading-text">Carregando mapa...</div>
`;
document.getElementById('map').appendChild(loadingDiv);

// Create error message div
const errorDiv = document.createElement('div');
errorDiv.id = 'error-message';
errorDiv.innerHTML = `
  <h2>Erro ao carregar</h2>
  <p></p>
`;
document.getElementById('map').appendChild(errorDiv);

showLoading();

// Use embedded GeoJSON data (static/offline mode)
// The data is loaded from js/districts-data.js
setTimeout(() => {
  if (!DISTRICTS_GEOJSON) {
    console.error('Districts data not loaded');
    showError('Dados de distritos não encontrados');
    hideLoading();
    return;
  }

  const data = DISTRICTS_GEOJSON;
    console.log('GeoJSON loaded successfully:', data.features.length, 'features');

    // Process features: transform islands, prepare rendering
    const processedFeatures = data.features.map(feature => {
      const districtName = feature.properties.name || '';
      const islandType = getIslandType(districtName);

      let geometry = feature.geometry;
      if (islandType) {
        geometry = transformGeometry(geometry, islandType);
      }

      return {
        ...feature,
        geometry,
        _districtName: districtName,
        _islandType: islandType,
      };
    });

    // Create GeoJSON layer
    const geoJsonLayer = L.geoJSON(
      { type: 'FeatureCollection', features: processedFeatures },
      {
        style: STYLE_DEFAULT,
        onEachFeature: (feature, layer) => {
          let districtName = feature._districtName;

          // Translate district names
          if (districtName.toLowerCase().includes('azore')) {
            districtName = 'Açores';
          }

          // Add hover effects and click-to-zoom
          layer.on({
            mouseover(e) {
              layer.setStyle(STYLE_HOVER);
              layer.bringToFront();
              layer
                .bindTooltip(districtName, {
                  sticky: true,
                  className: 'district-tooltip',
                  direction: 'top',
                })
                .openTooltip();
            },
            mouseout() {
              layer.setStyle(STYLE_DEFAULT);
              layer.closeTooltip();
            },
            click(e) {
              // Zoom to the clicked district
              const bounds = layer.getBounds();
              map.fitBounds(bounds, { padding: [50, 50], animate: true });
            },
          });

          // Add district label - use layer bounds for better centering
          const bounds = layer.getBounds();
          const center = bounds.getCenter();

          // Get label offset for this district if it exists
          const offset = LABEL_OFFSETS[districtName] || [0, 0];

          L.marker([center.lat, center.lng], {
            icon: L.divIcon({
              className: 'district-label',
              html: `<span>${districtName}</span>`,
              iconSize: null,
              iconAnchor: offset, // Apply offset directly to icon anchor
            }),
            interactive: false,
          }).addTo(map);
        },
      }
    );

    geoJsonLayer.addTo(map);
    console.log('Districts rendered successfully');

    // Bounds fitting removed to preserve initial zoom level

    hideLoading();
}, 100);

// ============================================================================
// LOAD LOCATION MARKERS
// ============================================================================

setTimeout(() => {
  if (!window.LOCATIONS) {
    console.warn('LOCATIONS not defined in locations.js');
    console.log('Available:', Object.keys(window));
    return;
  }

  console.log('Loading locations:', window.LOCATIONS.length);

  const locationIcon = L.divIcon({
    className: 'location-marker',
    html: '<div class="marker-pin"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -5],
  });

  const locationsList = document.getElementById('locations-list');
  if (!locationsList) {
    console.error('locations-list element not found!');
    return;
  }

  const locationMarkers = {};

  window.LOCATIONS.forEach((location, index) => {
    // Build popup HTML
    const imageHtml = location.image
      ? `<div class="popup-image"><img src="${location.image}" alt="${location.name}" onerror="this.style.display='none'"/></div>`
      : '';

    const linkHtml = location.url
      ? `<a href="${location.url}" target="_blank" rel="noopener noreferrer" class="popup-link">Saber mais →</a>`
      : '';

    const popupContent = `
      <div class="custom-popup">
        ${imageHtml}
        <div class="popup-body">
          <h3>${location.name}</h3>
          <p>${location.description || ''}</p>
          ${linkHtml}
        </div>
      </div>
    `;

    // Create and add marker
    const marker = L.marker([location.lat, location.lng], { icon: locationIcon })
      .bindPopup(popupContent, {
        maxWidth: 320,
        className: 'location-popup',
        autoPan: true,
        autoPanPaddingTopLeft: [50, 180],
        autoPanPadding: [50, 50],
      })
      .addTo(map);

    locationMarkers[index] = marker;

    // Add click handler to zoom and pan when clicking marker directly
    marker.on('click', function() {
      map.setView([location.lat, location.lng], 8, { animate: true });
    });

    // Add to sidebar list
    const listItem = document.createElement('div');
    listItem.className = 'location-item';
    listItem.innerHTML = `
      <h3>${location.name}</h3>
      ${location.url ? '<a href="' + location.url + '" target="_blank">Visitar →</a>' : ''}
    `;

    // Click on sidebar item to focus marker on map
    listItem.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A') {
        map.setView([location.lat, location.lng], 8);
        // Use setTimeout to ensure view is set before opening popup
        setTimeout(() => {
          marker.openPopup();
        }, 100);
      }
    });

    locationsList.appendChild(listItem);
  });

  console.log('Location markers loaded:', window.LOCATIONS.length, 'locations');
}, 500);

// ============================================================================
// SIDEBAR TOGGLE
// ============================================================================

// Initialize sidebar toggle - make entire header clickable
const toggleBtn = document.getElementById('sidebar-toggle');
const sidebarHeader = document.getElementById('sidebar-header');
const locationsList = document.getElementById('locations-list');
const sidebarElement = document.getElementById('locations-sidebar');

// Function to toggle sidebar state
function toggleSidebar() {
  if (locationsList && sidebarElement && toggleBtn) {
    locationsList.classList.toggle('hidden');
    sidebarElement.classList.toggle('collapsed');
    // Update button text based on list state
    toggleBtn.textContent = locationsList.classList.contains('hidden') ? '+' : '−';
    console.log('List is now:', locationsList.classList.contains('hidden') ? 'hidden' : 'visible');
  }
}

if (sidebarHeader && locationsList && sidebarElement) {
  console.log('Sidebar toggle initialized');
  // Make entire header clickable
  sidebarHeader.addEventListener('click', (e) => {
    console.log('Sidebar header clicked');
    e.stopPropagation();
    toggleSidebar();
  });
} else {
  console.warn('Sidebar elements not found:', { sidebarHeader, locationsList, sidebarElement });
}

// ============================================================================
// POPUP TRANSPARENCY - Make sidebar semi-transparent when popup is open
// ============================================================================

// Listen for popup open event
map.on('popupopen', function() {
  const sidebar = document.getElementById('locations-sidebar');
  if (sidebar) {
    sidebar.classList.add('popup-open');
  }
});

// Listen for popup close event
map.on('popupclose', function() {
  const sidebar = document.getElementById('locations-sidebar');
  if (sidebar) {
    sidebar.classList.remove('popup-open');
  }
});
