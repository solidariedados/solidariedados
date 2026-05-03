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
  maxZoom: 18,
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
  district_stroke: '#2C1040',    // Dark purple stroke
  district_fill_hover: '#a78bfa', // Medium purple (hover)
  tooltip_bg: '#2C1040',
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

  const clusterGroup = L.markerClusterGroup({
    iconCreateFunction: function(cluster) {
      return L.divIcon({
        html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
        className: 'cluster-wrapper',
        iconSize: L.point(38, 38),
      });
    },
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    maxClusterRadius: 60,
  });

  const locationMarkers = {};

  // SVG icons for social links
  const ICON_MAPS = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
  const ICON_INSTAGRAM = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
  const ICON_DISCORD = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.032.05a19.9 19.9 0 0 0 5.993 3.032.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.032.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`;
  const ICON_TWITCH = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>`;
  const ICON_WEBSITE = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`;
  const ICON_YOUTUBE = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`;

  window.LOCATIONS.forEach((location, index) => {
    // Build popup HTML
    const imageHtml = location.image
      ? `<div class="popup-image"><img src="${location.image}" alt="${location.name}" onerror="this.style.display='none'"/></div>`
      : '';

    const districtHtml = location.distrito
      ? `<p class="popup-district">${location.distrito}</p>`
      : '';

    const socialLinks = [];
    if (location.maps) {
      socialLinks.push(`<a href="${location.maps}" target="_blank" rel="noopener noreferrer" class="social-btn social-maps" title="Ver no Google Maps">${ICON_MAPS}</a>`);
    }
    if (location.instagram) {
      socialLinks.push(`<a href="https://www.instagram.com/${location.instagram}/" target="_blank" rel="noopener noreferrer" class="social-btn social-instagram" title="Instagram @${location.instagram}">${ICON_INSTAGRAM}</a>`);
    }
    if (location.discord) {
      socialLinks.push(`<a href="${location.discord}" target="_blank" rel="noopener noreferrer" class="social-btn social-discord" title="Discord">${ICON_DISCORD}</a>`);
    }
    if (location.twitch) {
      socialLinks.push(`<a href="${location.twitch}" target="_blank" rel="noopener noreferrer" class="social-btn social-twitch" title="Twitch">${ICON_TWITCH}</a>`);
    }
    if (location.youtube) {
      socialLinks.push(`<a href="${location.youtube}" target="_blank" rel="noopener noreferrer" class="social-btn social-youtube" title="YouTube">${ICON_YOUTUBE}</a>`);
    }
    if (location.website) {
      socialLinks.push(`<a href="${location.website}" target="_blank" rel="noopener noreferrer" class="social-btn social-website" title="Website">${ICON_WEBSITE}</a>`);
    }
    const ICON_KEYWORDS = { instagram: ICON_INSTAGRAM, discord: ICON_DISCORD, twitch: ICON_TWITCH, youtube: ICON_YOUTUBE, website: ICON_WEBSITE, maps: ICON_MAPS };
    [location.custom1, location.custom2, location.custom3].forEach(custom => {
      if (!custom) return;
      let iconHtml;
      if (ICON_KEYWORDS[custom.icon]) {
        iconHtml = ICON_KEYWORDS[custom.icon];
      } else if (custom.icon && (custom.icon.startsWith('http') || custom.icon.startsWith('/'))) {
        iconHtml = `<img src="${custom.icon}" alt="${custom.name}" style="width:15px;height:15px;object-fit:contain;"/>`;
      } else {
        iconHtml = `<span style="font-size:14px;line-height:1;">${custom.icon}</span>`;
      }
      socialLinks.push(`<a href="${custom.link}" target="_blank" rel="noopener noreferrer" class="social-btn social-custom" title="${custom.name}">${iconHtml}</a>`);
    });
    const socialHtml = socialLinks.length > 0
      ? `<div class="popup-social">${socialLinks.join('')}</div>`
      : '';

    const popupContent = `
      <div class="custom-popup">
        ${imageHtml}
        <div class="popup-body">
          <h3>${location.name}</h3>
          ${districtHtml}
          ${(() => {
            const desc = location.description || '';
            const limit = 100;
            if (desc.length <= limit) return `<p>${desc}</p>`;
            const short = desc.slice(0, limit).trimEnd() + '…';
            const id = `desc-${index}`;
            return `<p id="${id}-short">${short} <button class="read-more-btn" onclick="(function(){document.getElementById('${id}-short').style.display='none';document.getElementById('${id}-full').style.display='block'})()">Ler mais</button></p><p id="${id}-full" style="display:none">${desc} <button class="read-more-btn" onclick="(function(){document.getElementById('${id}-full').style.display='none';document.getElementById('${id}-short').style.display='block'})()">Ler menos</button></p>`;
          })()}
          ${socialHtml}
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
      .addTo(clusterGroup);

    locationMarkers[index] = marker;

    // autoPan on the popup handles positioning when marker is clicked

    // Add to sidebar list
    const listItem = document.createElement('div');
    listItem.className = 'location-item';
    listItem.innerHTML = `
      <h3>${location.name}</h3>
      ${location.distrito ? `<p class="item-district">${location.distrito}</p>` : ''}
    `;

    // Click on sidebar item to focus marker on map
    listItem.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A') {
        clusterGroup.zoomToShowLayer(marker, () => marker.openPopup());
      }
    });

    locationsList.appendChild(listItem);
  });

  // Sort sidebar list alphabetically by name
  Array.from(locationsList.children)
    .sort((a, b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent, 'pt'))
    .forEach(item => locationsList.appendChild(item));

  clusterGroup.addTo(map);

  // Return a pinned marker back into the cluster group
  function returnMarkerToCluster(marker) {
    if (map.hasLayer(marker) && !clusterGroup.hasLayer(marker)) {
      map.removeLayer(marker);
      clusterGroup.addLayer(marker);
    }
  }

  // When a cluster spiderfies, intercept clicks on each marker in capture phase
  // so the unspiderfy never fires — the spiderfy stays open while a popup is shown
  clusterGroup.on('spiderfied', function(e) {
    e.markers.forEach(function(marker) {
      const el = marker.getElement();
      if (!el) return;
      marker._keepSpiderfyOpen = function(evt) {
        evt.stopPropagation();
        marker.openPopup();
      };
      el.addEventListener('click', marker._keepSpiderfyOpen, true);
    });
  });

  clusterGroup.on('unspiderfied', function(e) {
    e.markers.forEach(function(marker) {
      const el = marker.getElement();
      if (el && marker._keepSpiderfyOpen) {
        el.removeEventListener('click', marker._keepSpiderfyOpen, true);
      }
      delete marker._keepSpiderfyOpen;
    });
  });

  window.LOCATIONS.forEach((_, i) => {
    const m = locationMarkers[i];
    let isPinned = false;
    let reattaching = false;

    m.on('popupopen', function() {
      if (!isPinned) {
        isPinned = true;
        // Only pin to map when not spiderfied; spiderfied markers stay in the
        // cluster so the spiderfy legs remain visible
        if (clusterGroup._spiderfied == null) {
          reattaching = true;
          clusterGroup.removeLayer(m);
          m.addTo(map);
          reattaching = false;
          m.openPopup();
        }
      }
    });

    m.on('popupclose', function() {
      if (isPinned && !reattaching) {
        isPinned = false;
        returnMarkerToCluster(m);
      }
    });
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
const searchContainer = document.getElementById('sidebar-search');
const searchInput = document.getElementById('search-input');

function toggleSidebar() {
  if (locationsList && sidebarElement && toggleBtn) {
    const isHidden = !locationsList.classList.contains('hidden');
    locationsList.classList.toggle('hidden');
    if (searchContainer) searchContainer.classList.toggle('hidden');
    sidebarElement.classList.toggle('collapsed');
    toggleBtn.textContent = isHidden ? '+' : '−';
    if (isHidden && searchInput) {
      searchInput.value = '';
      filterLocations('');
    }
  }
}

function filterLocations(query) {
  const items = document.querySelectorAll('.location-item');
  const q = query.toLowerCase();
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(q) ? '' : 'none';
  });
}

if (searchInput) {
  searchInput.addEventListener('input', function() {
    filterLocations(this.value);
  });
  searchInput.addEventListener('click', function(e) {
    e.stopPropagation();
  });
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

  // Allow dragging the map from non-interactive popup areas (works on mobile too)
  const wrapper = document.querySelector('.leaflet-popup-content-wrapper');
  if (wrapper && !wrapper._dragHandlerAttached) {
    wrapper._dragHandlerAttached = true;

    function startMapDrag(e) {
      const isInteractive = e.target.closest(
        'a, button, .read-more-btn, .social-btn, .popup-link, .leaflet-popup-close-button'
      );
      if (!isInteractive && map.dragging && map.dragging._draggable) {
        map.dragging._draggable._onDown(e);
      }
    }

    wrapper.addEventListener('mousedown', startMapDrag, { capture: true });
    wrapper.addEventListener('touchstart', startMapDrag, { capture: true, passive: true });
  }
});

// Listen for popup close event
map.on('popupclose', function() {
  const sidebar = document.getElementById('locations-sidebar');
  if (sidebar) {
    sidebar.classList.remove('popup-open');
  }
});
