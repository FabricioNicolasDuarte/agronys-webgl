"use client";

import { useRive } from "@rive-app/react-canvas";

/** Reemplaza el SVG cuando exista public/motion/hub.riv exportado desde rive.app. */
export function RiveHub() {
  const { RiveComponent } = useRive({
    src: "/motion/hub.riv",
    autoplay: true,
  });
  return (
    <div className="portal">
      <div className="field" aria-hidden="true" />
      <RiveComponent style={{ width: "min(100%, 920px)", height: "70vh", margin: "auto" }} />
    </div>
  );
}
