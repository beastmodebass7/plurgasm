# PLURGASM — Project Context for Claude Code

## What this is
A rave culture directory website — festivals, brands, categories, creators/social, blog.
Live at **plurgasm.com**, hosted on GitHub Pages. Repo: `github.com/beastmodebass7/plurgasm`.

## Tech stack
Pure HTML/CSS/vanilla JS. **No frameworks, no build step.** Edit files → commit → push → live in ~30s.
Supabase (auth + a few tables) via CDN. Google Fonts: Bebas Neue (display), Chakra Petch (body), DM Mono (mono/labels).

## Design system
Dark bg `#06060c` · cyan `#00e5ff` (primary) · pink `#ff2d78` (secondary) · purple `#b64dff` ·
green `#3dff85` · amber `#ffb800` · off-white text `#f0eeff`. Use CSS vars (`var(--cyan)` etc.).

## File map
- `index.html` — homepage (see section flow below). All styling is in `css/style.css`; the page only has small inline `<style>`/`<script>` blocks for the splash, search-cycle typer, and the rave-calendar CTA.
- `calendar.html` — full festival calendar + map view (`/calendar`)
- `blog.html` (`/blog`) all posts · `blog-post.html` (`/blog-post?id=…`) single post
- `category.html` (`/category?cat=…`) — single brand-category page
- `social.html` (`/social`) creators directory · `profile.html` (`/profile`) signed-in user's saved "rave calendar"
- `admin.html` (`/admin`) — localStorage-based content editor (no real backend; writes to `pg_admin_*` keys)
- `partners.html`, `submit.html`, `submit-article.html`, `safety.html`, `privacy.html`, `terms.html`
- `festivals/` — hand-built festival detail pages (only some festivals have one; see `detailPage`)
- **JS** (all in `js/`):
  - `data.js` — **all site data** (festivals, brands, categories, socials, blog, item filters, etc.)
  - `main.js` — homepage rendering + interactions (the big one)
  - `nav.js` — header + bottom nav, single source of truth (see below)
  - `search.js` — homepage hero search
  - `auth.js` — Supabase Google login; exposes `window.sb`
  - `saves.js` — save/unsave festivals (`window.PlurSaves`)
  - `views.js` — blog post view counts
  - `generate-sitemap.js` — regenerates `sitemap.xml` (Node script, run by hand)

## Script load order (important)
On the homepage `data.js` → `main.js` → `search.js` are loaded **in that order with `defer`** at the
end of `<body>`. `main.js` reads the globals `FESTIVALS`/`BRANDS`/`CATEGORIES` defined in `data.js`,
so data.js must stay first. `nav.js`, `auth.js`, `views.js`, `saves.js` are deferred in `<head>`.

## Homepage section flow (index.html) — reordered, chapters renumbered
Hero → Countdown strip → Marquee → then sections:
1. **Chapter 01 — FESTIVALS** `#festivals` (grid/calendar toggle, vibe/region/month dropdowns, Near Me)
2. **Chapter 02 — SHOP BY CATEGORY** `#categories`
3. **Chapter 03 — SOCIAL SPOTLIGHT** `#social`
4. **"From the Community" — RAVE NEWS & CULTURE** `#blog` (newspaper layout; *no chapter number*)
5. Brand of the Week + Influencer of the Week (no chapter number)
6. **Chapter 04 — RAVE BRANDS** `#brands` (item-filter pills + category filters)
> Note the order: festivals are now first (Ch.01) and brands are last (Ch.04). Keep chapter
> eyebrows in sync if you add/move a section.

## Element-ID table (verified against current HTML)
Renders are wired by ID — a typo'd/missing container makes that render silently no-op.

