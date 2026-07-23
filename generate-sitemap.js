#!/usr/bin/env node
/**
 * generate-sitemap.js
 *
 * Builds sitemap.xml from js/data.js.
 *
 * data.js is a browser file — it assigns to window.PLURGASM_DATA and also
 * references a bare `PLURGASM_DATA` global in a few spots. Pointing `window`
 * at `global` makes `window.X = ...` create a real global, so both
 * `window.PLURGASM_DATA` and bare `PLURGASM_DATA` resolve the same way the
 * browser resolves them.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const SITE = 'https://plurgasm.com';

// --- Shim browser globals so data.js loads under Node ---------------------
global.window = global;
require('./js/data.js');

const data = global.PLURGASM_DATA || {};

// --- Helpers --------------------------------------------------------------
function xmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// today's date as YYYY-MM-DD (UTC)
const today = new Date().toISOString().slice(0, 10);

const urls = [];
function addUrl(loc, changefreq, priority) {
  urls.push({ loc: SITE + loc, lastmod: today, changefreq, priority });
}

// --- Static pages (admin.html intentionally excluded) ---------------------
addUrl('/',                'daily',   '1.0');
addUrl('/blog',            'daily',   '0.8');
addUrl('/calendar',        'weekly',  '0.8');
addUrl('/partners',        'monthly', '0.6');
addUrl('/privacy',         'yearly',  '0.3');
addUrl('/safety',          'monthly', '0.6');
addUrl('/terms',           'yearly',  '0.3');
addUrl('/social',          'weekly',  '0.7'); // Creators page
addUrl('/submit-article',  'monthly', '0.5');

// --- Published blog posts -------------------------------------------------
(data.blogPosts || [])
  .filter(post => post && post.published)
  .forEach(post => addUrl('/blog-post?id=' + post.id, 'monthly', '0.7'));

// --- Festivals with a dedicated detail page -------------------------------
(data.festivals || [])
  .filter(fest => fest && fest.detailPage)
  .forEach(fest => {
    const page = fest.detailPage
      .replace(/^\/+/, '')      // normalize leading slash
      .replace(/\.html$/, '');  // extensionless
    addUrl('/' + page, 'weekly', '0.7');
  });

// --- Artist profiles ------------------------------------------------------
(data.artists || [])
  .filter(artist => artist && artist.id)
  .forEach(artist => addUrl('/artist?id=' + artist.id, 'weekly', '0.7'));

// --- Categories -----------------------------------------------------------
(data.categories || [])
  .filter(cat => cat && cat.id)
  .forEach(cat => addUrl('/category?cat=' + cat.id, 'weekly', '0.6'));

// --- Build XML ------------------------------------------------------------
const body = urls.map(u => {
  return [
    '  <url>',
    '    <loc>' + xmlEscape(u.loc) + '</loc>',
    '    <lastmod>' + u.lastmod + '</lastmod>',
    '    <changefreq>' + u.changefreq + '</changefreq>',
    '    <priority>' + u.priority + '</priority>',
    '  </url>'
  ].join('\n');
}).join('\n');

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  body + '\n' +
  '</urlset>\n';

// --- Write sitemap.xml ----------------------------------------------------
const sitemapPath = path.join(__dirname, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log('Wrote ' + sitemapPath + ' with ' + urls.length + ' URLs.');

// --- Ensure robots.txt references the sitemap -----------------------------
const robotsPath = path.join(__dirname, 'robots.txt');
const sitemapLine = 'Sitemap: ' + SITE + '/sitemap.xml';

let robots = '';
if (fs.existsSync(robotsPath)) {
  robots = fs.readFileSync(robotsPath, 'utf8');
}

if (!/^\s*Sitemap:\s*\S/im.test(robots)) {
  if (robots.trim() === '') {
    robots = 'User-agent: *\nAllow: /\n\n' + sitemapLine + '\n';
  } else {
    robots = robots.replace(/\s*$/, '') + '\n' + sitemapLine + '\n';
  }
  fs.writeFileSync(robotsPath, robots, 'utf8');
  console.log('Updated robots.txt with sitemap reference.');
} else {
  console.log('robots.txt already references a sitemap.');
}
