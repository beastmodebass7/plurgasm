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
   RENDER — GRID VIEW
════════════════════════════════════════════════ */
function renderFestivals() {
  const list = getFilteredFests();
  document.getElementById('fest-grid').innerHTML = list.map(f => {
    const dest   = f.detailPage || f.url;
    const target = f.detailPage ? '_self' : '_blank';
    const t = f.cardTheme;
    const cardStyle    = t ? `style="background:${t.bg};border-color:${t.border};"` : '';
    const glowStyle    = t ? `style="background:radial-gradient(ellipse 80% 40% at 50% 0%, ${t.glow}, transparent);"` : '';
    const taglineColor = t ? `style="color:${t.label};"` : '';
    return `
    <div class="fest-card ${f.featured && !t ? 'fest-featured' : ''}" data-id="${f.id}" ${cardStyle} onclick="window.open('${dest}','${target}')">
      ${getDaysBadge(f.sortDate)}
      <div class="fest-card-glow" ${glowStyle}></div>
      <span class="fest-tag ${typeClass[f.type] || 't-reg'}">${f.typeLabel}</span>
      <p class="fest-name">${f.name}</p>
      ${f.tagline ? `<p class="fest-tagline" ${taglineColor}>${f.tagline}</p>` : ''}
      <p class="fest-meta">${f.location} &nbsp;·&nbsp; ${f.dates} &nbsp;·&nbsp; ${f.days} Day${f.days>1?'s':''} &nbsp;·&nbsp; ${f.age}</p>
      <p class="fest-desc">${f.desc}</p>
      <div class="fest-footer">
        <div class="vibes">${f.genres.slice(0,4).map(g=>`<span class="vibe">${g}</span>`).join('')}</div>
        <span class="fest-arrow" ${t ? `style="color:${t.accent};"` : ''}>→</span>
      </div>
    </div>
  `; }).join('') || `<p style="color:var(--muted);grid-column:1/-1;font-size:15px;padding:32px 0;">No festivals match this filter combo.</p>`;
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
    <a class="cat-card" href="category.html?cat=${c.id}" style="text-decoration:none;">
      <span class="cat-icon">${c.icon}</span>
      <span class="cat-name">${c.label.toUpperCase()}</span>
      <span class="cat-count">${c.count > 0 ? c.count + ' Brands' : 'Coming Soon'}</span>
    </a>
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
        ${b.ig ? `<a class="brand-ig-btn"
  href="https://instagram.com/${b.ig.replace('@','')}"
  target="_blank"
  rel="noopener"
  onclick="event.stopPropagation()">
  ${b.ig}
</a>` : ''}
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
        ? `<a href="https://instagram.com/${igHandle}" target="_blank" rel="noopener" class="brand-ig-btn">@${igHandle}</a>`
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

  initCountUp();
  initScrollAnimations();
});

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
    { id: 'stat-festivals', end: 80,  suffix: '+', duration: 1800 },
    { id: 'stat-brands',    end: 200, suffix: '+', duration: 2200 },
    { id: 'stat-cats',      end: 12,  suffix: '',  duration: 1400 },
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
    '.botw, .countdown-inner, .plur-cards'
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

  document.querySelectorAll('.plur-card').forEach((el, i) => {
    el.classList.add('fade-up');
    el.dataset.delay = i + 1;
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

