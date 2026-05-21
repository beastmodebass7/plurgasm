/* ════════════════════════════════════════════════
   FESTIVAL FILTER STATE
════════════════════════════════════════════════ */
let _festType  = 'all';
let _festGenre = '';
let _festView  = 'grid';

const typeClass = { mega:'t-mega', underground:'t-under', regional:'t-reg', playa:'t-playa', international:'t-intl' };
const dotClass  = { mega:'dot-mega', underground:'dot-under', regional:'dot-reg', playa:'dot-playa', international:'dot-intl' };

function getFilteredFests() {
  return FESTIVALS.filter(f => {
    const typeOk  = _festType  === 'all' || f.type === _festType;
    const genreOk = _festGenre === ''    || f.genres.includes(_festGenre);
    return typeOk && genreOk;
  });
}

/* ════════════════════════════════════════════════
   RENDER — GRID VIEW
════════════════════════════════════════════════ */
function renderFestivals() {
  const list = getFilteredFests();
  document.getElementById('fest-grid').innerHTML = list.map(f => `
    <div class="fest-card ${f.featured ? 'fest-featured' : ''}" data-id="${f.id}" onclick="window.open('${f.url}','_blank')">
      <span class="fest-tag ${typeClass[f.type] || 't-reg'}">${f.typeLabel}</span>
      <p class="fest-name">${f.name}</p>
      ${f.tagline ? `<p class="fest-tagline">${f.tagline}</p>` : ''}
      <p class="fest-meta">${f.location} &nbsp;·&nbsp; ${f.dates} &nbsp;·&nbsp; ${f.days} Day${f.days>1?'s':''} &nbsp;·&nbsp; ${f.age}</p>
      <p class="fest-desc">${f.desc}</p>
      <div class="fest-footer">
        <div class="vibes">${f.genres.slice(0,4).map(g=>`<span class="vibe">${g}</span>`).join('')}</div>
        <span class="fest-arrow">→</span>
      </div>
    </div>
  `).join('') || `<p style="color:var(--muted);grid-column:1/-1;font-size:15px;padding:32px 0;">No festivals match this filter combo.</p>`;
}

