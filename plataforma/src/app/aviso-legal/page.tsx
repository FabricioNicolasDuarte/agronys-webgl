import { InfoView } from "@/components/site/info-view";
import { SiteFrame } from "@/components/site/site-frame";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Aviso legal",
  description: "Titular del sitio, carácter informativo del contenido y alcance respecto del contrato.",
  path: "/aviso-legal",
  image: "/og/legal.jpg",
});

export default function AvisoLegalPage() {
  return (
    <SiteFrame theme="legal">
      <InfoView id="notice" />
    </SiteFrame>
  );
}