**index.html**
| ID | Used by |
|----|---------|
| `splash`, `scroll-progress` | inline splash / progress bar |
| `site-nav`, `site-bottom-nav` | nav.js placeholders |
| `brand-modal`, `brand-modal-inner`, `brand-modal-content` | brand detail modal |
| `search-wrap`, `search-input`, `search-results`, `search-cycle-text` | hero search |
| `countdown`, `countdown-fest-name`, `countdown-fest-loc`, `countdown-fest-date`, `countdown-fest-link` | `initCountdown()` |
| `marquee-track` | `initMarquee()` |
| `fest-grid`, `cal-view`, `fests-expand` | `renderFestivals()` / `renderCalendar()` |
| `fest-vibe-select`, `fest-region-select`, `fest-month-select` | festival filter dropdowns (Vibe/Region populated by `renderFestFilterPills()`; Month is static) |
| `near-me-btn`, `near-me-controls`, `near-me-status` | `toggleNearMe()` |
| `rave-cal-cta`, `rave-cal-cta-text`, `rave-cal-cta-link` | inline rave-calendar CTA (uses `window.sb`) |
| `cat-grid` | `renderCategories()` |
| `social-grid` (has `data-limit`) | `renderSocials()` |
| `blog-newspaper` | `renderBlog()` |
| `botw`, `botw-name`, `botw-cat`, `botw-desc`, `botw-ig`, `botw-url` | `renderBotw()` |
| `featured-influencer` | `renderFeaturedInfluencer()` |
| `item-filters`, `item-clear-btn` | `renderItemFilters()` |
| `brand-grid`, `brand-filters`, `brands-expand` | `renderBrands()` |
| `btn-grid`, `btn-cal` | view toggle |

Other pages: `calendar.html` → `cal-output`, `fest-map`, `cal-vibe-select`, `cal-region-select`,
`cal-near-me-btn/-controls/-status`, `artist-input/-results/-clear`, `fest-search-input/-results/-wrap/-cycle-text`.
`category.html` → `cat-page`, `cat-search`, `cat-result-count`, `cat-brand-grid` (+ shared brand-modal IDs).
`blog-post.html` → `post-main`, `post-body`, `more-section`, `more-posts-grid`.
`profile.html` → `profile-root`, `pf-signin-btn`, `pf-content`, `pf-cal-root`, `pf-cal-title`, `pf-cal-grid`, `pf-cal-daypanel`.
Nav (built by nav.js): `mobile-menu`, `hamburger`, `bottom-nav`, `auth-slot`.

## Data shapes (in js/data.js — don't rename fields, main.js depends on them)
Everything attaches to **`window.PLURGASM_DATA`**. Arrays are built as `const FESTIVALS/BRANDS/CATEGORIES/SOCIALS`
then assigned (`PLURGASM_DATA.festivals = FESTIVALS`, etc.).

- **Festivals** (`PLURGASM_DATA.festivals`): `id, name, tagline, location, dates, sortDate, endDate,
  days, age, type, typeLabel, genres[], desc, headliners[], url, featured, detailPage, region`.
  Optional: `lat, lng` (needed for map + Near Me), `cardTheme{bg,border,glow,accent,label}`, `image`, `warning`.
  `sortDate`/`endDate` are **`YYYY-MM-DD` strings**.
- **Brands** (`PLURGASM_DATA.brands`): `id, name, badge, cat, badgeCls, priceCls, price, ship, loc,
  style, tags[], desc, ig, url, featured, sortOrder`. Optional: `logo` (img URL; falls back to `badge`
  on error), `note`, `warning`. ⚠️ **`id` is required** — brand cards call `openBrandModal('${b.id}')`
  and the modal does `BRANDS.find(x => x.id === id)`; a brand with no `id` won't open. (Some legacy
  entries still omit it.)
- **Categories** (`PLURGASM_DATA.categories`): `id, label, icon` (+ optional `comingSoon:true`).
  (No more `count` field.)
- **Socials** (`PLURGASM_DATA.socials`): `handle, name, image, platform, type, tags[], sortOrder,
  featured` (+ `featuredOrder`, `desc`, `url`). Homepage shows featured ones; `/social` is the full directory.
- **Blog** (`PLURGASM_DATA.blogPosts`): `id, title, slug, author, authorHandle, date, category,
  coverImage, excerpt, body, published, featured`. `body` is an HTML template literal.
  Categories: `festival-news, culture, fashion, safety, gear`.
- **Item filters** (`PLURGASM_DATA.itemFilters`): `[{ group, items:[{label, tag}] }]`. `filterByItem(tag)`
  sets `searchQuery` to the tag and re-renders brands (tags must match brand `tags[]`).
- Singletons: `PLURGASM_DATA.featuredInfluencer{...}`, `PLURGASM_DATA.brandOfWeek{...}`.
- Helpers: `getFestivalGenres()` / `getFestivalRegions()` derive the homepage **and** calendar filter
  pills from the data (driven by `FEST_GENRE_ORDER`, `FEST_GENRE_LABELS`, `FEST_REGION_META`) so the
  two pages stay in sync. A new genre/region in the data shows up automatically.

