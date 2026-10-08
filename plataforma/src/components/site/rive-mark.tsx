"use client";

import { Lottie } from "lottie-react";

/** Gráfico creciente de la suite de ejemplos de Lottie (Bodymovin). */
export function RiveMark({ label }: { label: string }) {
  return <Lottie className="rive-mark" src="/motion/ripple.json" autoplay loop aria-label={label} role="img" />;
}
