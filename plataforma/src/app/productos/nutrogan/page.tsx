import { ProductDoc } from "@/components/orbit/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Nutrogan",
  description: "Registro de campo en el teléfono: pesos, movimientos, agua, lluvia y mapa de potreros. Sincroniza cuando hay señal.",
  path: "/productos/nutrogan",
  image: "/og/nutrogan.jpg",
});

export default function Page() {
  return <ProductDoc id="nutrogan" />;
}
