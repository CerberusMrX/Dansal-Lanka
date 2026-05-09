/* ═══ DANSAL LANKA – APP.JS ═══ */
/* Designed by SerendibWare */

// API Endpoint - Change this URL to your deployed Render backend URL when in production
const API_URL = 'http://localhost:5000/api/dansals';

let currentLang = 'si';
let favorites = JSON.parse(localStorage.getItem('dansalFavs') || '[]');
let dansalData = [];
let map; // Leaflet map instance
let mapMarkers = [];

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', async () => {
  createAmbientParticles();
  createHeroLanterns();
  createHeroFlags();
  initScrollEffects();
  
  // Initialize Leaflet Map
  initLeafletMap();

  // Fetch data from backend
  await fetchDansals();

  renderSidebarCards();
  renderDansalGrid();
  renderThoranScroll();
  animateStats();
});

// ═══ LEAFLET MAP ═══
function initLeafletMap() {
  // Center map on Sri Lanka
  map = L.map('map').setView([7.8731, 80.7718], 7);

  // Add standard, clear OpenStreetMap tiles (looks very similar to Google Maps)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);

  // Map controls
  map.zoomControl.setPosition('bottomright');
}

function renderMapPins() {
  // Clear existing markers
  mapMarkers.forEach(marker => map.removeLayer(marker));
  mapMarkers = [];

  dansalData.forEach(d => {
    if(!d.lat || !d.lng) return;

    // Create custom icon based on type
    const color = d.type === 'food' ? '#fd79a8' : 
                  d.type === 'thoran' ? '#ffd166' : 
                  d.type === 'pansal' ? '#a29bfe' : 
                  d.type === 'bakthi_geetha' ? '#74b9ff' : '#55efc4';
    
    const customIcon = L.divIcon({
      className: 'custom-leaflet-icon',
      html: `<div class="pin-dot" style="background: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 0 12px ${color};">${d.icon || '📍'}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });

    const name = currentLang === 'si' ? d.name : (d.nameEn || d.name);
    
    const marker = L.marker([d.lat, d.lng], { icon: customIcon }).addTo(map);
    
    marker.bindPopup(`
      <div style="color: #000; font-family: 'Noto Sans Sinhala', sans-serif;">
        <strong>${name}</strong><br/>
        📍 ${d.loc}<br/>
        🕒 ${formatDateTime(d)}<br/>
        ${d.specials && d.specials.length ? `<small>${d.specials.join(', ')}</small><br/>` : ''}
        <a href="https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lng}" target="_blank" style="display:inline-block; margin-top:8px; background:#0984e3; color:#fff; padding:5px 10px; border-radius:4px; text-decoration:none; font-size:12px; font-weight:600;">🧭 ${currentLang === 'si' ? 'ගමන් මාර්ගය' : 'Directions'}</a>
      </div>
    `);

    mapMarkers.push(marker);
  });
}

// ═══ DATA FETCHING ═══
async function fetchDansals() {
  try {
    const res = await fetch(API_URL);
    if(res.ok) {
      dansalData = await res.json();
    } else {
      console.warn("API failed, using empty data");
      dansalData = [];
    }
  } catch(err) {
    console.error("Fetch error:", err);
    dansalData = [];
  }
  
  // Render pins after data loads
  renderMapPins();
}

// ═══ AMBIENT PARTICLES ═══
function createAmbientParticles() {
  const c = document.getElementById('ambient');
  const colors = ['#ffd166','#ff9b3f','#f7a1b5','#e84393','#ffd700'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 4 + 2;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;background:${colors[i%colors.length]};animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*10}s;`;
    c.appendChild(p);
  }
}

// ═══ HERO LANTERNS ═══
function createHeroLanterns() {
  const c = document.getElementById('heroLanterns');
  const colors = [
    ['#ffd166','#ff9b3f'],['#f7a1b5','#e84393'],['#74b9ff','#0984e3'],
    ['#55efc4','#00b894'],['#ffeaa7','#fdcb6e']
  ];
  for (let i = 0; i < 8; i++) {
    const l = document.createElement('div');
    l.className = 'hero-lantern';
    const [c1, c2] = colors[i % colors.length];
    const left = 5 + (i * 12.5);
    l.style.cssText = `left:${left}%;top:${Math.random()*30+5}%;animation-delay:${i*0.5}s;`;
    l.innerHTML = `<div class="lantern-string"></div><div class="lantern-body" style="background:linear-gradient(180deg,${c1},${c2})"></div>`;
    c.appendChild(l);
  }
}

// ═══ HERO FLAGS ═══
function createHeroFlags() {
  const c = document.getElementById('heroFlags');
  const flagColors = ['#0072C6','#FFD700','#FF0000','#FF6600','#FFFFFF'];
  for (let i = 0; i < 12; i++) {
    const f = document.createElement('div');
    f.className = 'buddhist-flag';
    f.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*40+10}%;background:${flagColors[i%5]};animation-delay:${i*0.3}s;opacity:${0.15+Math.random()*0.2};`;
    c.appendChild(f);
  }
}

function formatDateTime(d) {
  if (d.time) return d.time; // Fallback for old seed data
  if (!d.date && !d.startTime) return 'N/A';
  return `${d.date || ''} | ${d.startTime || ''} - ${d.endTime || ''}`;
}

// ═══ SIDEBAR ═══
function renderSidebarCards() {
  const c = document.getElementById('sidebarContent');
  c.innerHTML = '';
  if(dansalData.length === 0) {
    c.innerHTML = `<div style="text-align:center;padding:20px;color:rgba(255,255,255,0.5)">${currentLang === 'si' ? 'දත්ත නොමැත' : 'No data available'}</div>`;
    return;
  }

  dansalData.filter(d => d.type === 'food').forEach(d => {
    const isFav = favorites.includes(d._id || d.id);
    const name = currentLang === 'si' ? d.name : (d.nameEn || d.name);
    const specials = currentLang === 'si' ? (d.specials || []) : (d.specialsEn || d.specials || []);
    c.innerHTML += `
      <div class="dansal-card" onclick="panToMap(${d.lat}, ${d.lng}, '${name}')">
        <div class="card-img-placeholder">${d.icon || '📍'}</div>
        <div class="card-body">
          <div class="card-title">${name}</div>
          <div class="card-loc">📍 ${d.loc}</div>
          <div class="card-tags">${specials.map(s => `<span class="card-tag">${s}</span>`).join('')}</div>
          <div class="card-bottom">
            <span class="card-status ${d.open ? 'open' : 'closed'}">${d.open ? '🟢 ' + (currentLang==='si'?'විවෘතයි':'Open') : '🔴 ' + (currentLang==='si'?'වසා ඇත':'Closed')}</span>
            <div style="display:flex; align-items:center; gap:8px;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lng}" target="_blank" onclick="event.stopPropagation()" style="text-decoration:none; font-size:18px;" title="Get Directions">🧭</a>
              <button class="card-fav ${isFav ? 'active' : ''}" onclick="event.stopPropagation();toggleFav('${d._id || d.id}',this)">${isFav ? '❤️' : '🤍'}</button>
            </div>
          </div>
        </div>
      </div>`;
  });
}

function panToMap(lat, lng, name) {
  if(!lat || !lng) return;
  map.flyTo([lat, lng], 14);
  showToast(`📍 ${name}`);
}

// ═══ DANSALS GRID ═══
function renderDansalGrid() {
  const c = document.getElementById('dansalsGrid');
  c.innerHTML = '';
  dansalData.forEach(d => {
    const name = currentLang === 'si' ? d.name : (d.nameEn || d.name);
    const specials = currentLang === 'si' ? (d.specials || []) : (d.specialsEn || d.specials || []);
    c.innerHTML += `
      <div class="grid-card">
        <div class="grid-card-img">${d.icon || '📍'}
          <div class="img-badge">${d.open ? '🟢 Live' : '🔴 Closed'}</div>
        </div>
        <div class="grid-card-body">
          <h3>${name}</h3>
          <div class="gc-loc">📍 ${d.loc}</div>
          <div class="gc-specials">${specials.map(s => `<span class="gc-special-tag">${s}</span>`).join('')}</div>
        </div>
        <div class="grid-card-footer">
          <span class="gc-time">🕐 ${formatDateTime(d)}</span>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lng}" target="_blank" title="Get Directions" style="text-decoration:none; font-size:18px;">🧭</a>
            <div class="gc-rating">${'★'.repeat(d.rating || 5)}${'☆'.repeat(5-(d.rating || 5))}</div>
          </div>
        </div>
      </div>`;
  });
}

// ═══ THORAN SCROLL ═══
function renderThoranScroll() {
  const c = document.getElementById('thoranScroll');
  c.innerHTML = '';
  
  const thorans = dansalData.filter(d => ['thoran', 'pansal', 'bakthi_geetha', 'kalapa'].includes(d.type));
  
  if(thorans.length === 0) {
    c.innerHTML = `<div style="padding:20px;color:rgba(255,255,255,0.5)">${currentLang === 'si' ? 'තොරතුරු නොමැත' : 'No data available'}</div>`;
    return;
  }

  thorans.forEach(t => {
    const name = currentLang === 'si' ? t.name : (t.nameEn || t.name);
    c.innerHTML += `
      <div class="thoran-card" onclick="panToMap(${t.lat}, ${t.lng}, '${name}')" style="cursor:pointer;">
        <div class="thoran-card-img">${t.icon || '🏯'}</div>
        <div class="thoran-card-body">
          <h3>${name}</h3>
          <p>📍 ${t.loc} <a href="https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}" target="_blank" onclick="event.stopPropagation()" style="text-decoration:none; margin-left:8px; font-size:16px;" title="Get Directions">🧭</a></p>
        </div>
      </div>`;
  });
}

// ═══ STAT COUNTER ═══
function animateStats() {
  const foodCount = dansalData.filter(d => d.type === 'food').length || 0;
  const thoranCount = dansalData.filter(d => d.type === 'thoran').length || 0;
  const pansalCount = dansalData.filter(d => d.type === 'pansal').length || 0;
  const bakthiCount = dansalData.filter(d => d.type === 'bakthi_geetha').length || 0;

  const statNums = document.querySelectorAll('.stat-num');
  if(statNums.length >= 4) {
    statNums[0].dataset.count = foodCount;
    statNums[1].dataset.count = thoranCount;
    statNums[2].dataset.count = pansalCount;
    statNums[3].dataset.count = bakthiCount;
  }

  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.ceil(target / 30) || 1;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 30);
  });
}

// ═══ NOTIFICATIONS ═══
function showNotifications() {
  const latestCount = Math.min(dansalData.length, 5);
  const msgSi = `🔔 නව දන්සල් ${latestCount} ක් එකතු වී ඇත!`;
  const msgEn = `🔔 ${latestCount} new Dansals have been added!`;
  showToast(currentLang === 'si' ? msgSi : msgEn);
}

// ═══ SCROLL EFFECTS ═══
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
  // Intersection observer for fade-in
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }});
  }, { threshold: 0.1 });
  document.querySelectorAll('.grid-card, .thoran-card, .dansal-card').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    obs.observe(el);
  });
}

// ═══ LANGUAGE TOGGLE ═══
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  document.querySelectorAll('[data-si]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.querySelectorAll(`[data-${lang}-placeholder]`).forEach(el => {
    el.placeholder = el.dataset[`${lang}Placeholder`];
  });
  renderSidebarCards();
  renderDansalGrid();
  renderThoranScroll();
  renderMapPins();
}

// ═══ INTERACTIONS ═══
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function doSearch() {
  const q = document.getElementById('searchInput').value;
  if (q) showToast(`🔍 "${q}" ${currentLang === 'si' ? 'සොයමින්...' : 'Searching...'}`);
}

function zoomMap(factor) {
  if (factor > 1) {
    map.zoomIn();
    showToast('🔍 Zoom In');
  } else {
    map.zoomOut();
    showToast('🔍 Zoom Out');
  }
}

function locateMe() {
  if (!navigator.geolocation) {
    showToast(currentLang === 'si' ? '❌ ඔබගේ බ්‍රව්සරය ස්ථානය ලබාදීමට සහය නොදක්වයි' : '❌ Geolocation is not supported by your browser');
    return;
  }
  
  showToast(currentLang === 'si' ? '📍 ඔබගේ ස්ථානය සොයමින්...' : '📍 Finding your exact location...');
  
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    // Add a pulsing marker for user location
    const userIcon = L.divIcon({
      className: 'user-location-marker',
      html: '<div style="width:16px;height:16px;background:#3498db;border:3px solid #fff;border-radius:50%;box-shadow:0 0 15px rgba(52,152,219,0.8);"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });
    
    L.marker([lat, lng], { icon: userIcon }).addTo(map)
      .bindPopup(currentLang === 'si' ? 'ඔබ ඉන්නේ මෙතැනයි!' : 'You are here!')
      .openPopup();
      
    // Fly to user location
    map.flyTo([lat, lng], 15, {
      animate: true,
      duration: 1.5
    });
  }, (error) => {
    console.error(error);
    showToast(currentLang === 'si' ? '❌ ඔබගේ ස්ථානය ලබාගැනීමට නොහැකි විය' : '❌ Unable to retrieve your location');
  }, { enableHighAccuracy: true });
}

function filterTag(btn, type) {
  document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  showToast(`${type === 'all' ? '🌐' : type === 'food' ? '🍚' : type === 'thoran' ? '🏯' : type === 'pansal' ? '🎆' : '🏮'} ${currentLang === 'si' ? 'පෙරහන:' : 'Filter:'} ${btn.textContent}`);
}

function mapFilter(btn, type) {
  document.querySelectorAll('.mf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function sideTab(btn, tab) {
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (tab === 'favorites') {
    const c = document.getElementById('sidebarContent');
    const favItems = dansalData.filter(d => favorites.includes(d._id || d.id));
    if (favItems.length === 0) {
      c.innerHTML = '<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.3)">❤️<br/>' + (currentLang==='si' ? 'ප්‍රියතම නැත' : 'No favorites yet') + '</div>';
    } else {
      // Temporarily set dansalData to favItems for rendering, then restore
      const allData = [...dansalData];
      dansalData = favItems;
      renderSidebarCards();
      dansalData = allData;
    }
  } else {
    renderSidebarCards();
  }
}

function toggleFav(id, btn) {
  const idx = favorites.indexOf(id);
  if (idx > -1) { favorites.splice(idx, 1); btn.textContent = '🤍'; btn.classList.remove('active'); }
  else { favorites.push(id); btn.textContent = '❤️'; btn.classList.add('active'); }
  localStorage.setItem('dansalFavs', JSON.stringify(favorites));
  showToast(idx > -1 ? (currentLang === 'si' ? '💔 ප්‍රියතමයෙන් ඉවත් කරන ලදී' : '💔 Removed from favorites') : (currentLang === 'si' ? '❤️ ප්‍රියතමයට එක් කරන ලදී' : '❤️ Added to favorites'));
}

function bnActive(btn) {
  document.querySelectorAll('.bn-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const href = btn.dataset.href;
  if (href) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

// ═══ MODAL ═══
let modalMapInstance;
let modalMarker;

function openAddModal() {
  document.getElementById('addModal').classList.add('open');
  
  // Initialize modal map if not already initialized
  setTimeout(() => {
    if (!modalMapInstance) {
      modalMapInstance = L.map('modalMap').setView([6.9271, 79.8612], 12); // Default to Colombo
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(modalMapInstance);
      
      modalMapInstance.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        
        document.getElementById('modalLat').value = lat;
        document.getElementById('modalLng').value = lng;
        
        if (modalMarker) {
          modalMarker.setLatLng(e.latlng);
        } else {
          modalMarker = L.marker(e.latlng).addTo(modalMapInstance);
        }
      });
    } else {
      modalMapInstance.invalidateSize(); // Fixes leaflet map loading issue inside hidden divs
    }
  }, 200);
}
function closeAddModal() {
  document.getElementById('addModal').classList.remove('open');
}
function closeModal(e) {
  if (e.target === document.getElementById('addModal')) closeAddModal();
}

async function submitDansal(e) {
  e.preventDefault();
  
  const form = e.target;
  const name = form.querySelector('input[placeholder*="Maha Dansal"]').value;
  const loc = form.querySelector('input[placeholder*="Colombo"]').value;
  const type = form.querySelector('select').value;
  const specials = form.querySelector('input[placeholder*="කිරිබත්"]').value;
  
  const date = document.getElementById('dansalDate').value;
  const startTime = document.getElementById('dansalStartTime').value;
  const endTime = document.getElementById('dansalEndTime').value;

  const latStr = document.getElementById('modalLat').value;
  const lngStr = document.getElementById('modalLng').value;

  if (!latStr || !lngStr) {
    showToast(currentLang === 'si' ? '❌ කරුණාකර සිතියමේ ස්ථානය තෝරන්න' : '❌ Please pin the location on the map');
    return;
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  const data = { name, loc, type, specials, date, startTime, endTime, lat, lng };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if(res.ok) {
      const newDansal = await res.json();
      dansalData.unshift(newDansal);
      renderMapPins();
      renderSidebarCards();
      renderDansalGrid();
      
      closeAddModal();
      form.reset();
      document.getElementById('modalLat').value = '';
      document.getElementById('modalLng').value = '';
      if(modalMarker) modalMapInstance.removeLayer(modalMarker);
      modalMarker = null;
      
      showToast(currentLang === 'si' ? '✅ ඔබේ දන්සල සාර්ථකව එකතු කරන ලදී!' : '✅ Your dansal has been submitted!');
      
      // Pan map to new entry
      panToMap(lat, lng, name);
    } else {
      showToast(currentLang === 'si' ? '❌ දෝෂයකි, නැවත උත්සාහ කරන්න.' : '❌ Error, please try again.');
    }
  } catch(err) {
    console.error(err);
    showToast('❌ Backend not reachable!');
  }
}

// ═══ TOAST ═══
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