### Blog post id / URL convention
`blog-post.html` routes on `?id=…`, so a blog post's `id` **is** its public URL.

- **New posts: descriptive, keyword-rich slug ids.** For every NEW blog post, set `id` to a
  descriptive slug (e.g. `'cercle-cancels-mexico-festival'`), **not** a sequential number like
  `'post-012'`. Since the id is the public URL, a descriptive id gives better SEO and click-through
  than a numbered one.
- **`id === slug`.** Make the `id` match the post's `slug` field so there's no ambiguity.
- **Keep ids URL-safe:** lowercase, words separated by hyphens, no spaces, no special characters,
  no `.html`.

#### NEVER RENAME EXISTING IDS (critical)
- **Do NOT change the id of any already-published post.** Older posts use numbered ids
  (`post-001` … `post-011`); those URLs are already in `sitemap.xml` and likely indexed by Google.
- GitHub Pages is static with **no server-side redirects**, so a renamed id breaks the old URL with
  no way to 301 it — losing ranking equity and breaking any external links. The minor inconsistency
  between old numbered ids and new descriptive ids is **acceptable and must be left as-is**.
- If a task ever asks to "clean up" or "standardize" old post ids, **flag this rule and stop** rather
  than renaming.

## main.js — function inventory (renderers + handlers)
Renderers: `renderFestivals`, `renderCalendar`, `renderFestFilterPills`, `renderCategories`,
`renderItemFilters`, `renderBrands`, `renderSocials`, `renderCreatorDirectory`, `renderBlog`,
`renderFeaturedInfluencer`, `renderBotw`.
Festival logic: `getFilteredFests`, `getDaysBadge`, `festDetailHref`, `festPlaceholderClass`,
`googleCalUrl`, `haversineDistance`, `getNextFestival`.
Filters/handlers: `filterFests`, `filterGenre`, `filterRegion`, `filterMonth`, `filterBrands`,
`filterByItem`, `setView`, `refreshFestView`, `expandFests`, `expandBrands`, `toggleNearMe`,
`setDistance`, `toggleItemGroup`, `priceChipClass`.
Brand modal: `openBrandModal`, `closeBrandModal`, `shareBrand`.
Creator voting (Supabase): `loadCreatorVotes`, `onCreatorVote`, `creatorVoteId` + upvote animations.
Init (in `DOMContentLoaded`): merges `pg_admin_*` localStorage data, applies admin ordering, then
`renderFestFilterPills → renderFestivals → renderCategories → renderBrands → … → initCountdown,
initMarquee, initCountUp, initScrollAnimations, initBottomNav`. Mobile-only `applyMobile*Limit()`
helpers cap visible cards.

## Nav — single source of truth
Header, mobile menu, and bottom nav are defined **only in `js/nav.js`** (`NAV_LINKS`, `MOBILE_LINKS`,
`BOTTOM_ITEMS`). Pages just include `<div id="site-nav"></div>` and `<div id="site-bottom-nav"></div>`;
nav.js fills them on `DOMContentLoaded`. **Never edit nav markup in individual HTML pages.**

## Supabase (auth.js + saves.js + views.js + main.js)
- `auth.js` creates the client and sets `window.sb` (Google OAuth). Other scripts reuse `window.sb`;
  they poll briefly for it because `auth.js` may init after them.
- Tables/RPCs in use: `votes` (creator upvotes), `saved_festivals` (profile rave-calendar),
  `post_views` + RPC `increment_post_view`, RPC `get_vote_counts`.

---

## Gotchas / recurring errors (read this before debugging)
- **ID mismatch silently kills a render.** Every `render*()` does `getElementById(...); if(!el) return;`.
  A renamed/missing container = blank section, no error. Check the ID table above first.
- **Data must attach to `window.PLURGASM_DATA`.** Adding a `const FOO = [...]` in data.js does nothing
  until you also assign `PLURGASM_DATA.foo = FOO` (or push into an existing array). main.js reads the
  globals/`PLURGASM_DATA`, never the file.
- **`calendar.html` reads `window.PLURGASM_DATA.festivals`, not a bare `FESTIVALS`.** The bare `const
  FESTIVALS` is scoped to data.js. On the calendar page use `(window.PLURGASM_DATA && PLURGASM_DATA.festivals) || []`.
