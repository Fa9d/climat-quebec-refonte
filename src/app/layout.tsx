import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  metadataBase: new URL("https://climat.quebec"),
  title: {
    default: "Climat Québec — Reprendre nos pouvoirs pour protéger notre monde",
    template: "%s · Climat Québec",
  },
  description:
    "Climat Québec est le parti politique indépendantiste entièrement dédié à l'urgence climatique et à la reprise du pouvoir citoyen. Élections générales du 5 octobre 2026.",
  openGraph: {
    title: "Climat Québec",
    description:
      "Reprendre nos pouvoirs pour protéger notre monde. Parti indépendantiste dédié à l'urgence climatique.",
    locale: "fr_CA",
    type: "website",
    siteName: "Climat Québec",
    images: [assetPath("/images/hero-territory.webp")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,500,700&f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Providers>
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
