/* festival.js — festival detail pages: live "find an artist" filter.
   Highlights matching .fl-name entries and dims the rest as you type.
   No dependencies; no-ops if the search input isn't on the page. */
(function () {
  'use strict';
  try {
    var input = document.getElementById('artist-search');
    if (!input) return;
    var countEl = document.getElementById('artist-search-count');
    var names = Array.prototype.slice.call(document.querySelectorAll('.fl-name'));
    if (!names.length) return;

    // fold case + diacritics so "tiesto" finds "Tiësto"
    var COMBINING = new RegExp('[\\u0300-\\u036f]', 'g');
    function norm(s) {
      s = s.toLowerCase();
      try { s = s.normalize('NFD').replace(COMBINING, ''); } catch (e) {}
      // stroked letters don't decompose under NFD, so "laszewo" finds "Łaszewo"
      s = s.replace(/ł/g, 'l').replace(/ø/g, 'o').replace(/đ/g, 'd');
      return s;
    }
    var haystack = names.map(function (el) { return norm(el.textContent); });

    input.addEventListener('input', function () {
      try {
        var q = norm(input.value.trim());
        if (!q) {
          for (var i = 0; i < names.length; i++) {
            names[i].classList.remove('is-hit');
            names[i].classList.remove('is-dim');
          }
          if (countEl) countEl.textContent = '';
          return;
        }
        var hits = 0;
        for (var j = 0; j < names.length; j++) {
          var hit = haystack[j].indexOf(q) !== -1;
          names[j].classList.toggle('is-hit', hit);
          names[j].classList.toggle('is-dim', !hit);
          if (hit) hits++;
        }
        if (countEl) {
          countEl.textContent = hits === 0 ? 'NO MATCHES' : hits + (hits === 1 ? ' MATCH' : ' MATCHES');
        }
      } catch (e) {}
    });
  } catch (e) {}
})();
