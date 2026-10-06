import { InfoView } from "@/components/site/info-view";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Accesibilidad · Agronys" };

export default function AccesibilidadPage() {
  return (
    <SiteFrame theme="a11y">
      <InfoView id="a11y" />
    </SiteFrame>
  );
}
