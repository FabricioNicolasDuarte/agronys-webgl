import { createConnectors } from "../scene/connectors.js";

export function bindPlant() {
  const video = document.querySelector("#plant-video");
  if (!(video instanceof HTMLVideoElement)) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  video.muted = true;
  video.playsInline = true;

  if (reduced) {
    video.autoplay = false;
    video.addEventListener("loadedmetadata", () => {
      video.currentTime = Math.max(0, video.duration * 0.82);
      video.pause();
    });
    return;
  }

  video.loop = true;
  video.play()?.catch(() => {
    /* autoplay bloqueado: el usuario puede pulsar Play */
  });
}

export function bindLeads() {
  const svg = document.querySelector("#leads");
  if (!svg) return;
  const connectors = createConnectors(svg);

  function tick() {
    connectors.update();
    requestAnimationFrame(tick);
  }
  window.addEventListener("resize", connectors.update);
  requestAnimationFrame(tick);
}
