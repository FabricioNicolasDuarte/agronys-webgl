import { ServiceCatalog } from "@/components/site/service-catalog";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Servicios · Agronys" };

export default function ServiciosPage() {
  return (
    <SiteFrame current="/servicios" theme="services">
      <ServiceCatalog />
    </SiteFrame>
  );
}
