import { OrbitFrame } from "@/components/orbit/shell";
import { CookiesView } from "@/components/site/cookies-view";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Cookies",
  description: "Este sitio guarda una preferencia técnica para el aviso. No usa cookies de publicidad ni de analítica de marketing.",
  path: "/cookies",
  image: "/og/legal.jpg",
});

export default function CookiesPage() {
  return (
    <OrbitFrame theme="dark">
      <CookiesView />
    </OrbitFrame>
  );
}
