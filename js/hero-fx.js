/* hero-fx.js — mouse-reactive neon particle constellation, HERO banner only.
   Scoped to .hero (canvas mounted inside .hero-bg). Self-contained, no deps.
   - Subtle drifting neon particles in the site palette (cyan/pink/purple/green)
   - Mouse over the hero gently attracts nearby particles + draws faint links
   - Pauses when the hero is offscreen (IntersectionObserver) or tab hidden
   - Respects prefers-reduced-motion (static dots, no animation)
   - Retina-aware (capped DPR), degrades gracefully on mobile, never blocks clicks
   Wrapped in an IIFE + try/catch so it can never break existing hero renders. */
(function () {
  'use strict';
  try {
    var hero = document.querySelector('.hero');
    if (!hero) return;
    var mount = hero.querySelector('.hero-bg') || hero; // clipped + pointer-events:none

    var canvas = document.createElement('canvas');
    canvas.className = 'hero-fx-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    mount.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    // RGB triples — matches the site neon palette (see CLAUDE.md design system)
    var PALETTE = [
      [0, 229, 255],   // cyan
      [255, 45, 120],  // pink
      [182, 77, 255],  // purple
      [61, 255, 133]   // green
    ];

    var reduceMotion = !!(window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    var DPR = Math.min(window.devicePixelRatio || 1, 2); // cap to avoid retina overdraw
    var cssW = 1, cssH = 1;
    var particles = [];
    var mouse = { x: 0, y: 0, active: false };
    var rect = { left: 0, top: 0 };
    var rafId = null;
    var running = false;

    function rand(min, max) { return min + Math.random() * (max - min); }

    function particleCount() {
      var n = Math.round((cssW * cssH) / 24000);
      if (cssW < 640) return Math.max(16, Math.min(32, n)); // lighter on mobile
      return Math.max(40, Math.min(58, n));                 // ~40-58 on desktop
    }

    function makeParticle() {
      var c = PALETTE[(Math.random() * PALETTE.length) | 0];
      return {
        x: Math.random() * cssW,
        y: Math.random() * cssH,
        dx: rand(-0.14, 0.14),   // constant slow drift (relaxed state)
        dy: rand(-0.14, 0.14),
        vx: 0, vy: 0,            // mouse-driven impulse, damped back to 0
        r: rand(1.1, 2.6),
        a: rand(0.25, 0.6),
        c: c
      };
    }

    function build() {
      particles = [];
      var n = particleCount();
      for (var i = 0; i < n; i++) particles.push(makeParticle());
    }

    function updateRect() {
      var r = canvas.getBoundingClientRect();
      rect.left = r.left;
      rect.top = r.top;
    }

    function resize() {
      var r = mount.getBoundingClientRect();
      cssW = Math.max(1, r.width);
      cssH = Math.max(1, r.height);
      canvas.width = Math.round(cssW * DPR);
      canvas.height = Math.round(cssH * DPR);
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      updateRect();
      build();
      if (reduceMotion) drawStatic();
    }

    function rgba(c, a) {
      return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')';
    }

    // Reduced-motion: a handful of faint, motionless dots — no loop, no listeners.
    function drawStatic() {
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.globalCompositeOperation = 'lighter';
      var dots = Math.min(14, particles.length);
      for (var i = 0; i < dots; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(p.c, p.a * 0.6);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    var LINK = 124, LINK2 = LINK * LINK;        // particle-to-particle link distance
    var CURSOR = 170, CURSOR2 = CURSOR * CURSOR; // attraction + cursor-link radius
    var margin = 30;

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, cssW, cssH);

      var i, j, p, q, dx, dy, d2, d;

      // update positions
      for (i = 0; i < particles.length; i++) {
        p = particles[i];
        if (mouse.active) {
          dx = mouse.x - p.x; dy = mouse.y - p.y;
          d2 = dx * dx + dy * dy;
          if (d2 < CURSOR2 && d2 > 0.5) {
            d = Math.sqrt(d2);
            var pull = (1 - d / CURSOR) * 0.045; // gentle, closer = stronger
            p.vx += (dx / d) * pull;
            p.vy += (dy / d) * pull;
          }
        }
        p.vx *= 0.93; p.vy *= 0.93;            // impulse decays -> back to drift
        p.x += p.dx + p.vx;
        p.y += p.dy + p.vy;

        if (p.x < -margin) p.x = cssW + margin;
        else if (p.x > cssW + margin) p.x = -margin;
        if (p.y < -margin) p.y = cssH + margin;
        else if (p.y > cssH + margin) p.y = -margin;
      }

      ctx.globalCompositeOperation = 'lighter';

      // constellation links between nearby particles
      ctx.lineWidth = 1;
      for (i = 0; i < particles.length; i++) {
        p = particles[i];
        for (j = i + 1; j < particles.length; j++) {
          q = particles[j];
          dx = p.x - q.x; dy = p.y - q.y;
          d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            d = Math.sqrt(d2);
            var la = (1 - d / LINK) * 0.16;
            ctx.strokeStyle = 'rgba(' +
              ((p.c[0] + q.c[0]) >> 1) + ',' +
              ((p.c[1] + q.c[1]) >> 1) + ',' +
              ((p.c[2] + q.c[2]) >> 1) + ',' + la + ')';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        // faint links from cursor to nearby particles (reactive constellation)
        if (mouse.active) {
          dx = p.x - mouse.x; dy = p.y - mouse.y;
          d2 = dx * dx + dy * dy;
          if (d2 < CURSOR2) {
            d = Math.sqrt(d2);
            ctx.strokeStyle = rgba(p.c, (1 - d / CURSOR) * 0.22);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // particles (additive glow)
      for (i = 0; i < particles.length; i++) {
        p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(p.c, p.a);
        ctx.shadowColor = rgba(p.c, 0.9);
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = 'source-over';
      rafId = window.requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      updateRect();
      rafId = window.requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (rafId) { window.cancelAnimationFrame(rafId); rafId = null; }
    }

    // --- listeners --------------------------------------------------------
    function onMove(e) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() { mouse.active = false; }

    var resizeTimer = null;
    function onResize() {
      if (resizeTimer) window.cancelAnimationFrame(resizeTimer);
      resizeTimer = window.requestAnimationFrame(resize);
    }

    resize();

    if (!reduceMotion) {
      // pointermove covers mouse + touch + pen; never preventDefault (won't block scroll/typing)
      hero.addEventListener('pointermove', onMove, { passive: true });
      hero.addEventListener('pointerleave', onLeave, { passive: true });
      hero.addEventListener('pointercancel', onLeave, { passive: true });
      window.addEventListener('resize', onResize);
      window.addEventListener('scroll', updateRect, { passive: true });
      window.addEventListener('load', resize);

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop();
        else if (heroVisible) start();
      });

      var heroVisible = true;
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          heroVisible = entries[0].isIntersecting;
          if (heroVisible && !document.hidden) start();
          else stop();
        }, { threshold: 0 });
        io.observe(hero);
      } else {
        start();
      }
    }
  } catch (err) {
    if (window.console && console.warn) console.warn('hero-fx disabled:', err);
  }
})();
