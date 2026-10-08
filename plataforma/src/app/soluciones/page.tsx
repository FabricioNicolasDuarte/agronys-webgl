import { SolutionsView } from "@/components/site/section-views";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Soluciones" };

export default function SolucionesPage() {
  return (
    <SiteFrame theme="services">
      <SolutionsView />
    </SiteFrame>
  );
}
