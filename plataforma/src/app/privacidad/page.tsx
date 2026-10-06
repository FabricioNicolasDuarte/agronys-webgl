import { InfoView } from "@/components/site/info-view";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Privacidad · Agronys" };

export default function PrivacidadPage() {
  return (
    <SiteFrame theme="privacy">
      <InfoView id="privacy" />
    </SiteFrame>
  );
}
