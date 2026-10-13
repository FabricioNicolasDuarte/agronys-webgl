import { CompanyDoc } from "@/components/orbit/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Empresa",
  description:
    "Agronys es una empresa de soluciones tecnológicas para el agro. Desarrolla y comercializa software, datos e integración para el establecimiento.",
  path: "/empresa",
  image: "/og/empresa.jpg",
});

export default function EmpresaPage() {
  return <CompanyDoc />;
}
