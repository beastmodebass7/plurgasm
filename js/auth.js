/* auth.js — Supabase Google login (Pass 1: auth only, no voting yet).
   Renders a sign-in / sign-out control into the #auth-slot that nav.js
   creates in the desktop header. Everything is wrapped in try/catch so an
   auth failure here never breaks the rest of the page. */
(function () {
  'use strict';

  var SUPABASE_URL = "https://xrbguuwgajrohgvgfggh.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_wLIiPFws5jDmiPH8xcZ-jQ_KG1Zfhx6";

  var sb = null;

  function findSlot() {
    return document.getElementById('auth-slot');
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Official Google "G" logo, used inside the sign-in button.
  var GOOGLE_G_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">' +
      '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
      '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
      '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
      '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>' +
    '</svg>';

  // Fallback avatar when the Google account has no photo: a simple person/head
  // glyph that inherits the surrounding text color via currentColor.
  var PERSON_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">' +
      '<path fill="currentColor" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.42 0-8 2.69-8 6v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-3.31-3.58-6-8-6z"/>' +
    '</svg>';

  // Inject auth control styles once. Kept self-contained here so the look
  // doesn't depend on external CSS being loaded for the nav slot.
  function ensureStyles() {
    if (document.getElementById('auth-styles')) return;
    var css =
      '#auth-slot{display:flex;align-items:center;gap:10px}' +
      // Signed-out: official Google light "Sign in with Google" button.
      '.gsi-btn{display:inline-flex;align-items:center;gap:10px;' +
        'background:#ffffff;color:#1f1f1f;border:1px solid #747775;border-radius:6px;' +
        'padding:8px 14px;font-family:Roboto,system-ui,-apple-system,"Segoe UI",sans-serif;' +
        'font-size:14px;font-weight:500;line-height:1;cursor:pointer;white-space:nowrap;' +
        'transition:background-color .15s ease,box-shadow .15s ease}' +
      '.gsi-btn:hover{background:#f7f8f8;box-shadow:0 1px 2px rgba(0,0,0,.18)}' +
      '.gsi-btn svg{display:block;flex:0 0 auto}' +
      // Signed-in: a clickable avatar + name that links to /profile, plus a
      // tidy sign-out link kept visible alongside it.
      '.auth-profile{display:inline-flex;align-items:center;gap:8px;color:#f0eeff;' +
        'font-family:"Chakra Petch",system-ui,sans-serif;font-size:14px;' +
        'text-decoration:none;cursor:pointer;padding:3px 8px 3px 4px;border-radius:999px;' +
        'border:1px solid transparent;transition:background-color .15s ease,border-color .15s ease}' +
      '.auth-profile:hover,.auth-profile:focus-visible{background:rgba(0,229,255,.08);' +
        'border-color:rgba(0,229,255,.35);outline:none}' +
      '.auth-profile:hover .auth-avatar{border-color:rgba(0,229,255,.6)}' +
      '.auth-avatar{width:28px;height:28px;border-radius:50%;object-fit:cover;' +
        'border:1px solid rgba(240,238,255,.25);flex:0 0 auto;transition:border-color .15s ease}' +
      // Default (no-photo) avatar: same circle, centered person glyph.
      '.auth-avatar-default{display:inline-flex;align-items:center;justify-content:center;' +
        'background:rgba(240,238,255,.08);color:rgba(240,238,255,.6)}' +
      '.auth-avatar-default svg{width:18px;height:18px;display:block}' +
      '.auth-signout{background:none;border:0;padding:0 2px;cursor:pointer;' +
        'color:rgba(240,238,255,.6);font-family:"DM Mono",monospace;font-size:12px;' +
        'text-transform:uppercase;letter-spacing:.04em;transition:color .15s ease}' +
      '.auth-signout:hover{color:#00e5ff}';
    var el = document.createElement('style');
    el.id = 'auth-styles';
    el.textContent = css;
    document.head.appendChild(el);
  }

  function signIn() {
    try {
      sb.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.href }
      });
    } catch (e) { console.warn('[auth.js] signIn', e); }
  }

  function signOut() {
    try {
      sb.auth.signOut();
    } catch (e) { console.warn('[auth.js] signOut', e); }
  }

  function render(session) {
    try {
      var slot = findSlot();
      if (!slot) return;
      ensureStyles();
      if (session && session.user) {
        var u = session.user;
        var meta = u.user_metadata || {};
        var name = meta.full_name || meta.name || u.email || 'Account';
        var avatar = meta.avatar_url
          ? '<img class="auth-avatar" src="' + escapeHtml(meta.avatar_url) + '" alt="" ' +
            'referrerpolicy="no-referrer">'
          : '<span class="auth-avatar auth-avatar-default" aria-hidden="true">' + PERSON_SVG + '</span>';
        slot.innerHTML =
          '<a class="auth-profile" href="/profile" title="Your profile" aria-label="Your profile">' +
            avatar + '<span class="auth-name">' + escapeHtml(name) + '</span>' +
          '</a>' +
          '<button type="button" class="auth-signout" id="auth-signout">Sign out</button>';
        var out = document.getElementById('auth-signout');
        if (out) out.addEventListener('click', signOut);
      } else {
        slot.innerHTML =
          '<button type="button" class="gsi-btn" id="auth-signin">' +
            GOOGLE_G_SVG +
            '<span>Sign in with Google</span>' +
          '</button>';
        var inn = document.getElementById('auth-signin');
        if (inn) inn.addEventListener('click', signIn);
      }
    } catch (e) {
      console.warn('[auth.js] render', e);
    }
  }

  // nav.js fills #auth-slot inside its own DOMContentLoaded handler, which may
  // run after this script. Retry briefly until the slot exists, then render.
  function renderWhenReady(session) {
    var tries = 0;
    (function attempt() {
      if (findSlot()) { render(session); return; }
      if (tries++ < 60) setTimeout(attempt, 50);
    })();
  }

  function start() {
    try {
      if (typeof supabase === 'undefined' || !supabase.createClient) {
        console.warn('[auth.js] supabase library not loaded');
        return;
      }
      sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      // Expose the client site-wide so other scripts (e.g. the creators
      // directory voting system in main.js) can reuse this single instance.
      window.sb = sb;

      sb.auth.getSession().then(function (res) {
        var session = (res && res.data) ? res.data.session : null;
        renderWhenReady(session);
      }).catch(function (e) { console.warn('[auth.js] getSession', e); });

      // Re-render whenever login state changes (sign in, sign out, token refresh).
      sb.auth.onAuthStateChange(function (_event, session) {
        renderWhenReady(session);
      });
    } catch (e) {
      console.warn('[auth.js]', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
