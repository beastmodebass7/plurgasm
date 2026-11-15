#!/usr/bin/env node
/* update-view-snapshot.js — copy blog post view counts from Supabase into
   js/view-snapshot.js so the site keeps a backup in the repo.

   Usage:  node update-view-snapshot.js
   Runs daily via .github/workflows/view-snapshot.yml, and can be run by hand.

   Safety rules:
   - Per post it keeps the HIGHER of (Supabase, existing snapshot), so a reset
     or wiped Supabase table can never lower or erase the backup.
   - If Supabase can't be reached, the file is left untouched and the script
     exits 0 (so the scheduled job doesn't fail noisily).
   Uses the same public publishable key the site already ships in js/auth.js. */
'use strict';
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://xrbguuwgajrohgvgfggh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_wLIiPFws5jDmiPH8xcZ-jQ_KG1Zfhx6';
const FILE = path.join(__dirname, 'js', 'view-snapshot.js');

function readExisting() {
  try {
    const src = fs.readFileSync(FILE, 'utf8');
    const m = src.match(/window\.PLURGASM_VIEW_SNAPSHOT\s*=\s*(\{[\s\S]*\});/);
    const obj = m ? JSON.parse(m[1]) : null;
    return obj && obj.views ? obj : { updated: null, views: {} };
  } catch (e) {
    return { updated: null, views: {} };
  }
}

async function fetchLive() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/post_views?select=post_id,views`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
  const rows = await res.json();
  if (!Array.isArray(rows)) throw new Error('Unexpected response');
  return rows;
}

(async () => {
  const snap = readExisting();
  let rows;
  try {
    rows = await fetchLive();
  } catch (e) {
    console.warn('Could not read Supabase, leaving snapshot unchanged:', e.message);
    return;
  }

  const merged = Object.assign({}, snap.views);
  let changed = 0;
  for (const r of rows) {
    const id = r && r.post_id;
    const n = Number(r && r.views) || 0;
    if (!id) continue;
    if (n > (merged[id] || 0)) { merged[id] = n; changed++; }
  }

  if (!changed && snap.updated) {
    console.log('No count increases since last snapshot.');
    return;
  }

  // Sort keys so diffs stay small and readable.
  const views = {};
  Object.keys(merged).sort().forEach(k => { views[k] = merged[k]; });
  const total = Object.values(views).reduce((a, b) => a + b, 0);
  const out = { updated: new Date().toISOString().slice(0, 10), views };

  const header = fs.readFileSync(FILE, 'utf8').split('window.PLURGASM_VIEW_SNAPSHOT')[0];
  fs.writeFileSync(FILE, header + 'window.PLURGASM_VIEW_SNAPSHOT = ' + JSON.stringify(out, null, 2) + ';\n');
  console.log(`Snapshot updated: ${Object.keys(views).length} posts, ${total} total views (${changed} increased).`);
})();
