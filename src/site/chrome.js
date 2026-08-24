import { langSwitchMarkup } from "../i18n.js";

function ensureLangSwitch() {
  const head = document.querySelector(".topbar .top-actions") || document.querySelector(".doc-head");
  let box = document.querySelector(".lang-switch");
  if (!box) {
    if (!head) return;
    box = document.createElement("div");
    box.className = "lang-switch";
    box.setAttribute("role", "group");
    head.prepend(box);
  }
  box.innerHTML = langSwitchMarkup();
}

function bindLegalToggle() {
  document.querySelectorAll(".legal-toggle").forEach((btn) => {
    const wrap = btn.closest(".legal-mini");
    const panel = wrap?.querySelector(".legal-panel") || document.getElementById(btn.getAttribute("aria-controls") || "legal-panel");
    if (!wrap || !panel) return;
    const setOpen = (open) => {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    };
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(btn.getAttribute("aria-expanded") !== "true");
    });
  });
  if (document.documentElement.dataset.legalBound === "1") return;
  document.documentElement.dataset.legalBound = "1";
  document.addEventListener("click", (e) => {
    if (e.target.closest(".legal-mini")) return;
    document.querySelectorAll(".legal-toggle").forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".legal-panel").forEach((panel) => {
      panel.hidden = true;
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".legal-toggle").forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    document.querySelectorAll(".legal-panel").forEach((panel) => {
      panel.hidden = true;
    });
  });
}

function pageName() {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  return file || "index.html";
}

function dockLink(href, label, key) {
  const current = pageName();
  const on = current === href.replace("./", "");
  return `<a class="dock-link" href="${href}" data-i18n="${key}"${on ? ' aria-current="page"' : ""}>${label}</a>`;
}

export function mountDocFrame() {
  if (!document.body.classList.contains("doc")) return;
  if (document.querySelector(".doc-portal")) return;
  const main = document.querySelector("main");
  if (!main) return;

  document.querySelector(".doc-head")?.remove();
  document.querySelector(".site-foot")?.remove();

  const portal = document.createElement("div");
  portal.className = "portal doc-portal theme-" + (document.body.dataset.page || "legal");
  portal.innerHTML = `
      <div class="doc-bg" aria-hidden="true"></div>
      <div class="doc-ui">
        <header class="topbar">
          <nav class="dock doc-dock" data-i18n-aria="navDock">
            ${dockLink("./index.html", "Portal", "navPortal")}
            ${dockLink("./quienes-somos.html", "Quienes somos", "navAbout")}
            ${dockLink("./enfoque.html", "Enfoque", "navApproach")}
            ${dockLink("./servicios.html", "Servicios", "navServices")}
            ${dockLink("./productos.html", "Productos", "navProducts")}
            ${dockLink("./contacto.html", "Contacto", "navContact")}
          </nav>
          <p class="brand">
            <a href="./index.html">
              <img class="brand-logo" src="./icons/marca-skadia.svg" alt="Skadia" />
            </a>
          </p>
          <div class="top-actions">
            <div class="lang-switch" role="group" data-i18n-aria="lang"></div>
            <a class="profile" href="./contacto.html" data-i18n-aria="profile">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.5" />
                <path d="M5 19c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </a>
          </div>
        </header>
        <div class="doc-stage"></div>
      </div>
      <footer class="legal-mini">
        <button type="button" class="legal-toggle" aria-expanded="false" aria-controls="legal-panel">
          <span data-i18n="legal">Legal</span>
          <span class="legal-copy">\u00a9 <span id="y"></span></span>
        </button>
        <nav id="legal-panel" class="legal-panel" hidden data-i18n-aria="legal">
          <a href="./aviso-legal.html" data-i18n="legalNotice">Aviso legal</a>
          <a href="./privacidad.html" data-i18n="privacy">Privacidad</a>
          <a href="./cookies.html" data-i18n="cookiesLink">Cookies</a>
          <a href="./terminos.html" data-i18n="terms">Terminos</a>
          <a href="./accesibilidad.html" data-i18n="a11y">Accesibilidad</a>
          <a href="./contacto.html" data-i18n="contact">Contacto</a>
        </nav>
      </footer>
    `;

  const stage = portal.querySelector(".doc-stage");
  main.classList.add("doc-panel");
  const legalPages = new Set(["legal", "privacy", "cookies", "terms", "a11y"]);
  if (legalPages.has(document.body.dataset.page)) main.classList.add("is-legal");
  stage.appendChild(main);

  const skip = document.querySelector(".skip-link");
  if (skip) skip.after(portal);
  else document.body.prepend(portal);
}

export function bindSiteChrome() {
  mountDocFrame();
  ensureLangSwitch();
  bindLegalToggle();
  const year = document.querySelector("#y");
  if (year) year.textContent = String(new Date().getFullYear());

  const bar = document.querySelector("#cookies-bar");
  const ok = document.querySelector("#cookies-ok");
  try {
    if (bar && !localStorage.getItem("skadia-cookies")) bar.hidden = false;
  } catch {
    if (bar) bar.hidden = false;
  }
  ok?.addEventListener("click", () => {
    try {
      localStorage.setItem("skadia-cookies", "1");
    } catch {
      /* ignore */
    }
    if (bar) bar.hidden = true;
  });
}
