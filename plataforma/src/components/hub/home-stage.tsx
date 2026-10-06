"use client";

import dynamic from "next/dynamic";
import { Hub } from "@/components/hub/hub";

const RiveHub = dynamic(() => import("@/components/hub/rive-hub").then((mod) => mod.RiveHub), {
  ssr: false,
});

export function HomeStage({ rive }: { rive: boolean }) {
  if (rive) return <RiveHub />;
  return <Hub />;
}
