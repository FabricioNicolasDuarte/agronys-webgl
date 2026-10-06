import { ApproachView } from "@/components/site/approach-view";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Enfoque · Agronys" };

export default function EnfoquePage() {
  return (
    <SiteFrame current="/enfoque" theme="approach">
      <ApproachView />
    </SiteFrame>
  );
}
