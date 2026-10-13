import { OrbitFrame } from "@/components/orbit/shell";
import { InfoView } from "@/components/site/info-view";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacidad",
  description:
    "Quién responde por los datos de este sitio, para qué se usan, durante cuánto tiempo y cómo pedir acceso, rectificación o supresión.",
  path: "/privacidad",
  image: "/og/legal.jpg",
});

export default function PrivacidadPage() {
  return (
    <OrbitFrame theme="dark">
      <InfoView id="privacy" orbit />
    </OrbitFrame>
  );
}
