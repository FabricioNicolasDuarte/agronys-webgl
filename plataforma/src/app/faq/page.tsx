import { InfoView } from "@/components/site/info-view";
import { SiteFrame } from "@/components/site/site-frame";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Preguntas frecuentes",
  description: "Qué es Agronys, cuáles son los productos y cómo se solicita una presentación.",
  path: "/faq",
  image: "/og/legal.jpg",
});

export default function FaqPage() {
  return (
    <SiteFrame theme="legal">
      <InfoView id="faq" />
    </SiteFrame>
  );
}
