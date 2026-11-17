/**
 * build-schedule.js — writes the crawlable "2027 Rave Schedule" into
 * calendar.html, built from js/data.js festivals.
 *
 * Called by generate-sitemap.js (so the sitemap Action rebuilds it on every
 * data.js push). It fills two regions in calendar.html:
 *   <!-- GEN:SCHEDULE-SCHEMA -->  Event JSON-LD (confirmed dates only) in <head>
 *   <!-- GEN:SCHEDULE -->         month-by-month tables + quick lists in <body>
 * Never hand-edit inside those markers — they're overwritten.
 *
 * Why: /calendar ranks for "rave schedule 2027", but the interactive calendar
 * is drawn by JS, so the raw HTML search engines read had almost no festivals.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE = 'https://plurgasm.com';
const YEAR = 2027;
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const REGIONS = [
  ['northeast', 'Northeast'], ['southeast', 'Southeast'], ['midwest', 'Midwest'],
  ['west', 'West Coast'], ['southwest', 'Southwest'], ['canada', 'Canada'], ['international', 'International']
];
const BASS = new Set(['Bass', 'Dubstep', 'Riddim', 'DnB']);

function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// Festival names stay as stored (ALL CAPS is the site convention).
const nice = name => String(name);
function status(f) {
  if (/TBD/i.test(f.dates)) return 'tbd';
  if (/\(est\)/i.test(f.dates)) return 'est';
  return 'ok';
}
function cleanDates(f) { return String(f.dates).replace(/\s*\(est\)\s*/i, '').trim(); }
function festHref(root, f) {
  if (f.detailPage) {
    const rel = f.detailPage.replace(/^\/+/, '').replace(/\.html$/, '');
    if (fs.existsSync(path.join(root, rel + '.html'))) return '/' + rel;
  }
  return f.url || '';
}
function link(root, f) {
  const href = festHref(root, f);
  const ext = /^https?:/i.test(href);
  return href
    ? `<a href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${esc(nice(f.name))}</a>`
    : esc(nice(f.name));
}
// "Last updated" = date data.js last changed (stable between runs, so the
// generator doesn't create a diff every day). Falls back to today.
function lastUpdated(root) {
  try {
    const d = execSync('git log -1 --format=%cs -- js/data.js', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  } catch (e) { /* no git */ }
  return new Date().toISOString().slice(0, 10);
}
function prettyDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return MONTHS[m - 1] + ' ' + d + ', ' + y;
}

function eventsFor(data) {
  const start = YEAR + '-01-01', end = (YEAR + 1) + '-01-01';
  return (data.festivals || [])
    .filter(f => f && f.sortDate && f.endDate && f.endDate >= start && f.sortDate < end)
    .sort((a, b) => a.sortDate.localeCompare(b.sortDate) || a.name.localeCompare(b.name));
}

function buildSchema(root, events) {
  const graph = events.filter(f => status(f) === 'ok').map(f => {
    const ev = {
      '@type': 'Festival',
      name: nice(f.name) + ' ' + f.sortDate.slice(0, 4),
      startDate: f.sortDate,
      endDate: f.endDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: f.location, address: f.location },
      description: (f.desc || f.tagline || '').slice(0, 300),
      image: [f.image ? (/^https?:/.test(f.image) ? f.image : SITE + '/' + f.image.replace(/^\/+/, '')) : SITE + '/images/og-default.webp'],
      url: /^https?:/.test(festHref(root, f)) ? festHref(root, f) : SITE + festHref(root, f)
    };
    if (f.organizer) ev.organizer = { '@type': 'Organization', name: f.organizer };
    if (f.headliners && f.headliners.length) ev.performer = f.headliners.slice(0, 8).map(n => ({ '@type': 'MusicGroup', name: n }));
    return ev;
  });
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return { html: '<script type="application/ld+json">' + json + '</script>', count: graph.length };
}

