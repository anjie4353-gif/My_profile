(function () {
  "use strict";

  const SITE = window.SITE;
  if (!SITE) return;

  const NAV_OFFSET = 72;
  let replyIndex = 0;

  /* ── applyConfig — populate all SITE-driven content ── */
  function applyConfig() {
    document.getElementById("hero-kicker").textContent = SITE.kicker;
    document.getElementById("name-line1").textContent = SITE.name.line1;
    document.getElementById("name-line2").textContent = SITE.name.line2;
    document.getElementById("hero-role").textContent = SITE.role;
    document.getElementById("hero-tagline").textContent = SITE.tagline;

    const portrait = document.getElementById("portrait-img");
    portrait.src = SITE.portrait.src;
    portrait.alt = SITE.portrait.alt;
    portrait.addEventListener("error", showPortraitPlaceholder);

    const resumeHref = SITE.resumePdf || "assets/resume.pdf";
    document.getElementById("resume-download").href = resumeHref;
    document.getElementById("resume-inline").href = resumeHref;
    document.getElementById("resume-embed").src = resumeHref;

    renderStats();
    renderWork();
    renderAbout();
    renderContact();
    applyAgentConfig();

    document.getElementById("footer-text").textContent =
      `© ${new Date().getFullYear()} ${SITE.name.line1} ${SITE.name.line2}. All rights reserved.`;
  }

  function applyAgentConfig() {
    document.getElementById("agent-title").textContent = SITE.agent.title;
    document.getElementById("agent-greeting").textContent = SITE.agent.greeting;
    document.getElementById("agent-input").placeholder = SITE.agent.placeholder;
  }

  function showPortraitPlaceholder() {
    const wrap = document.getElementById("portrait-wrap");
    wrap.innerHTML = `
      <div class="portrait-placeholder" aria-hidden="true">
        <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="88" rx="52" ry="58" fill="rgba(26,35,50,0.07)" />
          <path d="M36 248c0-42 28-72 64-72s64 30 64 72" fill="rgba(26,35,50,0.06)" />
        </svg>
      </div>`;
  }

  function renderStats() {
    const stats = document.getElementById("stats");
    stats.innerHTML = "";
    const items = [
      { label: "Years", target: SITE.stats.years },
      { label: "Projects", target: SITE.stats.projects },
      { label: "Clients", target: SITE.stats.clients },
    ];
    items.forEach(({ label, target }) => {
      const div = document.createElement("div");
      div.className = "stat";
      div.innerHTML =
        `<span class="stat__value" data-target="${target}">0</span>` +
        `<span class="stat__label">${label}</span>`;
      stats.appendChild(div);
    });
  }

  function renderWork() {
    const grid = document.getElementById("work-grid");
    grid.innerHTML = "";
    (SITE.work || []).forEach((card) => {
      const article = document.createElement("article");
      article.className = "work-card";
      article.innerHTML = `
        <p class="work-card__category">${card.category}</p>
        <h3 class="work-card__title">${card.title}</h3>
        <p class="work-card__desc">${card.description}</p>`;
      grid.appendChild(article);
    });
  }

  function renderAbout() {
    document.getElementById("about-headline").textContent = SITE.about.headline;
    const container = document.getElementById("about-text");
    container.innerHTML = "";
    SITE.about.paragraphs.forEach((p) => {
      const el = document.createElement("p");
      el.textContent = p;
      container.appendChild(el);
    });
  }

  function renderContact() {
    const email = document.getElementById("contact-email");
    email.href = `mailto:${SITE.email}`;
    email.textContent = SITE.email;

    const social = document.getElementById("social-links");
    social.innerHTML = "";
    Object.entries(SITE.social || {}).forEach(([name, url]) => {
      const a = document.createElement("a");
      a.href = url;
      a.className = "social-link";
      a.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      social.appendChild(a);
    });
  }

  /* ── Nav scroll + smooth anchor ── */
  function initNav() {
    const nav = document.querySelector(".nav");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");

    window.addEventListener(
      "scroll",
      () => nav.classList.toggle("nav--scrolled", window.scrollY > 40),
      { passive: true }
    );
    nav.classList.toggle("nav--scrolled", window.scrollY > 40);

    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    menu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection(link.getAttribute("href"));
        closeMenu();
      });
    });
  }

  function closeMenu() {
    document.getElementById("nav-menu").classList.remove("is-open");
    document.getElementById("nav-toggle").setAttribute("aria-expanded", "false");
  }

  function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }

  /* ── Reveal ── */
  function initReveal() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll("[data-reveal]");

    if (prefersReduced) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = Number(el.dataset.revealDelay || 0);
          setTimeout(() => el.classList.add("is-visible"), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el, i) => {
      el.dataset.revealDelay = String(i * 100);
      observer.observe(el);
    });
  }

  /* ── Stat counters ── */
  function initCounters() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const values = document.querySelectorAll(".stat__value");

    values.forEach((el) => {
      const target = Number(el.dataset.target);
      if (prefersReduced) {
        el.textContent = target + "+";
        return;
      }

      let started = false;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || started) return;
          started = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(eased * target) + "+";
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
    });
  }

  /* ── Helping Agent — mock reply ── */
  function initAgent() {
    const form = document.getElementById("agent-form");
    const input = document.getElementById("agent-input");
    const messages = document.getElementById("agent-messages");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      appendMessage("user", text);
      input.value = "";
      messages.hidden = false;

      setTimeout(() => appendMessage("agent", getMockReply()), 600);
    });
  }

  function getMockReply() {
    const pool = SITE.agent.mockReply;
    if (Array.isArray(pool)) {
      const reply = pool[replyIndex % pool.length];
      replyIndex += 1;
      return reply;
    }
    return pool || "Thank you for your message. I will get back to you shortly.";
  }

  function appendMessage(role, text) {
    const messages = document.getElementById("agent-messages");
    const p = document.createElement("p");
    p.className = `helping-agent__msg helping-agent__msg--${role}`;
    p.textContent = text;
    messages.appendChild(p);
    messages.scrollTop = messages.scrollHeight;
  }

  /* ── Boot ── */
  applyConfig();
  initNav();
  initReveal();
  initCounters();
  initAgent();
})();