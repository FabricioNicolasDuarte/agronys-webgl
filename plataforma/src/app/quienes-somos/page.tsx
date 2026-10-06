import { AboutView } from "@/components/site/about-view";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Quiénes somos · Agronys" };

export default function QuienesPage() {
  return (
    <SiteFrame current="/quienes-somos" theme="about">
      <AboutView />
    </SiteFrame>
  );
}
