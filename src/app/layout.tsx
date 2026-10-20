import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/content/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(profile.origin),
  title: {
    default: "Om Tiwari — Websites with a pulse.",
    template: "%s · Om Tiwari",
  },
  description:
    "I'm Om, a creative developer designing and building memorable websites and useful web products. Explore ACM SNU, Surge and Brand AI-Readiness Audit.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Om Tiwari",
    title: "Websites with a pulse. — Om Tiwari",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Om Tiwari. Creative developer. Websites with a pulse.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/space-grotesk-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
