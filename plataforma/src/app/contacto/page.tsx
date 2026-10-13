import { readFileSync } from "node:fs";
import path from "node:path";
import { OrbitFrame } from "@/components/orbit/shell";
import { ContactView } from "@/components/site/contact-view";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contacto",
  description: "Solicite una presentación. Indique el tipo de establecimiento y la decisión que desea ordenar primero.",
  path: "/contacto",
  image: "/og/contacto.jpg",
});

export default function ContactoPage() {
  const mapSvg = readFileSync(path.join(process.cwd(), "public/art/rep-regional.svg"), "utf8")
    .replace(/^\uFEFF?/, "")
    .replace(/<\?xml[^>]*>\s*/i, "");
  return (
    <OrbitFrame theme="dark">
      <ContactView mapSvg={mapSvg} />
    </OrbitFrame>
  );
}
