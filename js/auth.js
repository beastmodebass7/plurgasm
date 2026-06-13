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
      if (session && session.user) {
        var u = session.user;
        var meta = u.user_metadata || {};
        var name = meta.full_name || meta.name || u.email || 'Account';
        slot.innerHTML =
          '<span class="auth-user">' + escapeHtml(name) + '</span>' +
          '<button type="button" class="auth-btn auth-signout" id="auth-signout">Sign out</button>';
        var out = document.getElementById('auth-signout');
        if (out) out.addEventListener('click', signOut);
      } else {
        slot.innerHTML =
          '<button type="button" class="auth-btn auth-signin" id="auth-signin">Sign in with Google</button>';
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
