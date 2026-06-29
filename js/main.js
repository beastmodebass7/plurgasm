/* ════════════════════════════════════════════════
   NEAR ME — location filter
════════════════════════════════════════════════ */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

let _userLat = null;
let _userLng = null;
let _nearMeActive = false;
let _maxMiles = 100;

function toggleNearMe() {
  const btn      = document.getElementById('near-me-btn');
  const controls = document.getElementById('near-me-controls');
  const status   = document.getElementById('near-me-status');

  if (_nearMeActive) {
    _nearMeActive = false;
    _userLat = null;
    _userLng = null;
    btn.classList.remove('active');
    controls.style.display = 'none';
    refreshFestView();
    return;
  }

  controls.style.display = 'block';
  btn.classList.add('active');
  status.textContent = 'Getting your location...';

  if (!navigator.geolocation) {
    status.textContent = 'Location not supported by your browser.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      _userLat = pos.coords.latitude;
      _userLng = pos.coords.longitude;
      _nearMeActive = true;
      status.textContent = `📍 Location found — showing within ${_maxMiles} miles`;
      refreshFestView();
    },
    () => {
      status.textContent = 'Location access denied. Enable location in your browser settings.';
      btn.classList.remove('active');
      controls.style.display = 'none';
    },
    { timeout: 10000 }
  );
}

