import { InfoView } from "@/components/site/info-view";
import { SiteFrame } from "@/components/site/site-frame";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Accesibilidad",
  description: "Cómo está armado el recorrido del sitio y a dónde escribir si un camino no se puede usar.",
  path: "/accesibilidad",
  image: "/og/legal.jpg",
});

export default function AccesibilidadPage() {
  return (
    <SiteFrame theme="a11y">
      <InfoView id="a11y" />
    </SiteFrame>
  );
}
