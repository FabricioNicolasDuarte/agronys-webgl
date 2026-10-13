import type { Metadata } from "next";

export const SITE = "https://agronys.com";

const DESCRIPTION =
  "Agronys desarrolla y comercializa software, datos e integración para el establecimiento. Nutrogan, SIGAG y Datagronys son tres de sus productos.";

export function pageMeta({
  title,
  description,
  path,
  image = "/og.jpg",
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: index ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: path,
      siteName: "Agronys",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const homeMeta: Metadata = {
  ...pageMeta({
    title: "Agronys",
    description: DESCRIPTION,
    path: "/",
  }),
  title: { absolute: "Agronys" },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Agronys",
      url: SITE,
      logo: `${SITE}/favicon.png`,
      email: "contacto@agronys.com",
      foundingDate: "2022",
      areaServed: ["Argentina", "Paraguay", "Uruguay"],
      description: DESCRIPTION,
    },
    {
      "@type": "WebSite",
      name: "Agronys",
      url: SITE,
      inLanguage: "es-AR",
      publisher: { "@type": "Organization", name: "Agronys", url: SITE },
    },
  ],
};
