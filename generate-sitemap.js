#!/usr/bin/env node
/**
 * generate-sitemap.js
 *
 * Builds sitemap.xml from js/data.js, and (via build-posts.js) one pre-built
 * page per published blog post at /posts/<id>/index.html.
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
const { buildPosts, postPath } = require('./build-posts.js');
const { buildSchedule } = require('./build-schedule.js');

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
addUrl('/history',         'weekly',  '0.7'); // History of Rave timeline
addUrl('/partners',        'monthly', '0.6');
addUrl('/brand-partners', 'weekly', '0.7'); // Brand partners + discount codes
addUrl('/privacy',         'yearly',  '0.3');
addUrl('/safety',          'monthly', '0.6');
addUrl('/terms',           'yearly',  '0.3');
addUrl('/social',          'weekly',  '0.7'); // Creators page
addUrl('/submit-article',  'monthly', '0.5');

// --- Published blog posts (pre-built pages) ---------------------------------
// 1) Tell blog-post.html which posts have a pre-built page, so old ?id= links
//    forward to them. 2) Build the pages. 3) List the new URLs in the sitemap.
const builtIds = (data.blogPosts || []).filter(p => p && p.published && /^[a-z0-9-]+$/.test(p.id)).map(p => p.id);
(function fillStaticList() {
  const fp = path.join(__dirname, 'blog-post.html');
  const src = fs.readFileSync(fp, 'utf8');
  const re = /(<!-- GEN:STATIC-POSTS -->)[\s\S]*?(<!-- \/GEN:STATIC-POSTS -->)/;
  if (!re.test(src)) { console.log('Marker GEN:STATIC-POSTS not found in blog-post.html'); return; }
  const list = '<script>window.PLURGASM_STATIC_POSTS=' + JSON.stringify(builtIds).replace(/</g, '\\u003c') + ';</script>';
  fs.writeFileSync(fp, src.replace(re, (m, a, b) => a + list + b), 'utf8');
})();
const built = buildPosts(__dirname, data);
const sched = buildSchedule(__dirname, data);
console.log('Built 2027 schedule on /calendar: ' + sched.festivals + ' festivals, ' + sched.schemaEvents + ' with Event schema.');
console.log('Built ' + built.length + ' post pages in /posts/.');
built.forEach(id => addUrl(postPath(id), 'monthly', '0.7'));

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


// --- Crawlable internal-link blocks (real <a href>, no JS needed) ----------
// Fills <!-- GEN:NAME --> ... <!-- /GEN:NAME --> regions in index.html and
// blog.html so posts + festival detail pages are reachable via plain anchors.
function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function fillBlock(file, name, html) {
  const fp = path.join(__dirname, file);
  const src = fs.readFileSync(fp, 'utf8');
  const re = new RegExp('(<!-- GEN:' + name + ' -->)[\\s\\S]*?(<!-- /GEN:' + name + ' -->)');
  if (!re.test(src)) { console.log('Marker GEN:' + name + ' not found in ' + file); return; }
  fs.writeFileSync(fp, src.replace(re, (m, a, b) => a + html + b), 'utf8');
}
const pubPosts = (data.blogPosts || []).filter(p => p && p.published)
  .sort((a, b) => new Date(b.date) - new Date(a.date));
const postLi = p => '<li><a href="' + postPath(p.id) + '">' + escHtml(p.title) + '</a></li>';
const festLi = f => '<li><a href="/' + f.detailPage.replace(/^\/+/, '').replace(/\.html$/, '') + '">' +
  escHtml(f.name) + '</a></li>';
const guideFests = (data.festivals || []).filter(f => f && f.detailPage)
  .sort((a, b) => String(a.sortDate).localeCompare(String(b.sortDate)));
fillBlock('index.html', 'FEST-GUIDES', '<ul>' + guideFests.map(festLi).join('') + '</ul>');
fillBlock('index.html', 'HOME-POSTS',  '<ul>' + pubPosts.slice(5, 15).map(postLi).join('') + '</ul>');
fillBlock('blog.html',  'BLOG-ALL',    '<ul class="crawl-static" style="list-style:none;padding:0;">' + pubPosts.map(postLi).join('') + '</ul>');

// llms.txt (plain markdown for AI crawlers): newest-first list of every published post.
(function fillLlms() {
  const fp = path.join(__dirname, 'llms.txt');
  if (!fs.existsSync(fp)) return;
  const src = fs.readFileSync(fp, 'utf8');
  const re = /(<!-- GEN:LLMS-POSTS -->)[\s\S]*?(<!-- \/GEN:LLMS-POSTS -->)/;
  if (!re.test(src)) { console.log('Marker GEN:LLMS-POSTS not found in llms.txt'); return; }
  const md = s => String(s || '').replace(/<[^>]*>/g, '').replace(/[\[\]]/g, '').replace(/\s+/g, ' ').trim();
  const list = pubPosts.map(p => '- [' + md(p.title) + '](https://plurgasm.com' + postPath(p.id) + '): ' + md(p.excerpt)).join('\n');
  fs.writeFileSync(fp, src.replace(re, (m, a, b) => a + '\n' + list + '\n' + b), 'utf8');
})();
console.log('Filled crawlable link blocks (' + guideFests.length + ' festival guides, ' + pubPosts.length + ' posts).');

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
