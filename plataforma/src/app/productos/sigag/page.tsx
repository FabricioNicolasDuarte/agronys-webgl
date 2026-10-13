import { ProductDoc } from "@/components/orbit/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "SIGAG",
  description: "Jornada ganadera: hacienda, potrero, alimentación y clima. Puede incluir cámara y voz, según la configuración.",
  path: "/productos/sigag",
  image: "/og/sigag.jpg",
});

export default function Page() {
  return <ProductDoc id="sigag" />;
}
