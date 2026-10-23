/* PLURGASM shared festival map — single source of truth for the Leaflet map used by
   calendar.html (all festivals) and blog-post.html (embedded region maps).
   Requires Leaflet (window.L) to be loaded first. */
(function () {
  'use strict';

  var ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/';

  function defaultIsPast(f) {
    var today = new Date().toISOString().slice(0, 10);
    return (f.endDate || f.sortDate) < today;
  }

  function defaultCalUrl(f) {
    try {
      var start = f.sortDate.replace(/-/g, '');
      var end = new Date(f.endDate + 'T00:00:00Z');
      end.setUTCDate(end.getUTCDate() + 1);
      var endStr = end.toISOString().slice(0, 10).replace(/-/g, '');
      var lineup = (f.headliners && f.headliners.length) ? 'Lineup: ' + f.headliners.join(', ') + '\n\n' : '';
      var details = encodeURIComponent(lineup + (f.desc || '') + (f.url ? '\n\nTickets: ' + f.url : ''));
      return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(f.name) +
             '&dates=' + start + '/' + endStr + '&details=' + details + '&location=' + encodeURIComponent(f.location || '');
    } catch (e) { return null; }
  }

  // Valid numeric coords only (rejects null/undefined/''/NaN).
  function hasCoords(f) {
    return typeof f.lat === 'number' && isFinite(f.lat) && typeof f.lng === 'number' && isFinite(f.lng);
  }

  function buildFestPopup(f, distMiles, opts) {
    var past = (opts.isPast || defaultIsPast)(f);
    var cal = (opts.calUrl || defaultCalUrl)(f);

    var distHtml = distMiles != null ? '<div class="mp-dist">' + distMiles + ' mi away</div>' : '';

    var genresHtml = (f.genres && f.genres.length)
      ? '<div class="cal-genres mp-genres">' + f.genres.slice(0, 4).map(function (g) { return '<span class="cal-genre">' + g + '</span>'; }).join('') + '</div>'
      : '';

    var headlineHtml = (f.headliners && f.headliners.length)
      ? '<div class="mp-headliners"><span>Lineup</span> ' + f.headliners.slice(0, 5).join(', ') + (f.headliners.length > 5 ? ' +more' : '') + '</div>'
      : '';

    var ticketBtn = (f.url && f.url !== '#')
      ? '<a class="mp-btn mp-btn-primary" href="' + f.url + '" target="_blank" rel="noopener">Get Tickets →</a>' : '';
    var calBtn = (!past && cal)
      ? '<a class="mp-btn mp-btn-ghost" href="' + cal + '" target="_blank" rel="noopener">+ Google Calendar</a>' : '';
    var actionsHtml = (ticketBtn || calBtn) ? '<div class="mp-actions">' + ticketBtn + calBtn + '</div>' : '';

    var pastNote = past ? '<div class="mp-past">Past event</div>' : '';
    var detailLink = f.detailPage ? '<a class="mp-detail" href="/' + f.detailPage.replace(/^\//, '') + '">View details →</a>' : '';

    return '<div class="map-popup">' +
      '<div class="mp-name">' + f.name + '</div>' +
      '<div class="mp-dates">' + f.dates + '</div>' +
      '<div class="mp-loc"><img src="/images/icons/icon-pin.webp" class="icon-pin-inline" alt="location"> ' + f.location + '</div>' +
      distHtml + genresHtml + headlineHtml + actionsHtml + pastNote + detailLink +
      '</div>';
  }

  /* Create the Leaflet map in `container` (element or id). Returns a handle
     { map, markerGroup, render(list) } so callers can re-render on filter changes.
     options: center, zoom, maxBounds, scrollWheelZoom, fitToMarkers, fitPadding,
              fitMaxZoom, isPast(f), calUrl(f). */
  function createFestivalMap(container, options) {
    options = options || {};
    var el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el || !window.L) return null;

    var map = L.map(el, {
      scrollWheelZoom: options.scrollWheelZoom !== false,
      dragging: options.dragging !== false
    }).setView(options.center || [39.8, -98.6], options.zoom || 4);
    if (options.maxBounds) map.setMaxBounds(options.maxBounds);

    // CARTO's free basemap tiles now return an "API KEY REQUIRED" placeholder,
    // so use Esri's keyless Dark Gray canvas (base + labels overlay) instead.
    L.tileLayer(ESRI + 'World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16
    }).addTo(map);
    L.tileLayer(ESRI + 'World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16 }).addTo(map);

    var markerGroup = L.layerGroup().addTo(map);
    var isPast = options.isPast || defaultIsPast;

    function render(list) {
      map.invalidateSize();
      markerGroup.clearLayers();
      var pts = [];
      (list || []).forEach(function (f) {
        if (!hasCoords(f)) {
          console.warn('[PLURGASM map] Missing lat/lng:', f.name, '(id:', f.id + ')');
          return;
        }
        var past = isPast(f);
        var icon = L.divIcon({
          className: '',
          html: past
            ? '<div style="width:10px;height:10px;border-radius:50%;background:#666;opacity:0.45;"></div>'
            : '<img src="/images/icons/icon-pin.webp" alt="" style="width:16px;height:22px;object-fit:contain;filter:drop-shadow(0 0 5px rgba(182,77,255,0.7));">',
          iconSize: past ? [10, 10] : [16, 22],
          iconAnchor: past ? [5, 5] : [8, 22]
        });
        var marker = L.marker([f.lat, f.lng], { icon: icon });
        marker.bindPopup(buildFestPopup(f, null, options));
        marker.bindTooltip(
          '<strong>' + f.name + '</strong><br><span style="font-size:11px;opacity:0.8;">' + f.dates + '</span>',
          { direction: 'top', className: 'map-pin-tooltip' }
        );
        marker.addTo(markerGroup);
        pts.push([f.lat, f.lng]);
      });
      if (options.fitToMarkers && pts.length) {
        map.fitBounds(pts, { padding: options.fitPadding || [40, 40], maxZoom: options.fitMaxZoom || 8 });
      }
    }

    return { map: map, markerGroup: markerGroup, render: render };
  }

  /* One-shot helper: build a map into `container` plotting `festivalList`. */
  function buildFestivalMap(container, festivalList, options) {
    var handle = createFestivalMap(container, options);
    if (handle) handle.render(festivalList);
    return handle;
  }

  window.createFestivalMap = createFestivalMap;
  window.buildFestivalMap = buildFestivalMap;
})();
