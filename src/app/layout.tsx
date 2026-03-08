import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppLayout from "@/components/AppLayout";

export const metadata: Metadata = {
  title: "SocialColab — Rede Social Corporativa",
  description:
    "A plataforma que conecta todos os colaboradores da empresa, facilitando comunicação, colaboração e produtividade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
