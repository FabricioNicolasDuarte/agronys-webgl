import { InfoView } from "@/components/site/info-view";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Aviso legal · Agronys" };

export default function AvisoLegalPage() {
  return (
    <SiteFrame theme="legal">
      <InfoView id="notice" />
    </SiteFrame>
  );
}
