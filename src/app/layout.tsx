// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eliteprotectionmexico.com"),
  title: {
    default: "ELITE PROTECTION",
    template: "%s | ELITE PROTECTION",
  },
  description:
    "SUV blindadas, custodia ejecutiva, traslados VIP y alojamientos de alto nivel. Coordinación 24/7 y cobertura nacional.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    title: "ELITE PROTECTION",
    description:
      "SUV blindadas, custodia ejecutiva, traslados VIP y alojamientos de alto nivel. Coordinación 24/7.",
    siteName: "ELITE PROTECTION",
    images: [
      {
        url: "/og.jpg", // crea este archivo en /public
        width: 1200,
        height: 630,
        alt: "ELITE PROTECTION",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ELITE PROTECTION",
    description:
      "SUV blindadas, custodia ejecutiva, traslados VIP y alojamientos de alto nivel. Coordinación 24/7.",
    images: ["/og.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