function setDistance(miles, btn) {
  _maxMiles = miles;
  document.querySelectorAll('.dist-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const status = document.getElementById('near-me-status');
  if (status && _userLat) {
    status.textContent = miles === 9999
      ? '📍 Showing all festivals'
      : `📍 Showing within ${miles} miles`;
  }
  refreshFestView();
}

/* ════════════════════════════════════════════════
   GOOGLE CALENDAR HELPER
════════════════════════════════════════════════ */
function googleCalUrl(f) {
  try {
    const start = f.sortDate.replace(/-/g, '');
    const end = new Date(f.endDate + 'T00:00:00Z');
    end.setUTCDate(end.getUTCDate() + 1);
    const endStr = end.toISOString().slice(0,10).replace(/-/g,'');
    const text = encodeURIComponent(f.name);
    const loc = encodeURIComponent(f.location || '');
    const lineup = (f.headliners && f.headliners.length) ? 'Lineup: ' + f.headliners.join(', ') + '\n\n' : '';
    const details = encodeURIComponent(lineup + (f.desc || '') + (f.url ? '\n\nTickets: ' + f.url : ''));
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + text +
           '&dates=' + start + '/' + endStr + '&details=' + details + '&location=' + loc;
  } catch (e) { return null; }
}

/* ════════════════════════════════════════════════
   FESTIVAL FILTER STATE
════════════════════════════════════════════════ */
let _festType   = 'all';
let _festGenre  = '';
let _festRegion = '';
let _festMonth  = '';
let _festView   = 'grid';
let _festLimit  = 6;

const typeClass = { mega:'t-mega', underground:'t-under', regional:'t-reg', playa:'t-playa', international:'t-intl' };
const dotClass  = { mega:'dot-mega', underground:'dot-under', regional:'dot-reg', playa:'dot-playa', international:'dot-intl' };

function getFilteredFests() {
  return FESTIVALS.filter(f => {
    const typeOk   = _festType   === 'all' || f.type === _festType;
    const genreOk  = _festGenre  === ''    || f.genres.includes(_festGenre);
    const regionOk = _festRegion === ''    || f.region === _festRegion;
    const monthOk  = _festMonth  === ''    || (f.sortDate && new Date(f.sortDate).getMonth() + 1 === _festMonth);

    let nearOk = true;
    if (_nearMeActive && _userLat && f.lat && f.lng) {
      const dist = haversineDistance(_userLat, _userLng, f.lat, f.lng);
      nearOk = dist <= _maxMiles;
      f._distanceMiles = Math.round(dist);
    } else {
      f._distanceMiles = null;
    }

    return typeOk && genreOk && regionOk && monthOk && nearOk;
  }).sort((a, b) => {
    if (_nearMeActive && a._distanceMiles !== null && b._distanceMiles !== null) {
      return a._distanceMiles - b._distanceMiles;
    }
    return new Date(a.sortDate) - new Date(b.sortDate);
  });
}

/* ════════════════════════════════════════════════
   DAYS AWAY BADGE
════════════════════════════════════════════════ */
function getDaysBadge(sortDate) {
  if (!sortDate) return '';
  const today = new Date();
  today.setHours(0,0,0,0);
  const fest  = new Date(sortDate);
  fest.setHours(0,0,0,0);
  const diff  = Math.round((fest - today) / 86400000);

  if (diff < 0)   return `<span class="fest-days-badge days-past">Past</span>`;
  if (diff === 0) return `<span class="fest-days-badge days-soon">Today</span>`;
  if (diff <= 14) return `<span class="fest-days-badge days-soon">${diff} days away</span>`;
  if (diff <= 60) return `<span class="fest-days-badge days-upcoming">${diff} days away</span>`;
  return `<span class="fest-days-badge days-far">${diff} days</span>`;
}

/* ════════════════════════════════════════════════
   FESTIVAL DETAIL HREF — extensionless internal URL
════════════════════════════════════════════════ */
function festDetailHref(f) {
  if (!f.detailPage) return f.url;
  return '/' + f.detailPage.replace(/^\/+/, '').replace(/\.html$/, '');
}

/* ════════════════════════════════════════════════
   FESTIVAL CARD PLACEHOLDER PALETTE
   Cards without a real `image` get a neon gradient cover. Prefer the
   festival's own accent (cardTheme.accent) so themed festivals stay on-brand;
   otherwise cycle through the site palette so a grid of placeholders still
   reads as varied and intentional rather than broken.
════════════════════════════════════════════════ */
const FEST_PH_PALETTE = ['fest-ph-cyan','fest-ph-pink','fest-ph-purple','fest-ph-green','fest-ph-amber'];
const FEST_PH_ACCENT  = {
  '#00e5ff':'fest-ph-cyan', '#ff2d78':'fest-ph-pink', '#b64dff':'fest-ph-purple',
  '#3dff85':'fest-ph-green', '#ffb800':'fest-ph-amber'
};
function festPlaceholderClass(f, i) {
  const accent = f.cardTheme && f.cardTheme.accent ? f.cardTheme.accent.toLowerCase() : null;
  if (accent && FEST_PH_ACCENT[accent]) return FEST_PH_ACCENT[accent];
  return FEST_PH_PALETTE[i % FEST_PH_PALETTE.length];
}

/* ════════════════════════════════════════════════
   RENDER — GRID VIEW
   Image-first cards: a festival photo (or neon placeholder) fills the top of
   the card; the info band (date · name · location · age) reveals on hover on
   desktop and is always visible on touch/mobile (see .fest-card-info CSS). The
   bottom action bar (genres · Google Calendar · save heart) is always visible.
════════════════════════════════════════════════ */
function renderFestivals() {
  try {
    const grid = document.getElementById('fest-grid');
    if (!grid) return;
    const today = new Date();
    today.setHours(0,0,0,0);
    const fullList = getFilteredFests().slice().sort((a, b) => {
      const aDate = new Date(a.sortDate || '2099-01-01');
      const bDate = new Date(b.sortDate || '2099-01-01');
      const aPast = aDate < today;
      const bPast = bDate < today;
      if (aPast && !bPast) return 1;
      if (!aPast && bPast) return -1;
      if (!aPast && !bPast) {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      return aDate - bDate;
    });
    const expandEl = document.getElementById('fests-expand');
    if (expandEl) expandEl.style.display = fullList.length > _festLimit ? '' : 'none';
    const list = fullList.slice(0, _festLimit);
    grid.innerHTML = list.map((f, i) => {
      const dest   = festDetailHref(f);
      const target = f.detailPage ? '_self' : '_blank';
      const hasImg = !!f.image;
      const cover  = hasImg
        ? `<img class="fest-card-img-photo" src="${f.image}" alt="${f.name}" loading="lazy">`
        : `<span class="fest-card-ph-name">${f.name}</span>`;
      const cal = googleCalUrl(f);
      return `
    <div class="fest-card ${f.featured ? 'fest-featured' : ''}" data-id="${f.id}" onclick="window.open('${dest}','${target}')">
      <div class="fest-card-img ${hasImg ? 'has-photo' : festPlaceholderClass(f, i)}">
        ${cover}
        ${getDaysBadge(f.sortDate)}
        <span class="fest-tag ${typeClass[f.type] || 't-reg'}">${f.typeLabel}</span>
        ${f._distanceMiles != null ? `<span class="fest-distance-badge">📍 ${f._distanceMiles} mi away</span>` : ''}
        <div class="fest-card-info">
          <span class="fci-date">${f.dates}</span>
          <span class="fci-name">${f.name}</span>
          <span class="fci-loc">📍 ${f.location}</span>
          <span class="fci-meta">${f.age} &nbsp;·&nbsp; ${f.days} Day${f.days>1?'s':''}</span>
        </div>
      </div>
      <div class="fest-card-actions">
        <div class="vibes">${f.genres.slice(0,3).map(g=>`<span class="vibe">${g}</span>`).join('')}</div>
        <div class="fest-card-actions-btns">
          ${cal ? `<a class="add-cal" href="${cal}" target="_blank" rel="noopener" onclick="event.stopPropagation()">+ Google Calendar</a>` : ''}
          ${window.PlurSaves ? PlurSaves.buttonHtml(f.id) : ''}
        </div>
      </div>
    </div>
  `; }).join('') || `<p style="color:var(--muted);grid-column:1/-1;font-size:15px;padding:32px 0;">No festivals match this filter combo.</p>`;
    applyMobileFestLimit();
  } catch (e) {
    console.error('[main.js] renderFestivals', e);
  }
}

function applyMobileFestLimit() {
  if (window.innerWidth > 900) return;
  const grid = document.getElementById('fest-grid');
  if (!grid) return;
  const cards = [...grid.children];
  const SHOW = 3;
  if (cards.length <= SHOW) return;

  cards.forEach((card, i) => {
    if (i >= SHOW) card.style.display = 'none';
  });

  const existing = document.getElementById('fest-more-btn');
  if (existing) existing.remove();

  const btn = document.createElement('button');
  btn.id = 'fest-more-btn';
  btn.className = 'mobile-more-btn';
  btn.textContent = `+ ${cards.length - SHOW} More Festivals`;
  btn.onclick = () => {
    cards.forEach(c => c.style.display = '');
    btn.remove();
    applyMobileFestLimit.expanded = true;
  };
  grid.parentElement.appendChild(btn);
}

/* ════════════════════════════════════════════════
   RENDER — CALENDAR VIEW
════════════════════════════════════════════════ */
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function renderCalendar() {
  const expandEl = document.getElementById('fests-expand');
  if (expandEl) expandEl.style.display = 'none';
  const list = getFilteredFests();
  const byMonth = {};
  list.forEach(f => {
    const key = f.sortDate ? f.sortDate.slice(0,7) : '2026-12';
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(f);
  });

  const sortedMonths = Object.keys(byMonth).sort();
  if (sortedMonths.length === 0) {
    document.getElementById('cal-view').innerHTML = `<p style="color:var(--muted);font-size:15px;padding:32px 0;">No festivals match this filter combo.</p>`;
    return;
  }

  document.getElementById('cal-view').innerHTML = sortedMonths.map(monthKey => {
    const [year, mo] = monthKey.split('-');
    const monthName = MONTH_NAMES[parseInt(mo) - 1];
    const fests = byMonth[monthKey];
    return `
      <div class="cal-month">
        <div class="cal-month-label">${year} <span>${monthName.toUpperCase()}</span></div>
        ${fests.map(f => {
          const dayNum = f.sortDate ? parseInt(f.sortDate.split('-')[2]) : '?';
          const endNum = f.endDate  ? parseInt(f.endDate.split('-')[2])  : '';
          // Multi-day → "17 – 26" as one unit; single-day → just "17" (no dash).
          const dayRange = (endNum && endNum !== dayNum) ? `${dayNum} – ${endNum}` : `${dayNum}`;
          return `
            <div class="cal-row" onclick="window.open('${f.url}','_blank')">
              <div class="cal-date-col">
                <span class="cal-date-month">${monthName.slice(0,3).toUpperCase()}</span>
                <span class="cal-date-day">${dayRange}</span>
              </div>
              <div class="cal-info-col">
                <div class="cal-type-dot ${dotClass[f.type] || 'dot-reg'}"></div>
                <span class="cal-name">${f.name}</span>
                <span class="cal-loc">📍 ${f.location} &nbsp;·&nbsp; ${f.age}</span>
                <div class="cal-genres">${f.genres.slice(0,3).map(g=>`<span class="cal-genre">${g}</span>`).join('')}</div>
                ${(() => { const cal = googleCalUrl(f); return cal ? `<a class="add-cal" href="${cal}" target="_blank" rel="noopener" onclick="event.stopPropagation()">+ Google Calendar</a>` : ''; })()}
                ${window.PlurSaves ? PlurSaves.buttonHtml(f.id) : ''}
                <span class="cal-arrow">→</span>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }).join('');
}

/* ════════════════════════════════════════════════
   FILTER PILLS — built from the shared festival taxonomy
   so the homepage and the calendar page never diverge. Rebuilds the vibe
   and region rows from PLURGASM_DATA; the hardcoded pills in index.html
   act as a static fallback if this never runs.
════════════════════════════════════════════════ */
// Populate the homepage Vibe + Region <select> dropdowns from the festival data
// (same source/shape the calendar's dropdowns use, so the two pages stay in
// sync). Wrapped in try/catch so a data hiccup can't break other homepage
// renders. Month options are static in the HTML (1-12).
function renderFestFilterPills() {
  try {
    const D = window.PLURGASM_DATA;
    if (!D) return;

    const vibeSel = document.getElementById('fest-vibe-select');
    if (vibeSel && typeof D.getFestivalGenres === 'function') {
      vibeSel.innerHTML =
        `<option value="">All vibes</option>` +
        D.getFestivalGenres().map(g =>
          `<option value="${g.value}">${g.label}</option>`
        ).join('');
    }

    const regionSel = document.getElementById('fest-region-select');
    if (regionSel && typeof D.getFestivalRegions === 'function') {
      regionSel.innerHTML =
        `<option value="">All regions</option>` +
        D.getFestivalRegions().map(r =>
          `<option value="${r.id}">${r.label}</option>`
        ).join('');
    }
  } catch (e) {
    console.error('renderFestFilterPills error:', e);
  }
}

/* ════════════════════════════════════════════════
   FILTER ACTIONS
════════════════════════════════════════════════ */
function filterFests(type, btn) {
  _festType   = type;
  _festRegion = '';
  _festMonth  = '';
  _festLimit  = 6;
  document.querySelectorAll('#festivals .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Reset the region/month dropdowns to "All" so they reflect the cleared state.
  const regionSel = document.getElementById('fest-region-select'); if (regionSel) regionSel.value = '';
  const monthSel  = document.getElementById('fest-month-select');  if (monthSel)  monthSel.value  = '';
  refreshFestView();
}

// The filter setters below now read straight off the native <select> value. The
// state variables and getFilteredFests() logic are unchanged — only the input
// control swapped from clickable pills to dropdowns (matches calendar.html).
function filterGenre(genre) {
  _festGenre = genre;
  _festLimit = 6;
  refreshFestView();
}

function filterRegion(region) {
  _festRegion = region;
  _festLimit  = 6;
  refreshFestView();
}

function filterMonth(month) {
  // '' = all months; otherwise coerce the select's string value back to the
  // number 1-12 that getFilteredFests() compares against (strict ===).
  _festMonth = (month === '' || month == null) ? '' : parseInt(month, 10);
  _festLimit = 6;
  refreshFestView();
}

function expandFests() {
  _festLimit = 999;
  renderFestivals();
  document.getElementById('fests-expand').style.display = 'none';
}

function setView(view) {
  _festView = view;
  document.getElementById('btn-grid').classList.toggle('active', view === 'grid');
  document.getElementById('btn-cal').classList.toggle('active',  view === 'cal');
  document.getElementById('fest-grid').style.display = view === 'grid' ? '' : 'none';
  document.getElementById('cal-view').style.display  = view === 'cal'  ? 'block' : 'none';
  refreshFestView();
}

function refreshFestView() {
  if (_festView === 'grid') renderFestivals();
  else renderCalendar();
}

/* ════════════════════════════════════════════════
   RENDER CATEGORIES
════════════════════════════════════════════════ */
function renderCategories() {
  try {
    const container = document.getElementById('cat-grid');
    if (!container) return;
    // Only show categories that actually have at least one brand. Empty
    // ("Coming Soon") categories stay in data.js but aren't rendered here;
    // their /category?cat= links still work directly.
    const populated = CATEGORIES.filter(c => BRANDS.some(b => b.cat === c.id));
    container.innerHTML = populated.map(c => {
      const count = BRANDS.filter(b => b.cat === c.id).length;
      const isImg = /\.(png|jpe?g|gif|webp|svg)$/i.test(c.icon);
      const iconHtml = isImg
        ? `<img class="cat-icon-img" src="${c.icon}" alt="${c.label}" width="64" height="64">`
        : `<span class="cat-icon">${c.icon}</span>`;
      return `
      <a class="cat-card" href="/category?cat=${c.id}" style="text-decoration:none;">
        ${iconHtml}
        <span class="cat-name">${c.label.toUpperCase()}</span>
        <span class="cat-count">${count} Brand${count === 1 ? '' : 's'}</span>
      </a>
    `;}).join('');
    applyMobileCategoryLimit();
  } catch (e) {
    console.error('renderCategories error:', e);
  }
}

function applyMobileCategoryLimit() {
  if (window.innerWidth > 900) return;
  const grid = document.getElementById('cat-grid');
  if (!grid) return;
  const cards = [...grid.children];
  const SHOW = 6;
  if (cards.length <= SHOW) return;

  cards.forEach((card, i) => {
    if (i >= SHOW) card.style.display = 'none';
  });

  const existing = document.getElementById('cat-more-btn');
  if (existing) existing.remove();

  const btn = document.createElement('button');
  btn.id = 'cat-more-btn';
  btn.className = 'mobile-more-btn';
  btn.textContent = `+ ${cards.length - SHOW} More Categories`;
  btn.onclick = () => {
    cards.forEach(c => c.style.display = '');
    btn.remove();
  };
  grid.parentElement.appendChild(btn);
}

/* ════════════════════════════════════════════════
   ITEM FILTERS
════════════════════════════════════════════════ */
let _activeItemTag = '';

function renderItemFilters() {
  const container = document.getElementById('item-filters');
  if (!container) return;
  if (!window.PLURGASM_DATA) return; // safety guard
  const groups = PLURGASM_DATA.itemFilters || [];

  // Compact accordion: a wrapping row of group-header chips, plus one
  // collapsed-by-default pills panel per group. Clicking a header opens its
  // panel and closes any other (single-open accordion) — same on mobile/desktop.
  container.innerHTML = `
    <div class="item-filter-headers">
      ${groups.map((g, i) => `
        <button class="item-group-header" data-group="${i}"
          onclick="toggleItemGroup(${i})">
          <span class="item-group-label">${g.group}</span>
          <span class="item-group-chevron" aria-hidden="true">&#x25BE;</span>
        </button>
      `).join('')}
    </div>
    ${groups.map((g, i) => `
      <div class="item-group-panel" data-group="${i}">
        <div class="item-filter-pills">
          ${g.items.map(item => `
            <button class="item-pill"
              data-tag="${item.tag}"
              onclick="filterByItem('${item.tag}', this)">
              ${item.label}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('')}
  `;
}

function filterByItem(tag, btn) {
  if (_activeItemTag === tag) {
    _activeItemTag = '';
    document.querySelectorAll('.item-pill')
      .forEach(b => b.classList.remove('active'));
    searchQuery = '';
    document.getElementById('item-clear-btn').style.display = 'none';
    renderBrands(window._currentCat || 'all');
    return;
  }

  _activeItemTag = tag;
  searchQuery = tag;

  document.querySelectorAll('.item-pill')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.getElementById('item-clear-btn').style.display = 'block';

  window._currentCat = 'all';
  document.querySelectorAll('.filter-btn[data-cat]')
    .forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-cat="all"]')
    ?.classList.add('active');

  renderBrands('all');

  document.getElementById('brands')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ════════════════════════════════════════════════
   RENDER BRANDS
════════════════════════════════════════════════ */
let searchQuery = '';
let _brandLimit = 6;

function renderBrands(cat) {
  const grid = document.getElementById('brand-grid');
  if (!grid) return;
  try {
  let list = cat === 'all' ? BRANDS : BRANDS.filter(b => b.cat === cat);
  if (searchQuery) list = list.filter(b => {
    const text = [b.name, b.cat, b.style, b.loc, b.desc, b.ig, ...(b.tags||[])].join(' ').toLowerCase();
    const matchesText = text.includes(searchQuery.toLowerCase());
    const matchesTags = (b.tags||[]).some(t =>
      t.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery.toLowerCase().includes(t.toLowerCase())
    );
    return matchesText || matchesTags;
  });
  list = list.slice().sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const so = (a.sortOrder || 0) - (b.sortOrder || 0);
    if (so !== 0) return so;
    return a.name.localeCompare(b.name);
  });
  const expandEl = document.getElementById('brands-expand');
  if (expandEl) expandEl.style.display = list.length > _brandLimit ? '' : 'none';
  const visible = list.slice(0, _brandLimit);
  grid.innerHTML = visible.map(b => {
    const catLabel = (CATEGORIES.find(c => c.id === b.cat) || {}).label || b.cat;
    const badgeHTML = b.logo
      ? `<img src="${b.logo}" alt="${b.name}" style="width:100%;height:100%;object-fit:contain;padding:4px;" onerror="this.style.display='none';this.parentElement.innerHTML='${b.badge}';">`
      : b.badge;
    return `
    <div class="brand-card${b.featured ? ' brand-card-featured' : ''}" onclick="openBrandModal('${b.id}')">
      ${b.featured ? '<span class="brand-featured-star">★</span>' : ''}
      <div class="brand-card-head">
        <div class="brand-badge ${b.logo ? '' : b.badgeCls}">${badgeHTML}</div>
        <p class="brand-name">${b.name}</p>
      </div>
      <div class="brand-meta">
        <span class="brand-price ${b.priceCls}">${b.price}</span>
        <span class="brand-ship">⏱ ${b.ship}</span>
        <span class="brand-loc">📍 ${b.loc}</span>
      </div>
      <p class="brand-cat-label">${catLabel}</p>
      <p class="brand-desc">${b.desc}</p>
      ${b.ig ? `<a class="brand-ig-btn" href="https://instagram.com/${b.ig.replace('@','')}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${b.ig}</a>` : ''}
    </div>
  `; }).join('') || `<p style="color:var(--muted);grid-column:1/-1;font-size:15px;padding:24px 0;">No brands found${searchQuery ? ' for "'+searchQuery+'"':''} in this category.</p>`;
  applyMobileBrandLimit();
  } catch (err) {
    console.error('renderBrands failed:', err);
    grid.innerHTML = `<p style="color:var(--muted);grid-column:1/-1;font-size:15px;padding:24px 0;">Brands are temporarily unavailable.</p>`;
  }
}

function applyMobileBrandLimit() {
  if (window.innerWidth > 900) return;
  const grid = document.getElementById('brand-grid');
  if (!grid) return;
  const cards = [...grid.children];
  const SHOW = 4;
  if (cards.length <= SHOW) return;

  cards.forEach((card, i) => {
    if (i >= SHOW) card.style.display = 'none';
  });

  const existing = document.getElementById('brand-more-btn');
  if (existing) existing.remove();

  const btn = document.createElement('button');
  btn.id = 'brand-more-btn';
  btn.className = 'mobile-more-btn';
  btn.textContent = `+ ${cards.length - SHOW} More Brands`;
  btn.onclick = () => {
    cards.forEach(c => c.style.display = '');
    btn.remove();
  };
  grid.parentElement.appendChild(btn);
}

function expandBrands() {
  _brandLimit = 999;
  renderBrands(window._currentCat || 'all');
  document.getElementById('brands-expand').style.display = 'none';
}

/* ════════════════════════════════════════════════
   BRAND DETAIL MODAL
════════════════════════════════════════════════ */
function priceChipClass(p) {
  if (!p) return 'chip-neutral';
  if (p.startsWith('$$$$') || p.startsWith('$$$–')) return 'chip-priceLux';
  if (p.startsWith('$$$') || p.startsWith('$$–$$$')) return 'chip-priceHi';
  if (p.startsWith('$$')  || p.startsWith('$–$$'))  return 'chip-priceMid';
  if (p === '$') return 'chip-price';
  return 'chip-neutral';
}

function openBrandModal(id) {
  const b = BRANDS.find(x => x.id === id);
  if (!b) return;

  const igHandle  = b.ig ? b.ig.replace(/^@/,'') : null;
  const hasUrl    = b.url && b.url !== '#';
  const catLabel  = (CATEGORIES.find(c => c.id === b.cat) || {}).label || b.cat;

  const modalBadgeHTML = b.logo
    ? `<img src="${b.logo}" alt="${b.name}" style="width:100%;height:100%;object-fit:contain;padding:4px;" onerror="this.style.display='none';this.parentElement.innerHTML='${b.badge}';">`
    : b.badge;
  document.getElementById('brand-modal-content').innerHTML = `
    <div class="bm-header">
      <div class="bm-badge ${b.logo ? '' : b.badgeCls}">${modalBadgeHTML}</div>
      <div class="bm-title-group">
        <p class="bm-name">${b.name}</p>
        <p class="bm-cat">${catLabel} &nbsp;·&nbsp; ${b.loc}</p>
      </div>
    </div>

    <div class="bm-chips">
      <span class="bm-chip ${priceChipClass(b.price)}">
        <span class="bm-chip-icon">💰</span>${b.price || 'Price varies'}
      </span>
      ${b.ship ? `<span class="bm-chip chip-neutral"><span class="bm-chip-icon">⏱</span>${b.ship}</span>` : ''}
      ${b.loc  ? `<span class="bm-chip chip-neutral"><span class="bm-chip-icon">📍</span>${b.loc}</span>` : ''}
      ${b.ig   ? `<span class="bm-chip chip-neutral"><span class="bm-chip-icon">📱</span>${b.ig}</span>` : ''}
    </div>

    <div class="bm-body">
      <div>
        <p class="bm-section-label">About</p>
        <p class="bm-desc">${b.desc}</p>
      </div>
      <div>
        <p class="bm-section-label">What They Sell</p>
        <p class="bm-style-text">${b.style}</p>
      </div>
      ${b.note ? `
      <div>
        <p class="bm-section-label">Community Notes</p>
        <div class="bm-note">${b.note}</div>
      </div>` : ''}
      ${b.tags && b.tags.length ? `
      <div>
        <p class="bm-section-label">Tags</p>
        <div class="bm-tags">${b.tags.map(t => `<span class="bm-tag">${t}</span>`).join('')}</div>
      </div>` : ''}
    </div>

    <div class="bm-links">
      ${hasUrl
        ? `<a href="${b.url}" target="_blank" rel="noopener" class="bm-link-btn bm-link-primary">Visit Website →</a>`
        : `<span class="bm-link-btn bm-link-ghost" style="cursor:default;opacity:0.5;">No website listed</span>`}
      ${igHandle
        ? `<a href="https://instagram.com/${igHandle}" target="_blank" rel="noopener" class="brand-ig-btn">@${igHandle}</a>`
        : ''}
      <button onclick="shareBrand('${b.name}', '${b.url}')" class="share-btn">Share</button>
      <button onclick="closeBrandModal()" class="bm-link-btn bm-link-ghost" style="margin-left:auto;">Close</button>
    </div>
  `;

  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  document.getElementById('brand-modal').classList.add('open');
}

function shareBrand(name, url) {
  const shareUrl = url && url !== '#' ? url : window.location.href;
  if (navigator.share) {
    navigator.share({
      title: name + ' — PLURGASM',
      text: 'Check out ' + name + ' on the PLURGASM rave brand directory',
      url: shareUrl
    });
  } else {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied!');
  }
}

function closeBrandModal() {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  document.getElementById('brand-modal').classList.remove('open');
}

// close on overlay click
document.addEventListener('click', e => {
  const overlay = document.getElementById('brand-modal');
  if (e.target === overlay) closeBrandModal();
});

function filterBrands(cat, btn) {
  _brandLimit = 6;
  document.querySelectorAll('#brand-filters .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  // clear item pill state when category filter changes
  _activeItemTag = '';
  searchQuery = '';
  document.querySelectorAll('.item-pill').forEach(b => b.classList.remove('active'));
  const clearBtn = document.getElementById('item-clear-btn');
  if (clearBtn) clearBtn.style.display = 'none';
  renderBrands(cat);
  applyMobileBrandLimit();
  window._currentCat = cat;
}

// add data-cat to filter buttons after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#brand-filters .filter-btn').forEach(btn => {
    const txt = btn.textContent.trim().toLowerCase().replace(/\s+/g,'-');
    const map = {'all':'all','fem-clothing':'fem-clothing','male-clothing':'male-clothing','shoes':'shoes','accessories':'accessories','kandi':'kandi','events':'events'};
    btn.dataset.cat = map[txt] || txt;
  });
});
window._currentCat = 'all';

/* ════════════════════════════════════════════════
   CREATOR DIRECTORY
════════════════════════════════════════════════ */
let _creatorPlatform = 'all';
let _creatorSearch   = '';

/* Voting state. _voteCounts maps a creator's unique handle -> upvote count.
   _userVotes is the set of handles the logged-in user has already upvoted.
   Both are populated by loadCreatorVotes() and read during render/sort. */
let _voteCounts = {};
let _userVotes  = new Set();

/* Each creator's unique vote id = its handle (e.g. "@beastmodebass"). */
function creatorVoteId(s) { return s.handle; }

/* Fetch vote counts + the current user's votes from Supabase, then re-render.
   Everything is wrapped so a Supabase hiccup never blanks the directory — if
   counts fail to load we simply render without vote-based ordering. */
async function loadCreatorVotes() {
  const sb = window.sb;
  if (!sb) { return; }
  try {
    const { data, error } = await sb.rpc('get_vote_counts');
    if (error) throw error;
    const counts = {};
    (data || []).forEach(row => {
      if (row.target_type !== 'creator') return;
      const n = row.count ?? row.vote_count ?? row.votes ?? 0;
      counts[row.target_id] = Number(n) || 0;
    });
    _voteCounts = counts;

    // If signed in, fetch this user's own creator votes (RLS scopes to them).
    const { data: sessionData } = await sb.auth.getSession();
    const session = sessionData ? sessionData.session : null;
    if (session && session.user) {
      const { data: mine, error: mineErr } = await sb
        .from('votes')
        .select('target_id')
        .eq('target_type', 'creator');
      if (mineErr) throw mineErr;
      _userVotes = new Set((mine || []).map(r => r.target_id));
    } else {
      _userVotes = new Set();
    }
  } catch (e) {
    console.error('loadCreatorVotes error:', e);
  }
  // Re-render with whatever we managed to load (possibly nothing).
  renderCreatorDirectory();
}

/* Upvote button handler. The card itself is a link, so we stop the click from
   navigating. Logged out -> trigger Google sign-in. Logged in -> toggle the
   vote and update the count live (no re-sort, to avoid card jumpiness). */
async function onCreatorVote(e, id) {
  e.preventDefault();
  e.stopPropagation();
  const sb = window.sb;
  if (!sb) return;
  const btn = e.currentTarget;
  try {
    const { data: sessionData } = await sb.auth.getSession();
    const session = sessionData ? sessionData.session : null;
    if (!session || !session.user) {
      // Signed out: prompt sign-in to vote (same OAuth flow as auth.js).
      sb.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.href }
      });
      return;
    }

    const countEl = btn.querySelector('.cc-vote-count');
    let upvoted;
    if (_userVotes.has(id)) {
      const { error } = await sb.from('votes').delete()
        .eq('user_id', session.user.id)
        .eq('target_type', 'creator')
        .eq('target_id', id);
      if (error) throw error;
      _userVotes.delete(id);
      _voteCounts[id] = Math.max(0, (_voteCounts[id] || 1) - 1);
      btn.classList.remove('active');
      upvoted = false;
    } else {
      const { error } = await sb.from('votes').insert({
        user_id: session.user.id,
        target_type: 'creator',
        target_id: id
      });
      if (error) throw error;
      _userVotes.add(id);
      _voteCounts[id] = (_voteCounts[id] || 0) + 1;
      btn.classList.add('active');
      upvoted = true;
    }
    if (countEl) countEl.textContent = _voteCounts[id];
    // Celebrate a fresh upvote; un-voting gets a subtle settle.
    if (upvoted) playUpvoteAnimation(btn);
    else playUnvoteAnimation(btn);
  } catch (e2) {
    console.error('onCreatorVote error:', e2);
  }
}

/* Whether the user has asked the OS/browser to minimize motion. */
function prefersReducedMotion() {
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

/* Snappy on-brand celebration when an upvote lands: the button pops with a
   neon glow, the icon bounces, the count bumps, and a few brand-colored
   sparks drift up and fade. The class is removed on animationend so the next
   vote can replay it. No-ops under prefers-reduced-motion. */
function playUpvoteAnimation(btn) {
  if (!btn || prefersReducedMotion()) return;
  btn.classList.remove('cc-vote-celebrate');
  void btn.offsetWidth; // force reflow so re-adding restarts the animation
  btn.classList.add('cc-vote-celebrate');
  function clear() {
    btn.classList.remove('cc-vote-celebrate');
    btn.removeEventListener('animationend', handler);
  }
  function handler(e) {
    // Only clear when the button's own (longest) glow animation finishes —
    // ignore the shorter icon/count/spark animations that also bubble here.
    if (e.target !== btn || e.animationName !== 'ccGlowPulse') return;
    clear();
  }
  btn.addEventListener('animationend', handler);
  // Fallback so the class always clears (and can replay) even if animationend
  // never fires — e.g. a backgrounded tab where animations don't run.
  setTimeout(clear, 700);
  emitVoteSparks(btn);
}

/* A handful of cyan/pink/purple dots that fan upward out of the button. */
function emitVoteSparks(btn) {
  const colors = ['#00e5ff', '#ff2d78', '#b64dff'];
  const n = 6;
  for (let i = 0; i < n; i++) {
    const spark = document.createElement('span');
    spark.className = 'cc-vote-spark';
    const color = colors[i % colors.length];
    spark.style.background = color;
    spark.style.boxShadow = '0 0 6px ' + color;
    const angle = (-90 + (i - (n - 1) / 2) * 17) * Math.PI / 180;
    const dist = 22 + (i % 3) * 8;
    spark.style.setProperty('--dx', (Math.cos(angle) * dist).toFixed(1) + 'px');
    spark.style.setProperty('--dy', (Math.sin(angle) * dist).toFixed(1) + 'px');
    spark.addEventListener('animationend', () => spark.remove());
    setTimeout(() => spark.remove(), 800); // fallback if animationend never fires
    btn.appendChild(spark);
  }
}

/* Understated quick shrink/fade when a vote is toggled back off. */
function playUnvoteAnimation(btn) {
  if (!btn || prefersReducedMotion()) return;
  btn.classList.remove('cc-vote-unvote');
  void btn.offsetWidth;
  btn.classList.add('cc-vote-unvote');
  setTimeout(() => btn.classList.remove('cc-vote-unvote'), 320);
}

function renderCreatorDirectory() {
  try {
    const container = document.getElementById('creator-grid');
    if (!container) return;

    let socials = (window.PLURGASM_DATA?.socials || []).slice();

    if (_creatorPlatform !== 'all') {
      socials = socials.filter(s => s.platform === _creatorPlatform);
    }

    if (_creatorSearch) {
      const q = _creatorSearch.toLowerCase();
      socials = socials.filter(s => {
        const text = [s.handle, s.name, s.type, ...(s.tags || [])].join(' ').toLowerCase();
        return text.includes(q);
      });
    }

    // Featured/sponsored creators pinned on top by featuredOrder; everyone
    // else ranked by upvote count (desc), tiebreak by name. Re-sort happens
    // here on load / filter change, never on each individual vote click.
    const featured = socials.filter(s => s.featured)
      .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
    const rest = socials.filter(s => !s.featured)
      .sort((a, b) => {
        const diff = (_voteCounts[creatorVoteId(b)] || 0) - (_voteCounts[creatorVoteId(a)] || 0);
        if (diff !== 0) return diff;
        return (a.name || a.handle).localeCompare(b.name || b.handle);
      });
    socials = featured.concat(rest);

    if (!socials.length) {
      container.innerHTML = '<p class="creator-empty">No creators match this filter.</p>';
      return;
    }

    const platformColors = {
      Instagram: '#ff2d78',
      TikTok:    '#00e5ff',
      YouTube:   '#ff2d78',
      Twitter:   '#00e5ff'
    };

    container.innerHTML = socials.map(s => {
      const handle  = (s.handle || '').replace('@', '');
      const color   = platformColors[s.platform] || 'var(--cyan)';
      const initials = handle.slice(0, 2).toUpperCase();
      const avatarUrl = s.image || ('https://unavatar.io/instagram/' + handle);
      const voteId = creatorVoteId(s);
      const count  = _voteCounts[voteId] || 0;
      const voted  = _userVotes.has(voteId);

      return `
        <a class="creator-card" href="${s.url || '#'}" target="_blank" rel="noopener">
          <div class="cc-avatar-wrap">
            <img src="${avatarUrl}" alt="${s.handle}" class="cc-avatar"
              onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <div class="cc-avatar-fallback" style="display:none;background:${color}22;color:${color};">${initials}</div>
          </div>
          <div class="cc-body">
            <div class="cc-top">
              <span class="cc-name">${s.name || s.handle}</span>
              <span class="cc-platform" style="color:${color}">${s.platform}</span>
              ${s.featured ? '<span class="cc-featured-badge">★ Featured</span>' : ''}
            </div>
            <span class="cc-handle" style="color:${color}">${s.handle}</span>
            <p class="cc-type">${s.type || ''}</p>
            <p class="cc-desc">${s.desc || ''}</p>
            ${s.tags && s.tags.length ? `<div class="cc-tags">${s.tags.slice(0,3).map(t=>`<span class="cc-tag">${t}</span>`).join('')}</div>` : ''}
          </div>
          <div class="cc-actions">
            <button type="button" class="cc-vote${voted ? ' active' : ''}"
              onclick="onCreatorVote(event, '${voteId}')"
              aria-label="Upvote ${(s.name || s.handle).replace(/'/g, '')}">
              <span class="cc-vote-icon">▲</span>
              <span class="cc-vote-count">${count}</span>
            </button>
            <span class="cc-arrow">→</span>
          </div>
        </a>`;
    }).join('');

    applyMobileCreatorLimit();
  } catch(e) {
    console.error('renderCreatorDirectory error:', e);
  }
}

function applyMobileCreatorLimit() {
  if (window.innerWidth > 900) return;
  const grid = document.getElementById('creator-grid');
  if (!grid) return;
  const cards = [...grid.children];
  const SHOW = 4;
  if (cards.length <= SHOW) return;

  cards.forEach((card, i) => { if (i >= SHOW) card.style.display = 'none'; });

  const existing = document.getElementById('creator-more-btn');
  if (existing) existing.remove();

  const btn = document.createElement('button');
  btn.id        = 'creator-more-btn';
  btn.className = 'mobile-more-btn';
  btn.textContent = `+ ${cards.length - SHOW} More Creators`;
  btn.onclick = () => { cards.forEach(c => c.style.display = ''); btn.remove(); };
  grid.parentElement.appendChild(btn);
}

/* ════════════════════════════════════════════════
   RENDER SOCIALS
════════════════════════════════════════════════ */
function renderSocials() {
  try {
  const container = document.getElementById('social-grid');
  if (!container) return;
  const limit = parseInt(container.dataset.limit || '999', 10);
  const socials = (window.PLURGASM_DATA?.socials || [])
    .filter(s => s.featured)
    .slice(0, limit);

  if (!socials.length) {
    container.innerHTML = '<p style="color:var(--faint);font-family:DM Mono,monospace;font-size:11px;letter-spacing:2px;">No featured accounts yet.</p>';
    return;
  }

  const platformColors = {
    Instagram: '#ff2d78',
    TikTok: '#00e5ff',
    YouTube: '#ff2d78',
    Twitter: '#00e5ff'
  };

  container.innerHTML = socials.map(s => {
    const handle = (s.handle || '').replace('@','');
    const color = platformColors[s.platform]
      || 'var(--cyan)';
    const initials = handle.slice(0,2).toUpperCase();
    const avatarUrl =
      'https://unavatar.io/instagram/' + handle;

    return `
      <a class="social-card"
        href="${s.url || '#'}"
        target="_blank"
        rel="noopener">
        <div class="sc-avatar-wrap">
          <img
            src="${avatarUrl}"
            alt="${s.handle}"
            class="sc-avatar"
            onerror="this.style.display='none';
              this.nextElementSibling
                .style.display='flex';"
          >
          <div class="sc-avatar-fallback"
            style="display:none;
              background:${color}22;
              color:${color};">
            ${initials}
          </div>
        </div>
        <div class="sc-body">
          <div class="sc-top">
            <span class="sc-handle"
              style="color:${color}">
              ${s.handle}
            </span>
            <span class="sc-platform">
              ${s.platform}
            </span>
          </div>
          <p class="sc-type">${s.type || ''}</p>
          ${s.desc ? `<p class="sc-desc">${s.desc}</p>` : ''}
        </div>
        <span class="sc-arrow">→</span>
      </a>`;
  }).join('');

  applyMobileSocialLimit();
  } catch(e) {
    console.error('renderSocials error:', e);
  }
}

function applyMobileSocialLimit() {
  if (window.innerWidth > 900) return;
  const grid = document.getElementById('social-grid');
  if (!grid) return;
  const cards = [...grid.children];
  const SHOW = 4;
  if (cards.length <= SHOW) return;

  cards.forEach((card, i) => {
    if (i >= SHOW) card.style.display = 'none';
  });

  const existing = document.getElementById('social-more-btn');
  if (existing) existing.remove();

  const btn = document.createElement('button');
  btn.id = 'social-more-btn';
  btn.className = 'mobile-more-btn';
  btn.textContent = `+ ${cards.length - SHOW} More`;
  btn.onclick = () => {
    cards.forEach(c => c.style.display = '');
    btn.remove();
  };
  grid.parentElement.appendChild(btn);
}

/* ════════════════════════════════════════════════
   COUNTDOWN — auto-selects next upcoming festival
════════════════════════════════════════════════ */
function getNextFestival() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = (window.PLURGASM_DATA?.festivals || [])
    .filter(f => {
      if (!f.sortDate) return false;
      const festDate = new Date(f.endDate || f.sortDate);
      festDate.setHours(23, 59, 59, 999);
      return festDate >= today;
    })
    .sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));

  return upcoming[0] || null;
}

function initCountdown() {
  const fest = getNextFestival();
  if (!fest) return;

  const nameEl  = document.getElementById('countdown-fest-name');
  const locEl   = document.getElementById('countdown-fest-loc');
  const dateEl  = document.getElementById('countdown-fest-date');
  const linkEl  = document.getElementById('countdown-fest-link');
  const timerEl = document.getElementById('countdown');

  if (nameEl) nameEl.textContent = fest.name;
  if (locEl)  locEl.textContent  = fest.location;
  if (dateEl) dateEl.textContent = fest.dates;
  if (linkEl && fest.url) {
    linkEl.href = festDetailHref(fest);
  }

  if (!timerEl) return;

  const target = new Date(fest.sortDate);
  target.setHours(0, 0, 0, 0);

  function tick() {
    const now  = new Date();
    const diff = target - now;

    if (diff <= 0) {
      timerEl.textContent = 'HAPPENING NOW';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    timerEl.innerHTML =
      `<span>${String(d).padStart(2,'0')}<sub>d</sub></span>` +
      `<span>${String(h).padStart(2,'0')}<sub>h</sub></span>` +
      `<span>${String(m).padStart(2,'0')}<sub>m</sub></span>` +
      `<span>${String(s).padStart(2,'0')}<sub>s</sub></span>`;

    setTimeout(tick, 1000);
  }

  tick();
}

/* ════════════════════════════════════════════════
   MARQUEE — upcoming festivals sorted by date
════════════════════════════════════════════════ */
function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sorted = (window.PLURGASM_DATA?.festivals || [])
    .filter(f => {
      if (!f.sortDate) return false;
      const festDate = new Date(f.endDate || f.sortDate);
      festDate.setHours(23, 59, 59, 999);
      return festDate >= today;
    })
    .sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));

  if (!sorted.length) return;

  // Double the list so the CSS marquee loop is seamless
  const items = [...sorted, ...sorted]
    .map(f => `<span class="marquee-item">${f.name.toUpperCase()} <span>${f.dates}</span></span>`)
    .join('');

  track.innerHTML = items;
}

/* ════════════════════════════════════════════════
   READ TIME — strip HTML, ~200 wpm, min 1 min
════════════════════════════════════════════════ */
function readTimeBadge(body) {
  try {
    const text  = (body || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(' ').length : 0;
    const mins  = Math.max(1, Math.ceil(words / 200));
    return `<span class="read-time-badge">⏱ ${mins} min read</span>`;
  } catch (e) {
    console.error('readTimeBadge error:', e);
    return '';
  }
}

/* ════════════════════════════════════════════════
   RENDER BLOG — newspaper layout
════════════════════════════════════════════════ */
function renderBlog() {
  const container = document.getElementById('blog-newspaper');
  if (!container) return;
  if (!window.PLURGASM_DATA) return; // safety guard
  const posts = (PLURGASM_DATA.blogPosts || [])
    .filter(p => p.published)
    .sort((a,b) => new Date(b.date) - new Date(a.date));

  if (!posts.length) return;

  const catColors = {
    'festival-news': 'var(--cyan)',
    'culture':       'var(--purple)',
    'fashion':       'var(--pink)',
    'safety':        'var(--green)',
    'gear':          'var(--amber)',
  };
  const catLabels = {
    'festival-news': 'Festival News',
    'culture':       'Culture',
    'fashion':       'Fashion',
    'safety':        'Safety',
    'gear':          'Gear',
  };

  function dateStr(d) {
    return new Date(d).toLocaleDateString('en-US',
      { month:'short', day:'numeric', year:'numeric' });
  }
  function color(p) { return catColors[p.category] || 'var(--cyan)'; }
  function label(p) { return catLabels[p.category] || p.category; }

  const featured = posts[0];
  const sidebar  = posts.slice(1, 5);

  container.innerHTML = `
    <div class="blog-newspaper-inner">

      <a class="blog-feat" href="/blog-post?id=${featured.id}">
        <div class="blog-feat-img">
          ${featured.coverImage
            ? `<img src="${featured.coverImage}" alt="${featured.title}">`
            : `<div class="blog-feat-placeholder"
                style="background:linear-gradient(135deg,${color(featured)}18,transparent);">
                <span style="font-family:'Bebas Neue',sans-serif;font-size:80px;
                  color:${color(featured)};opacity:0.15;">${featured.title[0]}</span>
               </div>`}
          <span class="blog-feat-cat"
            style="color:${color(featured)};border-color:${color(featured)}44;">
            ${label(featured)}
          </span>
        </div>
        <div class="blog-feat-body">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <p class="blog-feat-date">${dateStr(featured.date)}</p>
            ${readTimeBadge(featured.body)}
          </div>
          <h2 class="blog-feat-title">${featured.title}</h2>
          <p class="blog-feat-excerpt">${featured.excerpt}</p>
          <div class="blog-feat-author">
            By <span>${featured.author}</span>
            ${featured.authorHandle
              ? `<span class="blog-feat-handle">${featured.authorHandle}</span>`
              : ''}
          </div>
        </div>
      </a>

      <div class="blog-sidebar">
        ${sidebar.map((p, i) => `
          <a class="blog-thumb" href="/blog-post?id=${p.id}">
            <div class="blog-thumb-img">
              ${p.coverImage
                ? `<img src="${p.coverImage}" alt="${p.title}">`
                : `<div class="blog-thumb-placeholder"
                    style="background:linear-gradient(135deg,${color(p)}18,transparent);">
                    <span style="font-family:'Bebas Neue',sans-serif;font-size:28px;
                      color:${color(p)};opacity:0.2;">${p.title[0]}</span>
                   </div>`}
            </div>
            <div class="blog-thumb-body">
              <div class="blog-thumb-meta">
                <span class="blog-cat"
                  style="color:${color(p)};border-color:${color(p)}44;">
                  ${label(p)}
                </span>
                <span class="blog-date">${dateStr(p.date)}</span>
                ${readTimeBadge(p.body)}
              </div>
              <p class="blog-thumb-title">${p.title}</p>
              <p class="blog-thumb-author">By ${p.author}</p>
            </div>
          </a>
          ${i < sidebar.length - 1
            ? '<div class="blog-thumb-divider"></div>'
            : ''}
        `).join('')}
        <a href="/blog" class="blog-sidebar-more">
          View all posts →
        </a>
      </div>

    </div>`;
}

/* ════════════════════════════════════════════════
   RENDER FEATURED INFLUENCER OF THE WEEK
════════════════════════════════════════════════ */
function renderFeaturedInfluencer() {
  try {
    const inf = window.PLURGASM_DATA?.featuredInfluencer;
    const container = document.getElementById('featured-influencer');
    if (!container) return;
    if (!inf || !inf.active) { container.style.display = 'none'; return; }

    container.style.display = '';

    const linksHtml = (inf.links || []).filter(l => l.url).map((l, i) =>
      `<a href="${l.url}" target="_blank" rel="noopener"
          class="fi-link-btn ${i === 0 ? 'fi-link-primary' : 'fi-link-secondary'}">
        ${l.platform} ↗
      </a>`
    ).join('');

    container.innerHTML = `
      <div class="fi-card">
        <div class="fi-eyebrow-row">
          <a href="/social" class="fi-eyebrow">Influencer of the Week</a>
        </div>
        ${inf.image ? `
          <div class="fi-media">
            <div class="fi-photo-wrap">
              <img src="${inf.image}" alt="${inf.name}" class="fi-photo fi-photo-transparent">
            </div>
          </div>` : ''}
        <div class="fi-content">
          <div class="fi-name-row">
            <div>
              <p class="fi-name">${inf.name}</p>
              <span class="fi-handle">${inf.handle}</span>
            </div>
          </div>
          <p class="fi-blurb">${inf.blurb}</p>
          ${linksHtml ? `<div class="fi-links">${linksHtml}</div>` : ''}
        </div>
      </div>
    `;
  } catch (e) {
    console.error('renderFeaturedInfluencer:', e);
  }
}

/* ════════════════════════════════════════════════
   RENDER BOTW — Brand of the Week (admin override)
════════════════════════════════════════════════ */
function renderBotw() {
  const bw = JSON.parse(localStorage.getItem('pg_admin_botw') || 'null')
             || PLURGASM_DATA.brandOfWeek;
  if (!bw) return;

  const botwCard = document.getElementById('botw');
  if (!botwCard) return;

  if (bw.image) botwCard.classList.add('botw-has-image');
  else botwCard.classList.remove('botw-has-image');

  botwCard.innerHTML = `
    ${bw.image ? `
    <div class="botw-image-wrap">
      <img src="${bw.image}"
        alt="${bw.name}"
        class="botw-image"
        loading="lazy"
        onerror="this.parentElement.style.display='none'">
    </div>` : ''}
    <div class="botw-content">
      <div>
        <p class="botw-eyebrow"><span class="botw-star">★</span>Brand of the Week</p>
        <p class="botw-name">${bw.name}</p>
        <p class="botw-tagline">${bw.tagline}</p>
      </div>
      <p class="botw-desc">${bw.desc}</p>
      ${bw.ig ? `<p class="botw-ig">${bw.ig}</p>` : ''}
      <div class="botw-links">
        ${bw.url && bw.url !== '#' ? `
          <a href="${bw.url}" target="_blank"
            rel="noopener"
            class="botw-link-btn botw-link-primary">
            Visit Website →
          </a>` : ''}
        ${bw.ig ? `
          <a href="https://instagram.com/${(bw.ig||'').replace('@','')}"
            target="_blank" rel="noopener"
            class="botw-link-btn botw-link-ig">
            ${bw.ig} ↗
          </a>` : ''}
      </div>
    </div>
  `;
}

/* ════════════════════════════════════════════════
   ITEM GROUP TOGGLE
════════════════════════════════════════════════ */
function toggleItemGroup(index) {
  const header = document.querySelector(`.item-group-header[data-group="${index}"]`);
  const panel  = document.querySelector(`.item-group-panel[data-group="${index}"]`);
  if (!header || !panel) return;

  const willOpen = !header.classList.contains('open');

  // Single-open accordion: collapse every group first.
  document.querySelectorAll('.item-group-header.open')
    .forEach(h => h.classList.remove('open'));
  document.querySelectorAll('.item-group-panel.open')
    .forEach(p => p.classList.remove('open'));

  if (willOpen) {
    header.classList.add('open');
    panel.classList.add('open');
  }
}

/* ════════════════════════════════════════════════
   ARTIST SEARCH
════════════════════════════════════════════════ */
function searchArtist(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  return FESTIVALS
    .filter(f => f.headliners && f.headliners.some(h => h.toLowerCase().includes(q)))
    .map(f => ({
      festival: f,
      artists: f.headliners.filter(h => h.toLowerCase().includes(q))
    }));
}

/* ════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Merge admin-added festivals and brands from localStorage
  const extraFests = JSON.parse(localStorage.getItem('pg_admin_festivals') || '[]');
  extraFests.forEach(f => FESTIVALS.push(f));
  const extraBrands = JSON.parse(localStorage.getItem('pg_admin_brands') || '[]');
  extraBrands.forEach(b => BRANDS.push(b));

  // Apply admin-saved display ordering
  const festOrder = JSON.parse(localStorage.getItem('pg_admin_fest_order') || 'null');
  if (festOrder && festOrder.length) {
    FESTIVALS.sort((a, b) => {
      const ai = festOrder.indexOf(a.id);
      const bi = festOrder.indexOf(b.id);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }
  const brandOrder = JSON.parse(localStorage.getItem('pg_admin_brand_order') || 'null');
  if (brandOrder && brandOrder.length) {
    BRANDS.sort((a, b) => {
      const ai = brandOrder.indexOf(a.name);
      const bi = brandOrder.indexOf(b.name);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }

  renderFestFilterPills();   // populate vibe + region dropdowns from data (in sync w/ calendar)
  renderFestivals();

  renderCategories();
  renderBrands('all');
  renderFeaturedInfluencer();
  renderSocials();
  renderCreatorDirectory();   // immediate default list (works even if votes never load)
  loadCreatorVotes();         // then fetch vote counts/user votes and re-render sorted
  renderBotw();
  renderBlog();
  renderItemFilters();
  // stamp data-id on fest cards after render for search highlight
  setTimeout(() => {
    document.querySelectorAll('.fest-card').forEach((card, i) => {
      if (FESTIVALS[i]) card.dataset.id = FESTIVALS[i].id;
    });
  }, 50);

  initScrollAnimations();
  initCountUp();
  initCountdown();
  initMarquee();
  initBottomNav();
});

function initBottomNav() {
  const items = document.querySelectorAll('.bn-item');
  const sections = ['brands','festivals','blog','social'];

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    items.forEach(item => {
      const href = item.getAttribute('href');
      item.classList.toggle('active',
        href === '#' + current);
    });
  }, { passive: true });
}

/* ════════════════════════════════════════════════
   MOBILE MENU
════════════════════════════════════════════════ */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger');
  const opening = !menu.classList.contains('open');
  menu.classList.toggle('open', opening);
  btn.classList.toggle('open', opening);
  btn.setAttribute('aria-expanded', opening);
  document.body.style.overflow = opening ? 'hidden' : '';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger');
  menu.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});

/* ════════════════════════════════════════════════
   COUNT-UP ANIMATION — hero stats
════════════════════════════════════════════════ */
function initCountUp() {
  const targets = [
    { id: 'stat-festivals', end: FESTIVALS.length,                              suffix: '', duration: 1200 },
    { id: 'stat-brands',    end: BRANDS.length,                                 suffix: '', duration: 1600 },
    { id: 'stat-cats',      end: CATEGORIES.filter(c => !c.comingSoon).length,  suffix: '', duration: 900  },
  ];

  targets.forEach(({ id, end, suffix, duration }) => {
    const el = document.getElementById(id);
    if (!el) return;
    let start = 0;
    const step = end / (duration / 16);
    const tick = () => {
      start = Math.min(start + step, end);
      el.textContent = Math.floor(start) + suffix;
      if (start < end) requestAnimationFrame(tick);
      else el.textContent = end + suffix;
    };
    setTimeout(tick, 300);
  });
}

/* ════════════════════════════════════════════════
   SCROLL FADE-IN ANIMATIONS
════════════════════════════════════════════════ */
function initScrollAnimations() {
  document.querySelectorAll(
    '.section-title, .section-eyebrow, .eyebrow, ' +
    '.mission-headline, .mission-body, .mission-links, ' +
    '.botw, .countdown-inner'
  ).forEach(el => {
    if (!el.classList.contains('fade-up')) el.classList.add('fade-up');
  });

  document.querySelectorAll('.fest-card').forEach((el, i) => {
    el.classList.add('fade-up');
    el.dataset.delay = Math.min(i % 3 + 1, 6);
  });

  document.querySelectorAll('.cat-card').forEach((el, i) => {
    el.classList.add('fade-up');
    el.dataset.delay = Math.min(i % 4 + 1, 6);
  });

  document.querySelectorAll('.brand-card').forEach((el, i) => {
    el.classList.add('fade-up');
    el.dataset.delay = Math.min(i % 3 + 1, 6);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ════════════════════════════════════════════════
   MOUSE TRAIL — hero background
════════════════════════════════════════════════ */
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const heroBg = hero.querySelector('.hero-bg');
  if (!heroBg) return;

  // Trail config
  const TRAIL_LENGTH = 18;
  const COLORS = [
    'rgba(255,220,80,0.032)',
    'rgba(255,210,60,0.022)',
    'rgba(255,200,40,0.014)',
    'rgba(255,190,20,0.009)',
    'rgba(255,180,0,0.005)',
    'rgba(255,170,0,0.002)',
  ];

  // Create trail dots
  const dots = Array.from({ length: TRAIL_LENGTH }, (_, i) => {
    const d = document.createElement('div');
    const progress = i / TRAIL_LENGTH;
    const size = Math.round(18 - progress * 12); // 18px at head → 6px at tail
    const colorIdx = Math.min(Math.floor(progress * COLORS.length), COLORS.length - 1);
    d.style.cssText = [
      'position:absolute',
      `width:${size}px`,
      `height:${size}px`,
      'border-radius:50%',
      `background:${COLORS[colorIdx]}`,
      'pointer-events:none',
      'transform:translate(-50%,-50%)',
      'opacity:0',
      'z-index:1',
      'will-change:left,top',
      i < 4 ? 'filter:blur(3px)' : i < 8 ? 'filter:blur(1.5px)' : 'filter:blur(0.5px)',
    ].join(';');
    heroBg.appendChild(d);
    return d;
  });

  // Position history ring buffer
  const posX = new Array(TRAIL_LENGTH).fill(0);
  const posY = new Array(TRAIL_LENGTH).fill(0);
  let head = 0;
  let tX = 0, tY = 0;
  let active = false, raf;

  function tick() {
    if (!active) return;
    // Smooth head toward mouse
    posX[head] = posX[(head - 1 + TRAIL_LENGTH) % TRAIL_LENGTH] +
      (tX - posX[(head - 1 + TRAIL_LENGTH) % TRAIL_LENGTH]) * 0.32;
    posY[head] = posY[(head - 1 + TRAIL_LENGTH) % TRAIL_LENGTH] +
      (tY - posY[(head - 1 + TRAIL_LENGTH) % TRAIL_LENGTH]) * 0.32;
    head = (head + 1) % TRAIL_LENGTH;

    // Position each dot along the trail history
    dots.forEach((dot, i) => {
      const idx = (head - 1 - i + TRAIL_LENGTH * 2) % TRAIL_LENGTH;
      dot.style.left = posX[idx] + 'px';
      dot.style.top  = posY[idx] + 'px';
    });

    raf = requestAnimationFrame(tick);
  }

  hero.addEventListener('mousemove', e => {
    // Hide trail when hovering over text, inputs, buttons, links
    const isInteractive = e.target.closest(
      'input, textarea, button, a, select, ' +
      'h1, h2, h3, p, label, ' +
      '.hero-eyebrow, .hero-sub, .hero-title, ' +
      '.hero-stats, .stat-num, .stat-label, ' +
      '.plur-tiles, .pt, ' +
      '.search-wrap, .search-form, #search-input, ' +
      '.hero-search, [type="text"], [type="search"]'
    );
    if (isInteractive) {
      dots.forEach(d => d.style.opacity = '0');
      active = false;
      cancelAnimationFrame(raf);
      return;
    }

    const r = hero.getBoundingClientRect();
    tX = e.clientX - r.left;
    tY = e.clientY - r.top;
    if (!active) {
      active = true;
      // seed all positions to current mouse pos so trail doesn't sweep from 0,0
      posX.fill(tX); posY.fill(tY);
      dots.forEach(d => d.style.opacity = '1');
      tick();
    }
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    active = false;
    cancelAnimationFrame(raf);
    dots.forEach(d => d.style.opacity = '0');
  });
})();

/* ════════════════════════════════════════════════
   SCROLL PROGRESS BAR
════════════════════════════════════════════════ */
(function() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }, { passive: true });
})();

