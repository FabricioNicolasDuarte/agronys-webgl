import { InfoView } from "@/components/site/info-view";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Preguntas frecuentes · Agronys" };

export default function FaqPage() {
  return (
    <SiteFrame theme="legal">
      <InfoView id="faq" />
    </SiteFrame>
  );
}
