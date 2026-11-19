#!/usr/bin/env node
/**
 * ping-indexnow.js — tells IndexNow search engines (Bing, Yandex, Seznam,
 * Naver, …) which plurgasm.com pages changed, so they re-crawl right away
 * instead of waiting.
 *
 * Run by .github/workflows/sitemap.yml after every push to main:
 *   node ping-indexnow.js <before-sha>   -> pages changed since <before-sha>
 *   node ping-indexnow.js --all          -> every URL in sitemap.xml (manual run)
 *   add --dry-run to print the URLs without sending.
 *
 * Rules:
 * - Only URLs listed in sitemap.xml are sent (so noindex pages like /profile
 *   and /admin never are), plus pages of blog posts that were just deleted.
 * - The key is the <32 hex>.txt file in the repo root (its content = its name).
 *   Never delete or rename that file, or IndexNow will reject every ping.
 * - Never fails the workflow: network or API errors are logged, exit code 0.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const SITE = 'https://plurgasm.com';
const HOST = 'plurgasm.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
// When js/data.js changes, these pages show different lists (festivals, posts)
// even though their HTML files didn't change.
const DATA_PAGES = ['/', '/calendar', '/blog'];

function findKey() {
  const f = fs.readdirSync(ROOT).find(n => /^[0-9a-f]{32}\.txt$/.test(n));
  if (!f) return null;
  const key = fs.readFileSync(path.join(ROOT, f), 'utf8').trim();
  return key === f.replace('.txt', '') ? key : null;
}

function sitemapUrls() {
  const xml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  return new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(/&amp;/g, '&')));
}

// Repo file -> public URL (GitHub Pages clean URLs, matching sitemap.xml).
function fileToUrl(file) {
  let m;
  if (file === 'index.html') return SITE + '/';
  if ((m = file.match(/^posts\/([a-z0-9-]+)\/index\.html$/))) return SITE + '/posts/' + m[1] + '/';
  if ((m = file.match(/^festivals\/([a-z0-9-]+)\.html$/))) return SITE + '/festivals/' + m[1];
  if ((m = file.match(/^([a-z0-9-]+)\.html$/))) return SITE + '/' + m[1];
  return null;
}

function git(cmd) {
  return execSync('git ' + cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
}

// The part of a post page that matters for search: title, description and the
// article itself. Every post page also shows the 2 newest posts at the bottom,
// so publishing one post touches all of them; those pages are NOT re-sent.
function postEssence(html) {
  const title = (html.match(/<title>[^<]*<\/title>/) || [''])[0];
  const desc = (html.match(/<meta name="description" content="[^"]*">/) || [''])[0];
  const start = html.indexOf('<div id="post-main"');
  const end = html.indexOf('<!-- MORE POSTS', start);
  return title + desc + (start >= 0 ? html.slice(start, end >= 0 ? end : undefined) : html);
}
function postReallyChanged(before, file) {
  let old;
  try { old = git('show ' + before + ':' + file); } catch (e) { return true; } // new page
  const now = fs.readFileSync(path.join(ROOT, file), 'utf8');
  return postEssence(old) !== postEssence(now);
}

function changedUrls(before, inSitemap) {
  if (!before || /^0+$/.test(before)) { console.log('No previous commit to compare with; nothing to ping.'); return []; }
  try { git('cat-file -e ' + before + '^{commit}'); }
  catch (e) { console.log('Previous commit ' + before + ' not found; nothing to ping.'); return []; }

  const urls = new Set();
  const lines = git('diff --name-status ' + before + ' HEAD').split('\n').filter(Boolean);
  for (const line of lines) {
    const [status, ...rest] = line.split('\t');
    const file = rest[rest.length - 1];
    if (file === 'js/data.js') DATA_PAGES.forEach(p => urls.add(SITE + p));
    const url = fileToUrl(file);
    if (!url) continue;
    if (status.startsWith('M') && /^posts\//.test(file) && !postReallyChanged(before, file)) continue;
    // Deleted post pages are sent too, so engines drop them faster.
    if (inSitemap.has(url) || (status.startsWith('D') && url.includes('/posts/'))) urls.add(url);
  }
  return [...urls].filter(u => inSitemap.has(u) || u.includes('/posts/'));
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry-run');
  const key = findKey();
  if (!key) { console.log('IndexNow key file missing or invalid; skipping.'); return; }

  const inSitemap = sitemapUrls();
  const urls = args.includes('--all') ? [...inSitemap] : changedUrls(args.find(a => !a.startsWith('--')), inSitemap);
  if (!urls.length) { console.log('No public pages changed; nothing to send to IndexNow.'); return; }

  console.log('IndexNow: ' + urls.length + ' URL(s)' + (dry ? ' (dry run, not sent)' : '') + ':\n  ' + urls.join('\n  '));
  if (dry) return;

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key, keyLocation: SITE + '/' + key + '.txt', urlList: urls.slice(0, 10000) })
    });
    const meaning = { 200: 'OK, URLs received', 202: 'Accepted, key still being validated', 400: 'Bad request',
      403: 'Key not valid (check the key file is live)', 422: 'URLs don\'t match the host or key', 429: 'Too many requests' }[res.status] || '';
    console.log('IndexNow response: ' + res.status + (meaning ? ' (' + meaning + ')' : ''));
  } catch (e) {
    console.log('IndexNow request failed (ignored): ' + e.message);
  }
}

main();
