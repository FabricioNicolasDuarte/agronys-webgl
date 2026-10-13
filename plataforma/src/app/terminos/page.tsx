import { OrbitFrame } from "@/components/orbit/shell";
import { InfoView } from "@/components/site/info-view";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio, propiedad del contenido, cuentas y ley aplicable de la República Argentina.",
  path: "/terminos",
  image: "/og/legal.jpg",
});

export default function TerminosPage() {
  return (
    <OrbitFrame theme="dark">
      <InfoView id="terms" orbit />
    </OrbitFrame>
  );
}
