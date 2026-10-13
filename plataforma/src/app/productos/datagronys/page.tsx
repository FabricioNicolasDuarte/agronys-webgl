import { ProductDoc } from "@/components/orbit/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Datagronys",
  description:
    "Lectura de la campaña. Ordena planillas y datos del establecimiento: evolución, carga, horas de calor y condición, cuando esos datos existen.",
  path: "/productos/datagronys",
  image: "/og/datagronys.jpg",
});

export default function Page() {
  return <ProductDoc id="datagronys" />;
}
