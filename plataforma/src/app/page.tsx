import fs from "node:fs";
import path from "node:path";
import { HomeStage } from "@/components/hub/home-stage";

export default function HomePage() {
  const riv = path.join(process.cwd(), "public", "motion", "hub.riv");
  return <HomeStage rive={fs.existsSync(riv)} />;
}
