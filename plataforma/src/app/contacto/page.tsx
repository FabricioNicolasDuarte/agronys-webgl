import { readFileSync } from "node:fs";
import path from "node:path";
import { ContactView } from "@/components/site/contact-view";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Contacto · Agronys" };

export default function ContactoPage() {
  const mapSvg = readFileSync(path.join(process.cwd(), "public/art/rep-regional.svg"), "utf8")
    .replace(/^\uFEFF?/, "")
    .replace(/<\?xml[^>]*>\s*/i, "");
  return (
    <SiteFrame current="/contacto" theme="contact">
      <ContactView mapSvg={mapSvg} />
    </SiteFrame>
  );
}
