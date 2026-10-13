import { SolutionsDoc } from "@/components/orbit/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Soluciones",
  description: "Productos, servicios y la tecnología que el establecimiento ya tiene.",
  path: "/soluciones",
  image: "/og/soluciones.jpg",
});

export default function SolucionesPage() {
  return <SolutionsDoc />;
}
