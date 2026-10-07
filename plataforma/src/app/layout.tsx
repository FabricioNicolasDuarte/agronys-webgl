import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { CookieBar } from "@/components/site/cookie-bar";
import { SiteNotch } from "@/components/site/site-notch";
import "../styles/agronys.css";
import "../styles/sky.css";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

const site = "https://agronys.com";
const description =
  "La mejor forma de ver su campo. Rodeo, pasto y capital en un solo lugar: decida a tiempo, reduzca recorridos y controle el resultado de la campaña.";

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
      { url: "/favicon.ico", sizes: "any" },
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
        alt: "Agronys — la mejor forma de ver tu campo",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={plex.variable}>
      <body>
        {children}
        <SiteNotch />
        <CookieBar />
      </body>
    </html>
  );
}
