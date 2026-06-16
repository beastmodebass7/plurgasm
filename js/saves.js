/* saves.js — "save festival" (heart) button + Supabase persistence.
   Reuses the single client created in auth.js (window.sb). Every network call
   is wrapped in try/catch with console.error so a Supabase hiccup never breaks
   festival rendering — on failure we simply leave the hearts as-is.

   Saves live in the `saved_festivals` table (user_id, festival_id) with RLS
   scoping every read/insert/delete to the signed-in user's own rows. The
   festival_id stored is the festival's id from data.js (e.g. 'edc').

   Public API (window.PlurSaves):
     buttonHtml(festId) -> heart <button> markup for a festival card
     markAll()          -> sync every .pg-save-btn in the DOM to current state
     isSaved(festId)    -> boolean

   Render functions emit buttonHtml(); static pages (festival detail pages) can
   drop an empty <button class="pg-save-btn" data-fest-id="…"></button> and the
   heart icon is injected automatically. A single delegated click handler wires
   every button, current and future, so no per-button setup is needed. */
(function () {
  'use strict';

  // Classic 24x24 heart. fill:none + stroke = outline (unsaved); the .saved
  // state fills it with the neon-pink accent. Sized in CSS.
  var HEART_SVG =
    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">' +
      '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3' +
      'c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5' +
      'c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>' +
    '</svg>';

  var _saved = new Set();   // festival_ids the signed-in user has saved

  function client() { return window.sb || null; }

  function isSaved(id) { return _saved.has(String(id)); }

  function escapeAttr(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Inject the heart-button styles once. Self-contained so the control looks
  // right even on pages that don't pull in every section of style.css.
  function ensureStyles() {
    if (document.getElementById('pg-save-styles')) return;
    var css =
      '.pg-save-btn{display:inline-flex;align-items:center;justify-content:center;' +
        'width:34px;height:34px;padding:0;flex-shrink:0;cursor:pointer;' +
        'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);' +
        'border-radius:50%;color:rgba(240,238,255,0.5);' +
        'transition:color .18s ease,border-color .18s ease,background .18s ease,transform .12s ease;' +
        '-webkit-tap-highlight-color:transparent}' +
      '.pg-save-btn svg{display:block;width:16px;height:16px;pointer-events:none;' +
        'fill:none;stroke:currentColor;stroke-width:2;stroke-linejoin:round;stroke-linecap:round}' +
      '.pg-save-btn:hover{color:#ff2d78;border-color:rgba(255,45,120,0.5);background:rgba(255,45,120,0.08)}' +
      '.pg-save-btn:active{transform:scale(0.9)}' +
      '.pg-save-btn.saved{color:#ff2d78;border-color:rgba(255,45,120,0.6);background:rgba(255,45,120,0.12)}' +
      '.pg-save-btn.saved svg{fill:#ff2d78;stroke:#ff2d78;filter:drop-shadow(0 0 5px rgba(255,45,120,0.7))}';
    var el = document.createElement('style');
    el.id = 'pg-save-styles';
    el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  }

  // Heart button markup for a given festival id, baked with current state so a
  // re-render shows the right heart immediately.
  function buttonHtml(festId) {
    var id = String(festId == null ? '' : festId);
    var on = _saved.has(id);
    return '<button type="button" class="pg-save-btn' + (on ? ' saved' : '') + '"' +
      ' data-fest-id="' + escapeAttr(id) + '"' +
      ' aria-pressed="' + (on ? 'true' : 'false') + '"' +
      ' aria-label="' + (on ? 'Saved — tap to remove' : 'Save festival') + '"' +
      ' title="' + (on ? 'Saved' : 'Save festival') + '">' + HEART_SVG + '</button>';
  }

  // Sync every heart in the document to the current saved set. Also fills the
  // icon into any empty (static) button so detail pages need only the wrapper.
  function markAll() {
    try {
      var btns = document.querySelectorAll('.pg-save-btn');
      Array.prototype.forEach.call(btns, function (btn) {
        if (!btn.querySelector('svg')) btn.innerHTML = HEART_SVG;
        var id = btn.getAttribute('data-fest-id');
        var on = !!(id && _saved.has(id));
        btn.classList.toggle('saved', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.setAttribute('aria-label', on ? 'Saved — tap to remove' : 'Save festival');
        btn.setAttribute('title', on ? 'Saved' : 'Save festival');
      });
    } catch (e) {
      console.error('[saves.js] markAll', e);
    }
  }

  // Toggle a single button's save. Logged out -> Google sign-in (same OAuth
  // flow as auth.js). Logged in -> insert/delete the row and flip every copy
  // of that festival's heart in the DOM.
  function onToggle(btn) {
    var sb = client();
    if (!sb) return;
    var id = btn.getAttribute('data-fest-id');
    if (!id) return;

    (async function () {
      try {
        var res = await sb.auth.getSession();
        var session = (res && res.data) ? res.data.session : null;

        if (!session || !session.user) {
          sb.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.href }
          });
          return;
        }

        if (_saved.has(id)) {
          var del = await sb.from('saved_festivals').delete()
            .eq('user_id', session.user.id)
            .eq('festival_id', id);
          if (del.error) throw del.error;
          _saved.delete(id);
        } else {
          var ins = await sb.from('saved_festivals')
            .insert({ user_id: session.user.id, festival_id: id });
          if (ins.error) throw ins.error;
          _saved.add(id);
        }
        markAll();
      } catch (e) {
        console.error('[saves.js] toggle', e);
      }
    })();
  }

  // Fetch the signed-in user's saves once (RLS scopes to their own rows), then
  // re-mark the hearts. Clears the set when signed out.
  function loadSaves() {
    var sb = client();
    if (!sb) return;

    (async function () {
      try {
        var res = await sb.auth.getSession();
        var session = (res && res.data) ? res.data.session : null;
        if (session && session.user) {
          var q = await sb.from('saved_festivals').select('festival_id');
          if (q.error) throw q.error;
          _saved = new Set((q.data || []).map(function (r) { return r.festival_id; }));
        } else {
          _saved = new Set();
        }
      } catch (e) {
        console.error('[saves.js] loadSaves', e);
      }
      markAll();
    })();
  }

  // Delegated, capture-phase click handler. Capture + stopPropagation keeps the
  // heart from triggering the surrounding card's click-through navigation.
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('.pg-save-btn') : null;
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    onToggle(btn);
  }, true);

  // auth.js creates window.sb inside its own init, which may run after us.
  // Retry briefly until it exists, then load saves + watch auth changes.
  function whenSbReady(cb) {
    var tries = 0;
    (function attempt() {
      if (window.sb) { cb(window.sb); return; }
      if (tries++ < 100) setTimeout(attempt, 50);
    })();
  }

  function start() {
    ensureStyles();
    markAll();  // fill icons / initial state on any already-rendered buttons
    whenSbReady(function (sb) {
      loadSaves();
      try {
        // Re-fetch + re-render the hearts on sign in / sign out / token refresh.
        sb.auth.onAuthStateChange(function () { loadSaves(); });
      } catch (e) {
        console.error('[saves.js] onAuthStateChange', e);
      }
    });
  }

  window.PlurSaves = {
    buttonHtml: buttonHtml,
    markAll: markAll,
    isSaved: isSaved
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
