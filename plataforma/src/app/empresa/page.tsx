import { PlatformView } from "@/components/site/section-views";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Empresa" };

export default function EmpresaPage() {
  return (
    <SiteFrame theme="about">
      <PlatformView />
    </SiteFrame>
  );
}
