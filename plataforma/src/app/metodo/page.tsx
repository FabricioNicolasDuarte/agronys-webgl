import { SolutionDoc } from "@/components/orbit/solution";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Solución",
  description:
    "Primero se entiende la operación y la tecnología que ya existe. Después se define si corresponde un producto, un desarrollo o una integración.",
  path: "/metodo",
  image: "/og/solucion.jpg",
});

export default function MetodoPage() {
  return <SolutionDoc />;
}
