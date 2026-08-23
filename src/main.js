import "./style.css";
import { bindLangSwitch } from "./i18n.js";
import { bindUi } from "./ui/layers.js";
import { bindHub } from "./scene/hub.js";
import { bindSiteChrome } from "./site/chrome.js";
import { mountBgVideos } from "./media/bgVideo.js";

bindSiteChrome();
mountBgVideos();
bindLangSwitch();
bindUi();
bindHub();