function buildBody(root, data, events) {
  const updated = lastUpdated(root);
  const byMonth = {};
  events.forEach(f => {
    const iso = f.sortDate < YEAR + '-01-01' ? YEAR + '-01-01' : f.sortDate;   // NYE etc. -> January
    const m = Number(iso.split('-')[1]) - 1;
    (byMonth[m] = byMonth[m] || []).push(f);
  });
  const confirmed = events.filter(f => status(f) === 'ok').length;
  const badge = f => ({ ok: '<span class="sch-st sch-ok">Confirmed</span>', est: '<span class="sch-st sch-est">Expected</span>', tbd: '<span class="sch-st sch-tbd">Dates TBA</span>' })[status(f)];

  const monthsHtml = Object.keys(byMonth).map(Number).sort((a, b) => a - b).map(m => `
  <h3 id="schedule-${MONTHS[m].toLowerCase()}">${MONTHS[m]}</h3>
  <table class="sch-table">
    <thead><tr><th>Dates</th><th>Festival</th><th>Location</th><th>Genres</th><th>Status</th></tr></thead>
    <tbody>${byMonth[m].map(f => `
      <tr><td data-l="Dates">${esc(cleanDates(f))}</td><td data-l="Festival">${link(root, f)}</td><td data-l="Location">${esc(f.location)}</td><td data-l="Genres">${esc((f.genres || []).join(', '))}</td><td data-l="Status">${badge(f)}</td></tr>`).join('')}
    </tbody>
  </table>`).join('');

  const bass = events.filter(f => (f.genres || []).some(g => BASS.has(g)));
  const regionsHtml = REGIONS.map(([id, label]) => {
    const list = events.filter(f => f.region === id);
    if (!list.length) return '';
    return `<li><strong>${label}:</strong> ${list.map(f => link(root, f) + ' <span class="sch-d">(' + esc(cleanDates(f)) + ')</span>').join(', ')}</li>`;
  }).join('');

  const skipping = (data.festivals || []).filter(f => f.sortDate >= (YEAR + 1) + '-01-01' && /No \d{4} edition|no \d{4}/i.test(f.dates + ' ' + (f.warning || '')));
  const skipHtml = skipping.length
    ? `<p class="sch-note"><strong>Not happening in ${YEAR}:</strong> ${skipping.map(f => esc(nice(f.name)) + (f.warning ? ' (' + esc(f.warning.replace(/\.$/, '')) + ')' : '')).join('; ')}.</p>`
    : '';

  return `
<section class="sch" id="rave-schedule-${YEAR}" aria-labelledby="sch-title">
  <h2 id="sch-title" class="sch-title">${YEAR} Rave Schedule: Every Festival by Month</h2>
  <p class="sch-updated">Last updated <time datetime="${updated}">${prettyDate(updated)}</time> · ${events.length} festivals · ${confirmed} with confirmed dates</p>
  <p class="sch-intro">Here is the full ${YEAR} rave and festival schedule, month by month. <strong>Confirmed</strong> means the festival has announced its ${YEAR} dates. <strong>Expected</strong> means dates are not official yet, so we list the weekend it usually lands on. Use the calendar above to filter by region, genre or distance, or tap a festival for the full guide.</p>
  <div class="sch-jump">${Object.keys(byMonth).map(Number).sort((a, b) => a - b).map(m => `<a href="#schedule-${MONTHS[m].toLowerCase()}">${MONTHS[m].slice(0, 3)}</a>`).join('')}</div>
  ${monthsHtml}
  ${skipHtml}

  <h3 id="bass-schedule-${YEAR}">${YEAR} Bass &amp; Dubstep Festival Schedule</h3>
  <ul class="sch-list">${bass.map(f => `<li>${link(root, f)} <span class="sch-d">${esc(cleanDates(f))} · ${esc(f.location)}</span></li>`).join('')}</ul>

  <h3 id="schedule-by-region-${YEAR}">${YEAR} Rave Schedule by Region</h3>
  <ul class="sch-list sch-regions">${regionsHtml}</ul>

  <p class="sch-note">Want the story behind the dates? Read our <a href="/posts/us-rave-festival-season-2027-dates/">${YEAR} festival season guide</a>. Know a date we are missing? <a href="/submit">Submit an event</a>.</p>
</section>`;
}

function fill(src, name, inner) {
  const re = new RegExp('(<!-- GEN:' + name + ' -->)[\\s\\S]*?(<!-- /GEN:' + name + ' -->)');
  if (!re.test(src)) throw new Error('build-schedule: marker GEN:' + name + ' not found in calendar.html');
  return src.replace(re, (m, a, b) => a + inner + b);
}

/** Fill calendar.html. Returns { festivals, schemaEvents }. */
function buildSchedule(root, data) {
  const fp = path.join(root, 'calendar.html');
  const events = eventsFor(data);
  const schema = buildSchema(root, events);
  let src = fs.readFileSync(fp, 'utf8');
  src = fill(src, 'SCHEDULE-SCHEMA', schema.html);
  src = fill(src, 'SCHEDULE', buildBody(root, data, events));
  fs.writeFileSync(fp, src, 'utf8');
  return { festivals: events.length, schemaEvents: schema.count };
}

module.exports = { buildSchedule };
