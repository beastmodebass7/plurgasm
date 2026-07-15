#!/usr/bin/env node
/*
 * optimize-images.js — resize + convert site images to WebP.
 *
 * Why: mobile LCP was ~14s because the site shipped multi-MB images displayed
 * at tiny sizes (e.g. a 2000x2000 / 1.7MB category icon shown at 64px). This
 * resizes each image to ~2x its real display size (retina-sharp) and re-encodes
 * to WebP, preserving transparency so the mix-blend-mode tricks keep working.
 *
 * Re-runnable: safe to run again whenever you add new images. It only writes
 * .webp outputs and logs before/after sizes — it never deletes originals.
 * (Deleting an original is a manual step, done only after confirming zero
 * references remain — see the project task notes.)
 *
 * Usage:  npm install sharp --save-dev   (once)
 *         node optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = __dirname;

// Each job: a set of input files + the transform to apply.
//   resize     — sharp resize options (null = no resize, just re-encode)
//   quality    — WebP quality
//   skipUnderKB — skip inputs already smaller than this (cat 5: don't re-bloat)
const JOBS = [
  {
    name: '1. Bottom-nav icons (96x96)',
    files: glob('images/nav', /^icon-nav-.*\.png$/i),
    resize: { width: 96, height: 96, fit: 'inside', withoutEnlargement: true },
    quality: 85,
  },
  {
    name: '2. Category icons (128x128)',
    files: glob('images/categories', /^icon-.*\.png$/i),
    resize: { width: 128, height: 128, fit: 'inside', withoutEnlargement: true },
    quality: 85,
  },
  {
    name: '3. Hero dancer art (<=600px tall)',
    files: ['images/dancer.png', 'images/dancer-left.png'],
    resize: { height: 600, fit: 'inside', withoutEnlargement: true },
    quality: 85,
  },
  {
    name: '4. Blog headers / covers (<=1200px wide)',
    files: glob('images/blog', /\.(jpe?g|png)$/i),
    resize: { width: 1200, fit: 'inside', withoutEnlargement: true },
    quality: 80,
  },
  {
    name: '5. Oversized festival photos (<=800px wide)',
    files: glob('images/festivals', /\.webp$/i),
    resize: { width: 800, fit: 'inside', withoutEnlargement: true },
    quality: 80,
    skipUnderKB: 80,
  },
  {
    name: '6. Brand-of-week / misc oversized homepage images',
    files: ['images/brands/trippysquid.webp', 'images/jarren-ellis.jpg'],
    resize: { width: 600, fit: 'inside', withoutEnlargement: true },
    quality: 82,
  },
  {
    name: '7. Blog-body images (<=1200px wide)',
    files: ['images/plur/plur-handshake.png', 'images/blog/edc-orlando-2026.webp'],
    resize: { width: 1200, fit: 'inside', withoutEnlargement: true },
    quality: 80,
  },
  {
    name: '8. Branded transparent icons (128x128)',
    // These already have transparent backgrounds (no black bg, no
    // mix-blend-mode trick). Trim the large transparent margins first so the
    // glyph fills the canvas like the emoji it replaces at ~1em sizes.
    files: glob('images/icons', /^icon-.*\.png$/i),
    trim: 25,
    resize: { width: 128, height: 128, fit: 'inside', withoutEnlargement: true },
    quality: 85,
  },
];

function glob(dir, re) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs)
    .filter((f) => re.test(f))
    .map((f) => path.join(dir, f).replace(/\\/g, '/'))
    .sort();
}

function kb(bytes) {
  return (bytes / 1024).toFixed(1);
}

async function run() {
  const rows = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const job of JOBS) {
    console.log(`\n=== ${job.name} ===`);
    for (const rel of job.files) {
      const inAbs = path.join(ROOT, rel);
      if (!fs.existsSync(inAbs)) {
        console.log(`  MISSING  ${rel}`);
        continue;
      }
      const beforeBytes = fs.statSync(inAbs).size;

      if (job.skipUnderKB && beforeBytes / 1024 < job.skipUnderKB) {
        console.log(`  skip     ${rel}  (${kb(beforeBytes)}KB < ${job.skipUnderKB}KB)`);
        continue;
      }

      const outRel = rel.replace(/\.(png|jpe?g|webp)$/i, '.webp');
      const outAbs = path.join(ROOT, outRel);

      // Read the source into a buffer first. This frees the file handle, so
      // we can safely re-encode an existing .webp in place (sharp won't read
      // and write the same path, and Windows locks the file during rename).
      const inputBuf = fs.readFileSync(inAbs);
      let pipeline = sharp(inputBuf);
      const meta = await pipeline.metadata();

      // Idempotency guard: when re-encoding a .webp IN PLACE (output path ==
      // input path) and it's already no wider than the target, skip it.
      // Otherwise a re-run would lossily re-encode an already-optimized webp
      // every time and slowly degrade it. Format conversions (png/jpg -> webp)
      // are unaffected: they always re-derive from the pristine original, so
      // re-runs are already lossless-stable.
      const targetW = job.resize && job.resize.width;
      const inPlace = path.resolve(inAbs) === path.resolve(outAbs);
      if (inPlace && targetW && meta.width <= targetW) {
        console.log(`  skip     ${rel}  (already ${meta.width}px wide <= ${targetW}px)`);
        continue;
      }

      // Trim borders matching the top-left pixel (transparent for the icon
      // set) before resizing; job.trim is the sharp trim threshold.
      if (job.trim) pipeline = pipeline.trim({ threshold: job.trim });
      if (job.resize) pipeline = pipeline.resize(job.resize);
      // WebP keeps the alpha channel, so mix-blend-mode screen/lighten on a
      // black bg keeps removing the black. Lossy q80-85 is plenty here.
      await pipeline.webp({ quality: job.quality, alphaQuality: 100 }).toFile(outAbs);

      const afterMeta = await sharp(outAbs).metadata();
      const afterBytes = fs.statSync(outAbs).size;
      totalBefore += beforeBytes;
      totalAfter += afterBytes;

      const saved = beforeBytes - afterBytes;
      rows.push({
        file: outRel,
        from: `${meta.width}x${meta.height} ${kb(beforeBytes)}KB`,
        to: `${afterMeta.width}x${afterMeta.height} ${kb(afterBytes)}KB`,
        saved: `${kb(saved)}KB`,
        pct: beforeBytes ? `${((saved / beforeBytes) * 100).toFixed(0)}%` : '—',
      });
      console.log(`  ok       ${rel}  ${kb(beforeBytes)}KB -> ${kb(afterBytes)}KB`);
    }
  }

  console.log('\n================ SUMMARY ================');
  const w = (s, n) => String(s).padEnd(n);
  console.log(w('OUTPUT', 44) + w('BEFORE', 20) + w('AFTER', 20) + w('SAVED', 12) + 'CUT');
  for (const r of rows) {
    console.log(w(r.file, 44) + w(r.from, 20) + w(r.to, 20) + w(r.saved, 12) + r.pct);
  }
  console.log('-----------------------------------------');
  console.log(`${rows.length} images optimized`);
  console.log(`Total: ${kb(totalBefore)}KB -> ${kb(totalAfter)}KB  (saved ${kb(totalBefore - totalAfter)}KB, ${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% smaller)`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
