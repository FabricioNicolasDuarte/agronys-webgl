import { CookiesView } from "@/components/site/cookies-view";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Cookies · Agronys" };

export default function CookiesPage() {
  return (
    <SiteFrame current="/cookies" theme="cookies">
      <CookiesView />
    </SiteFrame>
  );
}
