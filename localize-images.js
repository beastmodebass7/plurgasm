#!/usr/bin/env node
/*
 * localize-images.js — download externally-hotlinked brand logos + creator
 * avatars, optimize to WebP, and store them under images/ so the site stops
 * depending on other companies' servers (rate limits, bot blocks, redirects).
 *
 * Sources handled:
 *   - brand.logo pointing at a favicon.ico  -> sharp can't decode .ico, so we
 *     fetch a 128px PNG from Google's favicon service for the brand's domain
 *   - brand.logo pointing at a normal image -> downloaded directly
 *   - socials[] with no local image         -> unavatar.io/instagram/<handle>
 *     (?fallback=false so a missing avatar FAILS instead of saving a generic
 *     placeholder)
 *
 * Outputs:
 *   brand logos     -> images/brands/<brand-id>.webp   (max 128x128)
 *   creator avatars -> images/creators/<handle>.webp   (max 200x200)
 *
 * Re-runnable: reads js/data.js each time, only touches entries whose
 * logo/image is still external (or null, for socials). After a run, point the
 * data.js fields at the printed local paths. Never throws on a single failure.
 *
 * Usage:  node localize-images.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const sharp = require('sharp');

const ROOT = __dirname;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

function loadData() {
  const src = fs.readFileSync(path.join(ROOT, 'js', 'data.js'), 'utf8');
  // data.js references both `window.PLURGASM_DATA` and bare `PLURGASM_DATA`
  // (fine in browsers where window IS the global) — so make the sandbox its
  // own `window` to mirror that.
  const sandbox = {};
  sandbox.window = sandbox;
  vm.runInNewContext(src, sandbox, { filename: 'js/data.js' });
  return sandbox.window.PLURGASM_DATA;
}

const isLocal = (u) => !u || u.startsWith('images/') || u.startsWith('/images/');

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function domainOf(url) {
  return new URL(url).hostname.replace(/^www\./, '');
}

async function download(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'image/*,*/*;q=0.8' },
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const type = res.headers.get('content-type') || '';
  if (type.includes('text/html')) throw new Error(`got HTML, not an image (${type})`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!buf.length) throw new Error('empty response body');
  return buf;
}

async function toWebp(buf, outAbs, maxPx) {
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  await sharp(buf)
    .resize({ width: maxPx, height: maxPx, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85, alphaQuality: 100 })
    .toFile(outAbs);
}

async function run() {
  const data = loadData();
  const results = []; // { kind, label, outRel|null, source, error|null }

  // ── Brand logos ──────────────────────────────────────────────────────────
  console.log('=== BRAND LOGOS ===');
  for (const b of data.brands || []) {
    if (isLocal(b.logo)) continue;
    const slug = b.id || slugify(b.name);
    const outRel = `images/brands/${slug}.webp`;
    // sharp cannot decode .ico — use Google's favicon PNG service instead
    const isIco = /\.ico(\?|$)/i.test(new URL(b.logo).pathname + '?');
    let source = b.logo;
    try {
      if (isIco) {
        if (!b.url || b.url === '#') throw new Error('.ico logo but no brand url to derive domain');
        source = `https://www.google.com/s2/favicons?domain=${domainOf(b.url)}&sz=128`;
      }
      const buf = await download(source);
      await toWebp(buf, path.join(ROOT, outRel), 128);
      results.push({ kind: 'brand', label: b.name, outRel, source, error: null });
      console.log(`  SUCCESS  ${b.name}  ->  ${outRel}`);
    } catch (e) {
      results.push({ kind: 'brand', label: b.name, outRel: null, source, error: e.message });
      console.log(`  FAILED   ${b.name}  (${source})  — ${e.message}`);
    }
  }

  // ── Creator avatars ──────────────────────────────────────────────────────
  console.log('\n=== CREATOR AVATARS ===');
  for (const s of data.socials || []) {
    if (s.image && isLocal(s.image)) continue;
    const handle = (s.handle || '').replace('@', '');
    if (!handle) continue;
    const outRel = `images/creators/${handle}.webp`;
    const source = s.image && !isLocal(s.image)
      ? s.image
      : `https://unavatar.io/instagram/${handle}?fallback=false`;
    try {
      const buf = await download(source);
      await toWebp(buf, path.join(ROOT, outRel), 200);
      results.push({ kind: 'creator', label: s.handle, outRel, source, error: null });
      console.log(`  SUCCESS  ${s.handle}  ->  ${outRel}`);
    } catch (e) {
      results.push({ kind: 'creator', label: s.handle, outRel: null, source, error: e.message });
      console.log(`  FAILED   ${s.handle}  (${source})  — ${e.message}`);
    }
  }

  // ── Summary ──────────────────────────────────────────────────────────────
  const ok = results.filter((r) => !r.error);
  const bad = results.filter((r) => r.error);
  console.log('\n================ SUMMARY ================');
  console.log(`${ok.filter((r) => r.kind === 'brand').length} logos localized, ` +
    `${ok.filter((r) => r.kind === 'creator').length} avatars localized, ` +
    `${bad.length} failed`);
  if (ok.length) {
    console.log('\nPoint these data.js fields at the new local paths:');
    for (const r of ok) console.log(`  ${r.kind}  ${r.label}  ->  ${r.outRel}`);
  }
  if (bad.length) {
    console.log('\nFailed (brands: set logo to null; creators: supply an image manually):');
    for (const r of bad) console.log(`  ${r.kind}  ${r.label}  — ${r.error}  (${r.source})`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
