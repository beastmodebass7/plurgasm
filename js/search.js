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
          <div class="sr-icon"><img src="images/nav/icon-nav-festivals.webp" alt="" loading="lazy" style="width:22px;height:22px;object-fit:contain;mix-blend-mode:screen;"></div>
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

    // Categories — icon may be an image path (see renderCategories in main.js);
    // count is derived, the data no longer carries a count field.
    CATEGORIES.forEach(c => {
      const iconHtml = /\.(png|jpe?g|gif|webp|svg)$/i.test(c.icon)
        ? `<img src="${c.icon}" alt="" loading="lazy" style="width:22px;height:22px;object-fit:contain;">`
        : c.icon;
      const count = BRANDS.filter(b => b.cat === c.id).length;
      allItems.push({
        type: 'category',
        _name: c.label.toLowerCase(),
        _blob: [c.label, c.id].join(' ').toLowerCase(),
        render: () => `
        <div class="sr-item" onclick="goCat('${c.id}')">
          <div class="sr-icon">${iconHtml}</div>
          <div class="sr-text">
            <span class="sr-name">${c.label.toUpperCase()}</span>
            <span class="sr-sub">${count} brand${count === 1 ? '' : 's'} in this category</span>
          </div>
          <span class="sr-badge sr-badge-cat">Category</span>
          <span class="sr-arrow">→</span>
        </div>`,
      });
    });

    // Artists — profile pages at /artist?id=… (matchable by name AND genres)
    try {
      const ARTIST_LIST = (window.PLURGASM_DATA && PLURGASM_DATA.artists) || [];
      ARTIST_LIST.forEach(a => {
        if (!a || !a.id) return;
        allItems.push({
          type: 'artist',
          _name: (a.name || '').toLowerCase(),
          _blob: [a.name, a.tagline || '', ...(a.genres || []), a.desc || ''].join(' ').toLowerCase(),
          render: () => `
            <div class="sr-item" onclick="goArtist('${a.id}')">
              <div class="sr-icon"><img src="images/icons/icon-creator.webp" alt="" loading="lazy" style="width:22px;height:22px;object-fit:contain;mix-blend-mode:screen;"></div>
              <div class="sr-text">
                <span class="sr-name">${a.name}</span>
                <span class="sr-sub">${(a.genres || []).slice(0,3).join(', ')} · Tour dates & profile</span>
              </div>
              <span class="sr-badge sr-badge-artist">Artist</span>
              <span class="sr-arrow">→</span>
            </div>`,
        });
      });
    } catch (e) { console.error('artist search index error:', e); }

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
    // Artists lead: the roster is tiny, so the group only appears on a direct
    // hit (name/genre) — and then it's almost always what was searched for.
    const order   = ['artist','festival','brand','category','social'];
    const labels  = { artist:'🎤 Artists', festival:'🎪 Festivals', brand:'🏷️ Brands', category:'🗂️ Categories', social:'📱 Social' };
    const grouped = {};
    scored.forEach(({ item }) => {
      if (!grouped[item.type]) grouped[item.type] = [];
      if (grouped[item.type].length < 6) grouped[item.type].push(item);
    });

    let html = '';
    order.forEach(type => {
      if (!grouped[type]) return;
      html += `<div class="sr-group-label sr-group-${type}">${labels[type]}</div>`;
      html += grouped[type].map(i => i.render()).join('');
    });

    results.innerHTML = html;
    highlightNames(q);
    results.classList.add('open');
    activeIdx = -1;
  }

  // Wrap the matched substring of each rendered result NAME in a
  // <span class="sr-hl">. Operates on text nodes via indexOf — the query is
  // never interpreted as HTML or regex, so special characters are inert.
  // Names that don't contain the query (blob-only matches) are left as-is.
  function highlightNames(q) {
    results.querySelectorAll('.sr-name').forEach(el => {
      const text = el.textContent;
      const idx = text.toLowerCase().indexOf(q);
      if (idx === -1) return;
      const hl = document.createElement('span');
      hl.className = 'sr-hl';
      hl.textContent = text.slice(idx, idx + q.length);
      el.textContent = text.slice(0, idx);
      el.appendChild(hl);
      el.appendChild(document.createTextNode(text.slice(idx + q.length)));
    });
  }

  // ── NAVIGATE ACTIONS ────────────────────────────────────────
  window.goFestival = function(id) {
    try {
      closeSearch();
      const f = FESTIVALS.find(x => x.id === id);
      if (!f) return;
      // Detail page → open it (root-relative, e.g. '/festivals/bass-canyon.html').
      // No detail page → send to the calendar with a highlight param so the
      // festival's card flashes there.
      if (f.detailPage) {
        window.location.href = '/' + f.detailPage.replace(/^\/+/, '');
      } else {
        window.location.href = '/calendar?festival=' + encodeURIComponent(f.id);
      }
    } catch (e) {
      console.error('goFestival error:', e);
    }
  };

  window.goArtist = function(id) {
    try {
      closeSearch();
      const list = (window.PLURGASM_DATA && PLURGASM_DATA.artists) || [];
      const a = list.find(x => x.id === id);
      if (!a) return;
      // Extensionless profile URL, matching sitemap.xml + the canonical form.
      window.location.href = '/artist?id=' + encodeURIComponent(a.id);
    } catch (e) {
      console.error('goArtist error:', e);
    }
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
