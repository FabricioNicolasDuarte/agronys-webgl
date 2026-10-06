import { InfoView } from "@/components/site/info-view";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Términos y condiciones · Agronys" };

export default function TerminosPage() {
  return (
    <SiteFrame theme="terms">
      <InfoView id="terms" />
    </SiteFrame>
  );
}
