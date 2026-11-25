/* ============================================================
   main.js — Interactions du portfolio Adam Amaziane
   Typewriter, particules, tilt, i18n, thème, reveal, formulaire.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  const ICONS = {
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    map: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    gradcap: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.5"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  };

  function icon(name, size) {
    size = size || 18;
    return (
      '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONS[name] || "") + "</svg>"
    );
  }

  function t(path) {
    return path.split(".").reduce(function (o, k) { return o ? o[k] : undefined; }, I18N[lang]);
  }

  /* ---------- State ---------- */
  let lang = localStorage.getItem("lang") || "fr";
  if (!I18N[lang]) lang = "fr";

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 3800);
  }

  /* ---------- Static i18n ---------- */
  function applyStatic() {
    $$("[data-i18n]").forEach(function (el) {
      const v = t(el.dataset.i18n);
      if (typeof v === "string") el.textContent = v;
    });
    document.title = I18N[lang].docTitle;
    document.documentElement.lang = lang;
  }

  /* ---------- Renderers ---------- */
  function renderStats() {
    const wrap = $("#hero-stats");
    wrap.innerHTML = I18N[lang].hero.stats.map(function (s) {
      return '<div class="stat"><div class="stat-num" data-target="' + s.v + '">0' + esc(s.s) +
        '</div><div class="stat-label">' + esc(s.l) + "</div></div>";
    }).join("");
    $$("#hero-stats .stat-num").forEach(function (el) { countIO.observe(el); });
  }

  function renderMarquee() {
    const html = I18N[lang].marquee.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
    $("#marquee").innerHTML = html + html;
  }

  function renderFloatChips() {
    const chips = ["React", "Laravel", "Spring Cloud", "Power BI"];
    $("#float-chips").innerHTML = chips.map(function (c) {
      return '<span class="float-chip">' + esc(c) + "</span>";
    }).join("");
  }

  function renderAboutChips() {
    $("#soft-chips").innerHTML = I18N[lang].about.soft.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    $("#lang-chips").innerHTML = I18N[lang].about.langs.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
  }

  function renderAboutInfo() {
    $("#about-info").innerHTML = I18N[lang].about.info.map(function (i) {
      const value = i.href
        ? '<a class="v" href="' + i.href + '">' + esc(i.v) + "</a>"
        : '<span class="v muted">' + esc(i.v) + "</span>";
      return '<li><span class="k">' + esc(i.k) + "</span>" + value + "</li>";
    }).join("");
  }

  function renderSkills() {
    $("#skills-grid").innerHTML = I18N[lang].skills.groups.map(function (g, i) {
      return '<div class="skill-card reveal" style="--d:' + ((i % 3) * 0.08) + 's">' +
        '<div class="skill-head"><span class="skill-icon">' + icon(g.icon, 19) +
        '</span><h3>' + esc(g.name) + "</h3></div>" +
        '<ul class="chips">' + g.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    }).join("");
  }

  function renderProjects() {
    $("#projects-grid").innerHTML = I18N[lang].projects.items.map(function (p, i) {
      const link = p.link
        ? '<div class="pc-foot"><span class="pc-min">' + esc(p.type) + "</span>" +
          '<a class="pc-link" target="_blank" rel="noopener noreferrer" href="' + p.link + '">' +
          esc(I18N[lang].projects.linkLabel) + " " + icon("arrow", 14) + "</a></div>"
        : "";
      return '<article class="project-card reveal" style="--d:' + ((i % 3) * 0.08) + 's">' +
        '<div class="pc-top"><span class="pc-type">' + esc(p.type) + "</span>" +
        (p.period ? '<span class="pc-period">' + esc(p.period) + "</span>" : "") +
        "</div><h3>" + esc(p.title) + "</h3><p>" + esc(p.desc) + "</p>" +
        '<ul class="chips">' + p.tech.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        link + "</article>";
    }).join("");
    bindTilt();
  }

  function renderTimeline() {
    $("#timeline").innerHTML = I18N[lang].journey.experience.map(function (e, i) {
      return '<li class="tl-item"><span class="tl-dot"></span>' +
        '<div class="tl-card reveal" style="--d:' + (i * 0.06) + 's">' +
        '<div class="tl-head"><h3>' + esc(e.role) + '</h3><span class="tl-period">' + esc(e.period) + "</span></div>" +
        '<p class="tl-org">' + icon("briefcase", 15) + " " + esc(e.org) + " — " + esc(e.place) + "</p>" +
        '<ul class="tl-bullets">' + e.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" +
        '<ul class="chips">' + e.tech.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></li>";
    }).join("");
  }

  function renderEducation() {
    $("#edu-grid").innerHTML = I18N[lang].journey.education.map(function (ed, i) {
      return '<div class="edu-card reveal" style="--d:' + (i * 0.08) + 's">' +
        '<span class="edu-icon">' + icon("gradcap", 19) + "</span>" +
        "<h3>" + esc(ed.degree) + "</h3>" +
        '<p class="edu-school">' + esc(ed.school) + " — " + esc(ed.place) + "</p>" +
        '<div class="edu-meta"><span class="edu-period">' + esc(ed.period) + "</span>" +
        (ed.current ? '<span class="edu-now">' + (lang === "fr" ? "En cours" : "Ongoing") + "</span>" : "") +
        "</div></div>";
    }).join("");
  }

  function renderCerts() {
    $("#certs-grid").innerHTML = I18N[lang].certs.items.map(function (c, i) {
      const link = c.link
        ? '<a class="cert-link" target="_blank" rel="noopener noreferrer" href="' + c.link + '">' +
          (lang === "fr" ? "Voir la certification" : "View credential") + " " + icon("external", 12) + "</a>"
        : "";
      return '<div class="cert-card reveal" style="--d:' + ((i % 3) * 0.08) + 's">' +
        '<span class="cert-icon">' + icon("award", 19) + "</span>" +
        "<div><h3>" + esc(c.title) + '</h3><p class="cert-meta">' + esc(c.issuer) + " · " + esc(c.year) + "</p>" + link + "</div></div>";
    }).join("");
  }

  function renderContactInfo() {
    $("#contact-info").innerHTML = I18N[lang].contact.info.map(function (i) {
      const inner = '<span class="ci-icon">' + icon(i.icon, 17) + "</span>" +
        '<span class="ci-txt"><span class="ci-label">' + esc(i.label) + '</span><span class="ci-value">' + esc(i.value) + "</span></span>";
      if (i.href) {
        const ext = i.href.indexOf("http") === 0 ? ' target="_blank" rel="noopener noreferrer"' : "";
        return "<li><a href=\"" + i.href + "\"" + ext + ">" + inner + "</a></li>";
      }
      return "<li><span class=\"no-link\">" + inner + "</span></li>";
    }).join("");
  }

  function renderFooterYear() {
    $("#footer-year").textContent = String(new Date().getFullYear());
  }

  function renderAll() {
    renderStats();
    renderMarquee();
    renderFloatChips();
    renderAboutChips();
    renderAboutInfo();
    renderSkills();
    renderProjects();
    renderTimeline();
    renderEducation();
    renderCerts();
    renderContactInfo();
    renderFooterYear();
    observeReveals();
  }

  /* ---------- Counters ---------- */
  const countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { animateCount(en.target); countIO.unobserve(en.target); }
    });
  }, { threshold: 0.5 });

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.textContent.replace(/[0-9]/g, "");
    const start = performance.now();
    const dur = 1000;
    (function frame(now) {
      const p = Math.min(1, ((now || performance.now()) - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    })();
  }

  /* ---------- Reveal ---------- */
  const revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

  function observeReveals() {
    $$(".reveal:not(.in)").forEach(function (el) {
      revealIO.observe(el);
    });
  }

  /* ---------- Typewriter ---------- */
  let typeToken = 0;
  function startTypewriter() {
    const el = $("#typewriter");
    const words = I18N[lang].hero.roles.slice();
    const my = ++typeToken;
    if (reducedMotion) { el.textContent = words[0]; return; }
    let wi = 0, ci = 0, del = false;
    (function step() {
      if (my !== typeToken) return;
      const w = words[wi % words.length];
      if (!del) {
        ci++;
        el.textContent = w.slice(0, ci);
        if (ci === w.length) { del = true; return setTimeout(step, 1800); }
        return setTimeout(step, 55 + Math.random() * 45);
      }
      ci--;
      el.textContent = w.slice(0, ci);
      if (ci === 0) { del = false; wi++; return setTimeout(step, 350); }
      return setTimeout(step, 28);
    })();
  }

  /* ---------- Terminal ---------- */
  let termToken = 0;
  function termLineHtml(line) {
    if (line.charAt(0) === "$") return '<span class="cmd">' + esc(line) + "</span>";
    const m = line.match(/^(\s*)"([^"]+)":\s*(.*)$/);
    if (m) return esc(m[1]) + '<span class="key">"' + esc(m[2]) + '"</span>: ' + esc(m[3]);
    return esc(line);
  }

  function typeTerminal() {
    const el = $("#term-body");
    const lines = I18N[lang].hero.terminal.lines;
    const my = ++termToken;
    if (reducedMotion) {
      el.innerHTML = lines.map(termLineHtml).join("\n");
      return;
    }
    let li = 0, ci = 0;
    (function step() {
      if (my !== termToken) return;
      ci++;
      if (ci > lines[li].length) { li++; ci = 0; if (li >= lines.length) { return; } return setTimeout(step, 60); }
      const done = lines.slice(0, li).map(termLineHtml).join("\n");
      const partial = termLineHtml(lines[li].slice(0, ci));
      el.innerHTML = (done ? done + "\n" : "") + partial + '<span class="caret"></span>';
      setTimeout(step, 14);
    })();
  }

  /* ---------- Particles ---------- */
  function initParticles() {
    if (reducedMotion) return;
    const canvas = $("#bg-canvas");
    const ctx = canvas.getContext("2d");
    let W, H, pts;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const n = Math.min(85, Math.round(W / 16));
      pts = Array.from({ length: n }, function () {
        return {
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
          r: 0.8 + Math.random() * 1.6,
        };
      });
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener("mouseout", function () { mouse.x = -9999; mouse.y = -9999; });

    function colors() {
      return getComputedStyle(document.documentElement).getPropertyValue("--particle").trim() || "148,163,184";
    }
    let rgb = colors();
    window.__particlesRecolor = function () { rgb = colors(); };

    (function tick() {
      if (document.hidden) { requestAnimationFrame(tick); return; }
      ctx.clearRect(0, 0, W, H);
      let i, j, a, b, d, dx, dy;
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
      }
      ctx.strokeStyle = "rgb(" + rgb + ")";
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        for (j = i + 1; j < pts.length; j++) {
          b = pts[j];
          dx = a.x - b.x; dy = a.y - b.y;
          d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.globalAlpha = (1 - d / 120) * 0.35;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        d = Math.sqrt((a.x - mouse.x) * (a.x - mouse.x) + (a.y - mouse.y) * (a.y - mouse.y));
        if (d < 150) {
          ctx.globalAlpha = (1 - d / 150) * 0.5;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "rgb(" + rgb + ")";
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    })();
  }

  /* ---------- Cursor ---------- */
  function initCursor() {
    if (!matchMedia("(pointer: fine)").matches) return;
    const dot = $(".cursor-dot"), ring = $(".cursor-ring");
    let x = window.innerWidth / 2, y = window.innerHeight / 2, rx = x, ry = y;
    window.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      dot.style.left = x + "px"; dot.style.top = y + "px";
    });
    (function loop() {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    })();
    const hoverSel = "a, button, input, textarea, .skill-card, .project-card, .chips li";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest(hoverSel)) ring.classList.add("hovering");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest(hoverSel)) ring.classList.remove("hovering");
    });
  }

  /* ---------- Tilt ---------- */
  function bindTilt() {
    if (!matchMedia("(pointer: fine)").matches || reducedMotion) return;
    $$(".project-card").forEach(function (card) {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = "1";
      card.addEventListener("mousemove", function (e) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", x * 100 + "%");
        card.style.setProperty("--my", y * 100 + "%");
        card.style.transform =
          "perspective(900px) rotateX(" + ((0.5 - y) * 4).toFixed(2) + "deg) rotateY(" +
          ((x - 0.5) * 5).toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ---------- Nav ---------- */
  function initNav() {
    const nav = $("#site-nav");
    const progress = $(".scroll-progress");
    window.addEventListener("scroll", function () {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 10);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }, { passive: true });

    const navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        const id = "#" + en.target.id;
        $$(".nav-links a, .mobile-menu nav a").forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ["hero", "about", "skills", "projects", "journey", "certifications", "contact"].forEach(function (id) {
      const s = document.getElementById(id);
      if (s) navIO.observe(s);
    });

    const burger = $("#burger"), mm = $("#mobile-menu");
    function closeMenu() {
      mm.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      mm.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    burger.addEventListener("click", function () {
      const open = mm.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      mm.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("#mobile-menu a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }

  /* ---------- Theme ---------- */
  function setTheme(th) {
    document.documentElement.setAttribute("data-theme", th);
    localStorage.setItem("theme", th);
    if (window.__particlesRecolor) window.__particlesRecolor();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", th === "dark" ? "#05070d" : "#f4f7fc");
  }

  /* ---------- Language ---------- */
  function setLang(l) {
    lang = l;
    localStorage.setItem("lang", l);
    $("#lang-fr").classList.toggle("active", l === "fr");
    $("#lang-en").classList.toggle("active", l === "en");
    $("#lang-fr").setAttribute("aria-pressed", String(l === "fr"));
    $("#lang-en").setAttribute("aria-pressed", String(l === "en"));
    applyStatic();
    renderAll();
    startTypewriter();
    typeTerminal();
  }

  /* ---------- CV ---------- */
  function checkCv() {
    fetch(SITE.cvPdf, { method: "HEAD" })
      .then(function (r) { if (!r.ok) cvFallback(); })
      .catch(function () { /* local file: no fetch — keep default link */ });
  }

  function cvFallback() {
    const btn = $("#btn-cv");
    btn.href = SITE.linkedin;
    btn.removeAttribute("download");
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
    $("#btn-cv-label").dataset.i18n = "hero.cvLinkedIn";
    applyStatic();
    let warned = false;
    btn.addEventListener("click", function () {
      if (!warned) { toast(I18N[lang].toast.cvMissing); warned = true; }
    });
  }

  /* ---------- Init ---------- */
  document.body.classList.add("loading");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);

  applyStatic();
  renderAll();
  startTypewriter();
  typeTerminal();
  initParticles();
  initCursor();
  initNav();
  checkCv();

  $("#lang-fr").addEventListener("click", function () { setLang("fr"); });
  $("#lang-en").addEventListener("click", function () { setLang("en"); });
  $("#theme-toggle").addEventListener("click", function () {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  $("#contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const f = e.target;
    const n = f.elements["name"].value.trim();
    const em = f.elements["email"].value.trim();
    const m = f.elements["message"].value.trim();
    const subject = encodeURIComponent("[Portfolio] " + (lang === "fr" ? "Message de " : "Message from ") + n);
    const body = encodeURIComponent(m + "\n\n— " + n + " (" + em + ")");
    window.location.href = "mailto:" + SITE.email + "?subject=" + subject + "&body=" + body;
    toast(I18N[lang].toast.formSent);
    f.reset();
  });

  function hidePreloader() {
    $("#preloader").classList.add("done");
    document.body.classList.remove("loading");
  }
  window.addEventListener("load", function () { setTimeout(hidePreloader, 350); });
  setTimeout(hidePreloader, 2200);
})();
