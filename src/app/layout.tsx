export const metadata = {
  title: "ELITE Transport",
  description: "Mockup landing",
};

import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
