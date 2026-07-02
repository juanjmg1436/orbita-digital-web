import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "ÓRBITA Digital | Sitios web, tiendas digitales y sistemas de gestión",
    template: `%s | ${siteConfig.brand.name}`,
  },
  description:
    "Creamos sitios web, tiendas digitales, sistemas de gestión y plataformas de capacitación para negocios, organizaciones e instituciones.",
  keywords: [
    "sitios web",
    "tiendas digitales",
    "sistemas de gestión",
    "capacitación corporativa",
    "desarrollo web Argentina",
    "ÓRBITA Digital",
  ],
  authors: [{ name: siteConfig.brand.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteConfig.siteUrl,
    siteName: siteConfig.brand.name,
    title: "ÓRBITA Digital | Sitios web, tiendas digitales y sistemas de gestión",
    description:
      "Creamos sitios web, tiendas digitales, sistemas de gestión y plataformas de capacitación para negocios, organizaciones e instituciones.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ÓRBITA Digital | Sitios web, tiendas digitales y sistemas de gestión",
    description:
      "Creamos sitios web, tiendas digitales, sistemas de gestión y plataformas de capacitación para negocios, organizaciones e instituciones.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1530",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-orbit-navy-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
