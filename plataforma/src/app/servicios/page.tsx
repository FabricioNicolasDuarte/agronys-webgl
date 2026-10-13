import { Hub } from "@/components/hub/hub";
import { OrbitFrame } from "@/components/orbit/shell";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Servicios",
  description:
    "Desarrollo, datos, producción, territorio y acompañamiento. El equipo de campo que el establecimiento ya tiene se conecta.",
  path: "/servicios",
  image: "/og/servicios.jpg",
});

export default function ServiciosPage() {
  return (
    <OrbitFrame theme="dark">
      <Hub />
    </OrbitFrame>
  );
}
