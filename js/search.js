/* ════════════════════════════════════════════════
   SPOTLIGHT SEARCH
════════════════════════════════════════════════ */
(function() {
  const input   = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  let activeIdx = -1;
  let allItems  = [];

  // score a single item — higher = better match
  function score(item, q) {
    const name = (item._name || '').toLowerCase();
    const blob = (item._blob || '').toLowerCase();
    if (name === q)          return 100;
    if (name.startsWith(q))  return  80;
    if (name.includes(q))    return  60;
    if (blob.includes(q))    return  30;
    return 0;
  }

  function buildIndex() {
    allItems = [];

    // Festivals
    FESTIVALS.forEach(f => allItems.push({
      type: 'festival',
      _name: f.name.toLowerCase(),
      _blob: [f.name, f.tagline||'', f.location, f.dates, ...f.genres, f.desc].join(' ').toLowerCase(),
      render: () => `
        <div class="sr-item" onclick="goFestival('${f.id}')">
          <div class="sr-icon">🎪</div>
          <div class="sr-text">
            <span class="sr-name">${f.name}</span>
            <span class="sr-sub">${f.location} · ${f.dates} · ${f.genres.slice(0,3).join(', ')}</span>
          </div>
          <span class="sr-badge sr-badge-fest">Festival</span>
          <span class="sr-arrow">→</span>
        </div>`,
    }));

    // Brands
    BRANDS.forEach(b => allItems.push({
      type: 'brand',
      _name: b.name.toLowerCase(),
      _blob: [b.name, b.cat, b.style, b.loc, b.desc, b.ig||'', ...(b.tags||[])].join(' ').toLowerCase(),
      render: () => `
        <div class="sr-item" onclick="goBrand('${b.id}')">
          <div class="sr-icon" style="font-family:'Bebas Neue',sans-serif;font-size:12px;letter-spacing:1px;">${b.badge}</div>
          <div class="sr-text">
            <span class="sr-name">${b.name}</span>
            <span class="sr-sub">${b.style} · ${b.loc} · ${b.price}</span>
          </div>
          <span class="sr-badge sr-badge-brand">Brand</span>
          <span class="sr-arrow">→</span>
        </div>`,
    }));

    // Categories
    CATEGORIES.forEach(c => allItems.push({
      type: 'category',
      _name: c.label.toLowerCase(),
      _blob: [c.label, c.id].join(' ').toLowerCase(),
      render: () => `
        <div class="sr-item" onclick="goCat('${c.id}')">
          <div class="sr-icon">${c.icon}</div>
          <div class="sr-text">
            <span class="sr-name">${c.label.toUpperCase()}</span>
            <span class="sr-sub">${c.count} brands in this category</span>
          </div>
          <span class="sr-badge sr-badge-cat">Category</span>
          <span class="sr-arrow">→</span>
        </div>`,
    }));

    // Socials
    SOCIALS.forEach(s => allItems.push({
      type: 'social',
      _name: s.handle.toLowerCase(),
      _blob: [s.handle, s.platform, s.type, s.desc].join(' ').toLowerCase(),
      render: () => `
        <div class="sr-item" onclick="goSocial('${s.handle}')">
          <div class="sr-icon">📱</div>
          <div class="sr-text">
            <span class="sr-name">${s.handle}</span>
            <span class="sr-sub">${s.platform} · ${s.type}</span>
          </div>
          <span class="sr-badge sr-badge-social">Social</span>
          <span class="sr-arrow">→</span>
        </div>`,
    }));
  }

  function runSearch(q) {
    q = q.trim().toLowerCase();
    if (q.length < 2) { results.classList.remove('open'); return; }

    const scored = allItems
      .map(item => ({ item, s: score(item, q) }))
      .filter(x => x.s > 0)
      .sort((a,b) => b.s - a.s);

    if (scored.length === 0) {
      results.innerHTML = `<p class="sr-empty">No results for "<strong style="color:var(--white)">${q}</strong>" — try a genre, vibe, or brand name.</p>`;
      results.classList.add('open');
      return;
    }

    // Group by type in order
    const order   = ['festival','brand','category','social'];
    const labels  = { festival:'🎪 Festivals', brand:'🏷️ Brands', category:'🗂️ Categories', social:'📱 Social' };
    const grouped = {};
    scored.forEach(({ item }) => {
      if (!grouped[item.type]) grouped[item.type] = [];
      if (grouped[item.type].length < 4) grouped[item.type].push(item);
    });

    let html = '';
    order.forEach(type => {
      if (!grouped[type]) return;
      html += `<div class="sr-group-label">${labels[type]}</div>`;
      html += grouped[type].map(i => i.render()).join('');
    });

    results.innerHTML = html;
    results.classList.add('open');
    activeIdx = -1;
  }

  // ── NAVIGATE ACTIONS ────────────────────────────────────────
  window.goFestival = function(id) {
    closeSearch();
    document.getElementById('festivals').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      // highlight the matching card
      document.querySelectorAll('.fest-card').forEach(c => c.style.outline = '');
      const card = document.querySelector(`.fest-card[data-id="${id}"]`);
      if (card) {
        card.style.outline = '1px solid var(--cyan)';
        card.scrollIntoView({ behavior:'smooth', block:'center' });
        setTimeout(() => card.style.outline = '', 2500);
      }
    }, 400);
  };

  window.goBrand = function(id) {
    closeSearch();
    const b = BRANDS.find(x => x.id === id);
    if (b) {
      setTimeout(() => openBrandModal(id), 200);
    } else {
      filterBrands('all', document.querySelector('.filter-btn[data-cat="all"]'));
      document.getElementById('brands').scrollIntoView({ behavior:'smooth', block:'start' });
    }
  };

  window.goCat = function(id) {
    closeSearch();
    filterBrands(id, document.querySelector(`[data-cat="${id}"]`));
    document.getElementById('brands').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.goSocial = function(handle) {
    closeSearch();
    document.getElementById('social').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      document.querySelectorAll('.spotlight-card').forEach(c => {
        const h = c.querySelector('.spot-handle');
        if (h && h.textContent.trim() === handle) {
          c.style.outline = '1px solid var(--green)';
          setTimeout(() => c.style.outline = '', 2500);
        }
      });
    }, 500);
  };

  function closeSearch() {
    results.classList.remove('open');
    input.value = '';
    activeIdx = -1;
  }

  // ── KEYBOARD NAV ───────────────────────────────────────────
  function getItems() { return results.querySelectorAll('.sr-item'); }
  input.addEventListener('keydown', e => {
    const items = getItems();
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx+1, items.length-1); items.forEach((el,i)=>el.style.background = i===activeIdx?'rgba(0,229,255,0.08)':''); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx-1, 0); items.forEach((el,i)=>el.style.background = i===activeIdx?'rgba(0,229,255,0.08)':''); }
    else if (e.key === 'Enter') { if (activeIdx >= 0 && items[activeIdx]) items[activeIdx].click(); else doSearch(); }
    else if (e.key === 'Escape') closeSearch();
  });

  // ── LIVE INPUT ─────────────────────────────────────────────
  input.addEventListener('input', function() { runSearch(this.value); });
  input.addEventListener('focus', function() { if (this.value.length >= 2) runSearch(this.value); });

  // close on outside click
  document.addEventListener('click', e => {
    if (!document.getElementById('search-wrap').contains(e.target)) closeSearch();
  });

  // build index after DOM is ready
  document.addEventListener('DOMContentLoaded', () => { setTimeout(buildIndex, 100); });

  // expose doSearch for button click
  window.doSearch = function() {
    const q = input.value.trim();
    if (!q) return;
    runSearch(q);
    if (!results.classList.contains('open')) {
      // fallback — scroll to brands and filter
      searchQuery = q.toLowerCase();
      renderBrands(window._currentCat || 'all');
      document.getElementById('brands').scrollIntoView({ behavior:'smooth' });
    }
  };
})();
