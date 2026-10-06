import "./style.css";
import { bindLangSwitch, applyChromeI18n } from "./i18n.js";
import { bindSiteChrome } from "./site/chrome.js";
import { renderPage } from "./content/pages.js";
import { mountBgVideos } from "./media/bgVideo.js";
import { mountProductDeck } from "./ui/products.js";

function paintInner() {
  const main = document.querySelector("main");
  const page = document.body.dataset.page;
  if (main && page) renderPage(main, page);
  if (page === "products") mountProductDeck(document.querySelector(".prod-root"));
  applyChromeI18n();
}

bindSiteChrome();
mountBgVideos();
paintInner();
bindLangSwitch();
window.addEventListener("agronys:lang", paintInner);
