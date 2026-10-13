import { Cuenta } from "@/components/cuenta/cuenta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Entrar",
  description: "Sistema cerrado. Pedir credenciales a tu representante Agronys.",
  path: "/entrar",
  index: false,
});

export default function EntrarPage() {
  return <Cuenta />;
}
