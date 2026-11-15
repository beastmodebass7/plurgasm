/* views.js — per-post view counts via Supabase.
   Reuses the single client created in auth.js (window.sb). Every network call
   is wrapped in try/catch with console.error so a Supabase hiccup never blanks
   a page — on failure we simply omit the badge rather than throwing.

   Public API (window.PlurViews):
     formatCount(n)   -> "1.2k" / "1.5M" style string
     badgeHtml(n)     -> "<n> views" badge markup (eye icon + count)
     fillBadges(root) -> fill every .views-badge-slot[data-post-id] under root
                         from the post_views table (READ ONLY, no increment)
     recordAndGet(id) -> increment once per session, return the current count
                         (number), or null if it couldn't be read at all
     totalViews()     -> { total, live } across all posts (Promise)

   Backup: js/view-snapshot.js (window.PLURGASM_VIEW_SNAPSHOT) holds a daily
   copy of the counts committed to the repo. Every count shown is
   max(live Supabase, snapshot), so numbers never drop, and if Supabase is
   down the snapshot is shown instead of nothing. */
(function () {
  'use strict';

  // Simple eye outline. stroke=currentColor so it inherits the badge color;
  // size is controlled in CSS (.views-badge .views-eye).
  var EYE_SVG =
    '<svg class="views-eye" viewBox="0 0 24 24" width="12" height="12" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>' +
      '<circle cx="12" cy="12" r="3"/>' +
    '</svg>';

  function client() { return window.sb || null; }

  // Backup counts from js/view-snapshot.js ({} if that file isn't loaded).
  function snapshotViews() {
    var s = window.PLURGASM_VIEW_SNAPSHOT;
    return (s && s.views && typeof s.views === 'object') ? s.views : {};
  }
  function hasSnapshot() { return Object.keys(snapshotViews()).length > 0; }

  // Per post, keep the higher of live and snapshot.
  function mergeWithSnapshot(live) {
    var out = {}, snap = snapshotViews(), k;
    for (k in snap) if (Object.prototype.hasOwnProperty.call(snap, k)) out[k] = Number(snap[k]) || 0;
    for (k in live) if (Object.prototype.hasOwnProperty.call(live, k)) out[k] = Math.max(out[k] || 0, Number(live[k]) || 0);
    return out;
  }
  function bestOf(id, n) {
    var s = Number(snapshotViews()[id]) || 0;
    return (n === null || n === undefined) ? (s || null) : Math.max(Number(n) || 0, s);
  }
  var _lastLive = false; // did the most recent fetchAllViews reach Supabase?

  // 1200 -> "1.2k", 1500000 -> "1.5M", 999 -> "999". Drops a trailing ".0".
  function formatCount(n) {
    n = Number(n);
    if (!isFinite(n) || n < 0) n = 0;
    if (n < 1000) return String(Math.round(n));
    var div = n < 1000000 ? 1000 : 1000000;
    var suffix = n < 1000000 ? 'k' : 'M';
    var s = (Math.round((n / div) * 10) / 10).toFixed(1);
    if (s.slice(-2) === '.0') s = s.slice(0, -2);
    return s + suffix;
  }

  function badgeHtml(count) {
    return '<span class="views-badge" title="' + (Number(count) || 0) + ' views">' +
      EYE_SVG + '<span>' + formatCount(count) + ' views</span>' +
    '</span>';
  }

  // Cached map of post_id -> views for the lists/grids.
  //   undefined = not fetched yet, null = fetch failed, object = data
  var _allCache;

  // auth.js may create window.sb a moment after this script runs.
  function waitForClient(ms) {
    return new Promise(function (resolve) {
      var waited = 0;
      (function check() {
        if (client() || waited >= ms) return resolve(client());
        waited += 100; setTimeout(check, 100);
      })();
    });
  }

  async function fetchAllViews() {
    if (_allCache !== undefined) return _allCache;
    try {
      var sb = await waitForClient(3000);
      if (!sb) throw new Error('Supabase client unavailable');
      var res = await sb.from('post_views').select('post_id, views');
      if (res.error) throw res.error;
      var map = {};
      (res.data || []).forEach(function (r) { map[r.post_id] = r.views; });
      _lastLive = true;
      _allCache = mergeWithSnapshot(map);
    } catch (e) {
      console.error('[views.js] fetchAllViews', e);
      _lastLive = false;
      // Fall back to the backup snapshot instead of showing nothing.
      _allCache = hasSnapshot() ? mergeWithSnapshot({}) : null;
    }
    return _allCache;
  }

  // Total views across every post. live=false means the backup was used.
  async function totalViews() {
    var map = await fetchAllViews();
    if (!map) return { total: 0, live: false };
    var t = 0, k;
    for (k in map) if (Object.prototype.hasOwnProperty.call(map, k)) t += Number(map[k]) || 0;
    return { total: t, live: _lastLive };
  }

  // Fill every .views-badge-slot[data-post-id] under root. Posts with no row
  // show "0 views"; if the counts failed to load, slots are left empty.
  async function fillBadges(root) {
    try {
      root = root || document;
      var map = await fetchAllViews();
      if (!map) return; // load failed — omit badges entirely
      var slots = root.querySelectorAll('.views-badge-slot[data-post-id]');
      Array.prototype.forEach.call(slots, function (el) {
        if (el.dataset.viewsFilled) return;
        var id = el.getAttribute('data-post-id');
        el.innerHTML = badgeHtml(map[id] || 0);
        el.dataset.viewsFilled = '1';
      });
    } catch (e) {
      console.error('[views.js] fillBadges', e);
    }
  }

  // Read a single post's current count. Returns a number, or null on failure.
  async function getViews(id) {
    try {
      var sb = client();
      if (!sb) return bestOf(id, null);
      var res = await sb.from('post_views').select('views').eq('post_id', id).maybeSingle();
      if (res.error) throw res.error;
      return bestOf(id, res.data ? res.data.views : 0);
    } catch (e) {
      console.error('[views.js] getViews', e);
      return bestOf(id, null);
    }
  }

  // Increment once and return the new count, or null on failure.
  async function increment(id) {
    try {
      var sb = client();
      if (!sb) return null;
      var res = await sb.rpc('increment_post_view', { p_post_id: id });
      if (res.error) throw res.error;
      return res.data;
    } catch (e) {
      console.error('[views.js] increment', e);
      return null;
    }
  }

  // For a blog post page: increment at most once per browser session
  // (sessionStorage), otherwise just read the current count.
  async function recordAndGet(id) {
    var key = 'viewed-' + id;
    var already = false;
    try { already = !!sessionStorage.getItem(key); } catch (e) { /* private mode */ }

    if (already) return getViews(id);

    var count = await increment(id);
    if (count !== null && count !== undefined) {
      try { sessionStorage.setItem(key, '1'); } catch (e) { /* private mode */ }
      return bestOf(id, count);
    }
    // Increment failed — fall back to a plain read so a count can still show.
    return getViews(id);
  }

  window.PlurViews = {
    formatCount: formatCount,
    badgeHtml: badgeHtml,
    fillBadges: fillBadges,
    recordAndGet: recordAndGet,
    totalViews: totalViews
  };
})();
