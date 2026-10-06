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

export const metadata: Metadata = {
  title: "Agronys",
  description: "La herramienta de tu campo: el rodeo, el potrero y los números de la campaña, para decidir a tiempo y cuidar la plata.",
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
