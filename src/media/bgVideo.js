const FILES = {
  about: "galaxy-g.mp4",
  approach: "xiaomi-3.mp4",
  products: "galaxy-f.mp4",
  services: "galaxy-a.mp4",
  contact: "xiaomi-1.mp4",
  legal: "xiaomi-vid.mp4",
  privacy: "xiaomi-6.mp4",
  cookies: "galaxy-d.mp4",
  terms: "brangus.mp4",
  a11y: "xiaomi-3.mp4",
};

export function mountBgVideos() {
  if ((document.body.dataset.page || "index") === "index") return;

  const host = document.querySelector(".doc-bg");
  if (!host) return;

  host.querySelectorAll(".bg-video").forEach((el) => el.remove());

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const file = FILES[document.body.dataset.page];
  if (!file) return;

  const video = document.createElement("video");
  video.className = "bg-video";
  video.setAttribute("muted", "");
  video.muted = true;
  video.defaultMuted = true;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("aria-hidden", "true");
  video.src = `/media/video/${file}`;
  host.prepend(video);
  const play = () => video.play().catch(() => {});
  video.addEventListener("canplay", play, { once: true });
  play();
}