- **UTC date off-by-one.** `new Date('2026-05-30')` parses as **UTC midnight**, so in US timezones it
  renders as the day *before*. Existing code dodges this by either appending `T00:00:00Z` and reading
  UTC parts, or by string-splitting (`f.sortDate.split('-')` → `[YYYY,MM,DD]`). When you display a
  `YYYY-MM-DD`, split the string or parse it as **local** — don't trust a bare `new Date(str)`.
- **Apostrophes in data.js strings.** Many names/descs contain `'` (e.g. `Alpe d'Huez`, `Cook's
  Valley`, `Barry Can't Swim`). In single-quoted JS strings escape it (`d\'Huez`) or switch that
  string to double quotes. An unescaped apostrophe breaks the whole `data.js` parse → **every** render
  dies (blank homepage).
- **Template-literal escaping.** Card/modal HTML is built with backtick templates. Don't put a raw
  backtick or unescaped `${` in user-facing strings, and remember onclick attributes embed values via
  `'${...}'` — an apostrophe in that value will break the attribute.
- **`stopPropagation` on inner buttons.** Cards are clickable (`onclick="openBrandModal(...)"` /
  `window.open(...)`). Any button/link *inside* a card (IG link, save heart, upvote, etc.) must call
  `event.stopPropagation()` (and `preventDefault()` where it's a link) or the card's click fires too.
- **Brand without `id` won't open.** See Brands shape above — card onclick passes `b.id`; no id → `openBrandModal('undefined')` → no match → nothing happens. Give every brand a unique `id`.
- **Supabase RLS needs matching policies per operation.** A working `SELECT` doesn't imply `INSERT`/
  `DELETE` work. Voting (`votes`) and saves (`saved_festivals`) do insert **and** delete; if a policy
  is missing the call fails silently (caught + logged). When votes/saves "don't stick," check RLS
  policies cover the exact operation for the authed user, not just read.
- **Cache / hard-refresh before assuming a fix failed.** GitHub Pages + the browser cache JS/CSS
  aggressively. After pushing, hard-refresh (Ctrl/Cmd+Shift+R) and give Pages ~30s before concluding
  a change didn't work.
- **admin.html edits are localStorage only** (`pg_admin_festivals/brands/fest_order/brand_order`).
  They layer on top of data.js at runtime for that browser — they are **not** persisted to the repo.

## Conventions
- **Genre strings** (exact, used in `festivals[].genres` and the vibe pills): `EDM`, `House`, `Techno`,
  `Bass`, `Trance`, `Dubstep`, `Psychedelic`, `Hip-Hop`, `Jam` (displays as "Jam / Folk"), `DnB`,
  `Riddim`, `Industrial`, `Experimental`, `Indie`, `Rock`. Match casing/hyphenation exactly (`Hip-Hop`,
  `DnB` — not `Drum & Bass`).
- **Region values**: `northeast`, `southeast`, `midwest`, `west`, `southwest`, `canada`,
  `international` (labels live in `FEST_REGION_META`).
- **Festival `type`** (drives the All/Mega/Regional/Underground/International filter): `mega`,
  `regional`, `underground`, `international`. **`typeLabel`** is free-text display only and varies
  ("Mega Festival", "Regional", "Regional Festival", "Camping Festival", "East Coast", "World", …) —
  filtering keys off `type`, never `typeLabel`.
- **Brand `cat`**: `fem-clothing`, `male-clothing`, `shoes`, `accessories`, `kandi`, `jerseys`,
  `events` (coming-soon categories: `supplements`, `gear`, `lights`, `wellness`).
- **`badgeCls`**: `b-cyan`, `b-pink`, `b-purple`, `b-green`, `b-amber`.
  **`priceCls`**: `price-budget`, `price-mid`, `price-high`, `price-luxury`, `price-varies`.
- **Naming/casing**: brand `name` in ALL CAPS; festival `name` ALL CAPS; `id`/`slug`/`tag`/`cat` in
  kebab-case; CSS colors via `var(--name)`. IG handles include the leading `@`.
- **Git workflow**: work happens **directly on `main`** — no feature branches / PRs. Sync first
  (`git fetch origin main && git checkout main && git pull origin main`), make the change, then
  run the **Session End Template**:
  `node generate-sitemap.js && git add -A && git commit -m "..." && git push origin main`.
  Pages auto-deploys in ~30s.
- **After adding or editing a published blog post**, run `node generate-sitemap.js` **before
  committing** so `sitemap.xml` stays in sync.
- After adding/removing festival detail pages or static routes, regenerate `sitemap.xml` with
  `node generate-sitemap.js`.