/* ════════════════════════════════════════════════
   RENDER — CALENDAR VIEW
════════════════════════════════════════════════ */
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function renderCalendar() {
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
          return `
            <div class="cal-row" onclick="window.open('${f.url}','_blank')">
              <div class="cal-date-col">
                <span class="cal-date-month">${monthName.slice(0,3).toUpperCase()}</span>
                <span class="cal-date-day">${dayNum}</span>
                ${endNum ? `<span class="cal-date-end">– ${endNum}</span>` : ''}
              </div>
              <div class="cal-info-col">
                <div class="cal-type-dot ${dotClass[f.type] || 'dot-reg'}"></div>
                <span class="cal-name">${f.name}</span>
                <span class="cal-loc">📍 ${f.location} &nbsp;·&nbsp; ${f.age}</span>
                <div class="cal-genres">${f.genres.slice(0,3).map(g=>`<span class="cal-genre">${g}</span>`).join('')}</div>
                <span class="cal-arrow">→</span>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }).join('');
}

/* ════════════════════════════════════════════════
   FILTER ACTIONS
════════════════════════════════════════════════ */
function filterFests(type, btn) {
  _festType = type;
  document.querySelectorAll('#festivals .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  refreshFestView();
}

function filterGenre(genre, btn) {
  _festGenre = genre;
  document.querySelectorAll('.genre-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  refreshFestView();
}

function setView(view) {
  _festView = view;
  document.getElementById('btn-grid').classList.toggle('active', view === 'grid');
  document.getElementById('btn-cal').classList.toggle('active',  view === 'cal');
  document.getElementById('fest-grid').style.display = view === 'grid' ? '' : 'none';
  document.getElementById('cal-view').style.display  = view === 'cal'  ? '' : 'none';
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
  document.getElementById('cat-grid').innerHTML = CATEGORIES.map(c => `
    <div class="cat-card" onclick="filterBrands('${c.id}', document.querySelector('[data-cat=\\'${c.id}\\']'))">
      <span class="cat-icon">${c.icon}</span>
      <span class="cat-name">${c.label.toUpperCase()}</span>
      <span class="cat-count">${c.count} Brands</span>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════════
   RENDER BRANDS
════════════════════════════════════════════════ */
let searchQuery = '';

function renderBrands(cat) {
  let list = cat === 'all' ? BRANDS : BRANDS.filter(b => b.cat === cat);
  if (searchQuery) list = list.filter(b =>
    [b.name, b.cat, b.style, b.loc, b.desc, b.ig, ...(b.tags||[])].join(' ').toLowerCase().includes(searchQuery)
  );
  document.getElementById('brand-grid').innerHTML = list.map(b => `
    <div class="brand-card" onclick="openBrandModal('${b.id}')">
      <div class="brand-badge ${b.badgeCls}">${b.badge}</div>
      <div class="brand-info">
        <p class="brand-name">${b.name}</p>
        <div class="brand-meta">
          <span class="brand-price ${b.priceCls}">${b.price}</span>
          <span class="brand-ship">⏱ ${b.ship}</span>
          <span class="brand-loc">📍 ${b.loc}</span>
        </div>
        <p class="brand-style">${b.style}</p>
        <p class="brand-desc">${b.desc}</p>
        ${b.ig ? `<p class="brand-ig">${b.ig}</p>` : ''}
      </div>
    </div>
  `).join('') || `<p style="color:var(--muted);grid-column:1/-1;font-size:15px;padding:24px 0;">No brands found${searchQuery ? ' for "'+searchQuery+'"':''} in this category.</p>`;
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

  document.getElementById('brand-modal-content').innerHTML = `
    <div class="bm-header">
      <div class="bm-badge ${b.badgeCls}">${b.badge}</div>
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
        ? `<a href="https://instagram.com/${igHandle}" target="_blank" rel="noopener" class="bm-link-btn bm-link-ig">Instagram ↗</a>`
        : ''}
      <button onclick="closeBrandModal()" class="bm-link-btn bm-link-ghost" style="margin-left:auto;">Close</button>
    </div>
  `;

  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  document.getElementById('brand-modal').classList.add('open');
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
  document.querySelectorAll('#brand-filters .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderBrands(cat);
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
   RENDER SOCIALS
════════════════════════════════════════════════ */
function renderSocials() {
  document.getElementById('spotlight-grid').innerHTML = SOCIALS.map(s => `
    <div class="spotlight-card ${s.featured ? 'featured' : ''}">
      ${s.featured ? '<span class="spot-badge">⭐ Featured</span>' : ''}
      <p class="spot-handle">${s.handle}</p>
      <p class="spot-platform">${s.platform} · ${s.type}</p>
      <p class="spot-desc">${s.desc}</p>
      <a class="spot-link" href="https://instagram.com/${s.handle.replace('@','')}" target="_blank">Follow →</a>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════════
   COUNTDOWN — Project GLOW May 30 2026
════════════════════════════════════════════════ */
(function tick() {
  const diff = new Date('2026-05-30T18:00:00-04:00') - Date.now();
  const el = document.getElementById('countdown');
  if (!el) return;
  if (diff <= 0) { el.textContent = "IT'S HAPPENING"; return; }
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  el.innerHTML = `<span>${String(d).padStart(2,'0')}<small>d</small></span><span>${String(h).padStart(2,'0')}<small>h</small></span><span>${String(m).padStart(2,'0')}<small>m</small></span><span>${String(s).padStart(2,'0')}<small>s</small></span>`;
  setTimeout(tick, 1000);
})();

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

  // Apply Brand of the Week override from admin panel
  const botw = JSON.parse(localStorage.getItem('pg_admin_botw') || 'null');
  if (botw) {
    if (botw.name) document.getElementById('botw-name').textContent = botw.name;
    if (botw.cat)  document.getElementById('botw-cat').textContent  = botw.cat;
    if (botw.desc) document.getElementById('botw-desc').textContent = botw.desc;
    if (botw.ig)   document.getElementById('botw-ig').textContent   = botw.ig;
    if (botw.url) {
      const a = document.getElementById('botw-url');
      a.href = botw.url;
      a.style.display = '';
    }
  }

  renderFestivals();
  renderCategories();
  renderBrands('all');
  renderSocials();
  // stamp data-id on fest cards after render for search highlight
  setTimeout(() => {
    document.querySelectorAll('.fest-card').forEach((card, i) => {
      if (FESTIVALS[i]) card.dataset.id = FESTIVALS[i].id;
    });
  }, 50);
});
