import { MethodView } from "@/components/site/section-views";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Método" };

export default function MetodoPage() {
  return (
    <SiteFrame theme="approach">
      <MethodView />
    </SiteFrame>
  );
}
