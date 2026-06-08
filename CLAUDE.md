# PLURGASM — Project Context for Claude Code

## What this is
A rave culture directory website — festivals, brands, categories, social spotlight.
Live at plurgasm.com, hosted on GitHub Pages.

## Current file structure
- index.html — full homepage (currently one self-contained file, refactor to split files is next)
- safety.html — harm reduction + PLUR page
- submit.html — brand submission page

## Tech stack
Pure HTML/CSS/JavaScript. No frameworks. No build process.
Google Fonts: Bebas Neue (display), Chakra Petch (body), DM Mono (mono/labels)

## Design system
Dark background: #06060c
Neon cyan: #00e5ff (primary)
Neon pink: #ff2d78 (secondary)
Purple: #b64dff, Green: #3dff85, Amber: #ffb800
Off-white text: #f0eeff

## What's been built
- Homepage with hero, countdown (Project GLOW May 30 2026), festival cards, category grid
- Brand directory with price/shipping/location info from spreadsheet data
- Spotlight search across all data types (festivals/brands/categories/socials)
- Festival grid + calendar toggle view
- Genre/vibe filter pills on festivals
- Brand detail modals (click any brand card)
- PLUR + mission statement section
- Mobile hamburger menu
- Safety & PLUR page (safety.html)
- Submit a Brand page (submit.html)

## What's planned next
1. Refactor: split index.html into index.html + css/style.css + js/data.js + js/main.js + js/search.js
2. OG/SEO meta tags
3. Partners / Get Featured page (monetization — brands pay for listings)
4. Festival detail pages (EDC, Tomorrowland, Movement)
5. Admin panel (password protected, edit content without touching code)
6. Email capture / newsletter
7. More brands from spreadsheet (supplements, gear, lights, wellness)

## Data structure (do not rename these fields — main.js depends on them)
Festivals: id, name, tagline, location, dates, sortDate, endDate, days, age, type, typeLabel, genres, desc, url, featured, detailPage
Brands: id, name, badge, cat, badgeCls, priceCls, price, ship, loc, style, tags, desc, note, ig, url
Categories: id, label, icon, count
Socials: handle, platform, type, desc, featured

## Item filter system
- Item filters stored in `PLURGASM_DATA.itemFilters` in `js/data.js`
- Rendered by `renderItemFilters()` in `js/main.js`
- `filterByItem()` sets `searchQuery` to the tag and re-renders brands
- To add a new item filter: add to `itemFilters` array in `js/data.js`

## Blog system
- Posts stored in `PLURGASM_DATA.blogPosts` in `js/data.js`
- Rendered on homepage by `renderBlog()` in `js/main.js` (newspaper layout — featured left, sidebar right)
- Single post page: `blog-post.html` (reads `?id=` from URL, finds post in blogPosts)
- All posts page: `blog.html` (filter pills + search bar, blog-grid layout)
- To add a post: add object to `blogPosts` array in `js/data.js`
- Fields: `id`, `title`, `slug`, `author`, `authorHandle`, `date`, `category`, `coverImage`, `excerpt`, `body`, `published`, `featured`
- Categories: `festival-news`, `culture`, `fashion`, `safety`, `gear`

## Nav — single source of truth
The site header and mobile bottom nav are defined ONLY in `js/nav.js`.
To change any nav link, icon, label, or add/remove an item — edit `nav.js`.
Never edit nav markup in individual HTML pages; they all use `<div id="site-nav"></div>` and `<div id="site-bottom-nav"></div>` as placeholders that nav.js fills on DOMContentLoaded.

## Admin password (localStorage based for now)
Currently saved in brand submission form — no real admin panel yet

## GitHub
Repo: github.com/beastmodebass7/plurgasm
Deploy: GitHub Pages, custom domain plurgasm.com
To deploy: commit and push — live in ~30 seconds
