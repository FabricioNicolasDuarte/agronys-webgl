import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { CookieBar } from "@/components/site/cookie-bar";
import { Soundscape } from "@/components/site/soundscape";
import { PlaceBar } from "@/components/hub/place-bar";
import { organizationJsonLd, SITE } from "@/lib/seo";
import "../styles/agronys.css";
import "../styles/sky.css";
import "../styles/sections.css";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

const site = SITE;
const description =
  "Agronys desarrolla y comercializa software, datos e integración para el establecimiento. Nutrogan, SIGAG y Datagronys son tres de sus productos.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Agronys",
    template: "%s · Agronys",
  },
  description,
  applicationName: "Agronys",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "512x512" }],
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: site,
    siteName: "Agronys",
    title: "Agronys",
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Agronys. Tu operación. Nuestro sistema. Vos lo operás.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agronys",
    description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0e0d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={plex.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {children}
        <PlaceBar />
        <CookieBar />
        <Soundscape />
      </body>
    </html>
  );
}
