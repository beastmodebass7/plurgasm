/* nav.js — single source of truth for header + bottom nav
   Edit this file to change any nav link. Never touch individual HTML files. */
(function () {
  'use strict';

  var NAV_LINKS = [
    { label: 'Brands',           href: '/#brands' },
    { label: 'Festivals',        href: '/#festivals' },
    { label: 'Calendar',         href: '/calendar' },
    { label: 'Shop by Category', href: '/#categories' },
    { label: 'Creators',         href: '/social' },
    { label: 'Social',           href: '/#social' },
    { label: 'Blog',             href: '/blog' },
  ];

  var MOBILE_LINKS = [
    { label: 'Brands',            href: '/#brands' },
    { label: 'Festivals',         href: '/#festivals' },
    { label: 'Festival Calendar', href: '/calendar' },
    { label: 'Shop by Category',  href: '/#categories' },
    { label: 'Creators',          href: '/social' },
    { label: 'Social',            href: '/#social' },
    { label: 'Blog &amp; News',   href: '/blog' },
    { label: 'Safety &amp; PLUR', href: '/safety', cls: 'mob-highlight' },
  ];

  var BOTTOM_ITEMS = [
    { label: 'Brands',   href: '/#brands',    icon: 'icon-nav-brands.png' },
    { label: 'Festivals',href: '/#festivals', icon: 'icon-nav-festivals.png' },
    { label: 'Search',   href: null,          icon: 'icon-nav-search.png',   isSearch: true },
    { label: 'Creators', href: '/social',icon: '/images/nav/icon-nav-creators.png' },
    { label: 'Blog',     href: '/blog',      icon: 'icon-nav-blog.png' },
    { label: 'Calendar', href: '/calendar', icon: 'icon-nav-calendar.png' },
  ];

  function init() {
    try {
      var pathname = window.location.pathname;
      var inSubfolder = pathname.split('/').filter(Boolean).length > 1;
      var imgBase = inSubfolder ? '../images/nav/' : 'images/nav/';
      var isHome = pathname === '/' || pathname === '' || /\/index(\.html)?$/.test(pathname);

      // Normalize a path for active-state matching: strip a trailing ".html"
      // and any trailing slash so "/calendar", "/calendar.html" and
      // "/calendar/" all compare equal. Home collapses to "/".
      function normPath(p) {
        if (!p) return '/';
        p = p.replace(/\.html$/, '').replace(/\/index$/, '/');
        if (p.length > 1) p = p.replace(/\/$/, '');
        return p || '/';
      }

      function isActive(href) {
        if (!href || href.indexOf('#') !== -1) return false;
        try {
          return normPath(new URL(href, location.origin).pathname) === normPath(pathname);
        } catch (e) { return false; }
      }

      // ── mobile-menu panel ──
      var mobLinksHtml = MOBILE_LINKS.map(function (l) {
        return '<li><a href="' + l.href + '"' + (l.cls ? ' class="' + l.cls + '"' : '') +
               ' onclick="closeMobileMenu()">' + l.label + '</a></li>';
      }).join('');

      var mobileMenuHtml =
        '<div class="mobile-menu" id="mobile-menu">' +
          '<div class="mob-backdrop" onclick="closeMobileMenu()"></div>' +
          '<div class="mob-panel">' +
            '<div class="mob-header">' +
              '<span class="mob-logo">PLURGASM</span>' +
              '<button class="mob-close" onclick="closeMobileMenu()">✕</button>' +
            '</div>' +
            '<ul class="mob-links">' + mobLinksHtml + '</ul>' +
            '<div class="mob-footer">' +
              '<a href="/partners" class="mob-cta">Partner With Us</a>' +
              '<p class="mob-plur">☮ Peace · ❤ Love · 🤝 Unity · 💫 Respect</p>' +
            '</div>' +
          '</div>' +
        '</div>';

      // ── desktop nav ──
      var navLinksHtml = NAV_LINKS.map(function (l) {
        return '<li><a href="' + l.href + '"' + (isActive(l.href) ? ' class="active"' : '') + '>' + l.label + '</a></li>';
      }).join('');

      var navHtml =
        '<nav>' +
          '<a href="/" class="nav-logo">PLURGASM</a>' +
          '<ul class="nav-links">' + navLinksHtml + '</ul>' +
          '<a href="/partners" class="nav-cta">Partner With Us</a>' +
          '<button class="hamburger" id="hamburger" onclick="toggleMobileMenu()" aria-label="Open menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</nav>';

      // ── bottom nav ──
      // Icons starting with "/" are root-relative and used as-is (so they
      // resolve on subfolder pages like /festivals/<name>); bare filenames
      // get the page-relative imgBase prepended.
      function iconSrc(icon) {
        return icon.charAt(0) === '/' ? icon : imgBase + icon;
      }
      var bottomHtml = '<nav class="bottom-nav" id="bottom-nav">' +
        BOTTOM_ITEMS.map(function (item) {
          if (item.isSearch) {
            var href = isHome ? '#' : '/';
            var onclick = isHome
              ? ' onclick="document.getElementById(\'search-input\').focus();window.scrollTo({top:0,behavior:\'smooth\'});return false;"'
              : '';
            return '<a href="' + href + '" class="bn-item bn-search"' + onclick + '>' +
              '<img src="' + iconSrc(item.icon) + '" class="bn-icon-img" alt="' + item.label + '" loading="eager">' +
              '<span class="bn-label">' + item.label + '</span></a>';
          }
          var activeClass = isActive(item.href) ? ' active' : '';
          var imgStyle = item.imgStyle ? ' style="' + item.imgStyle + '"' : '';
          return '<a href="' + item.href + '" class="bn-item' + activeClass + '">' +
            '<img src="' + iconSrc(item.icon) + '" class="bn-icon-img" alt="' + item.label + '" loading="eager"' + imgStyle + '>' +
            '<span class="bn-label">' + item.label + '</span></a>';
        }).join('') +
        '</nav>';

      // ── inject desktop nav + mobile menu ──
      var siteNav = document.getElementById('site-nav');
      if (siteNav) {
        siteNav.outerHTML = mobileMenuHtml + navHtml;
      }

      // ── inject bottom nav ──
      var siteBottomNav = document.getElementById('site-bottom-nav');
      if (siteBottomNav) {
        siteBottomNav.outerHTML = bottomHtml;
      }

      // ── active style for desktop nav links ──
      if (!document.getElementById('nav-js-style')) {
        var style = document.createElement('style');
        style.id = 'nav-js-style';
        style.textContent = '.nav-links a.active{color:var(--cyan);}';
        document.head.appendChild(style);
      }

      // ── toggleMobileMenu / closeMobileMenu fallback ──
      if (typeof window.toggleMobileMenu === 'undefined') {
        window.toggleMobileMenu = function () {
          var menu = document.getElementById('mobile-menu');
          if (!menu) return;
          var ham = document.getElementById('hamburger');
          var open = menu.classList.toggle('open');
          if (ham) { ham.classList.toggle('open', open); ham.setAttribute('aria-expanded', String(open)); }
          document.body.style.overflow = open ? 'hidden' : '';
        };
        window.closeMobileMenu = function () {
          var menu = document.getElementById('mobile-menu');
          if (!menu) return;
          var ham = document.getElementById('hamburger');
          menu.classList.remove('open');
          if (ham) { ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); }
          document.body.style.overflow = '';
        };
      }

    } catch (e) {
      console.warn('[nav.js]', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
