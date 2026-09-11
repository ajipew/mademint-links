import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.url,
    siteName: siteConfig.businessName,
    images: siteConfig.seo.ogImage ? [siteConfig.seo.ogImage] : [],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: siteConfig.seo.ogImage ? [siteConfig.seo.ogImage] : [],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = siteConfig;
  const c = theme.colors;

  // Theme tokens as CSS custom properties, generated from the
  // single config file. Nothing below needs to change per-brand.
  const themeStyle = {
    "--color-primary": c.primary,
    "--color-secondary": c.secondary,
    "--color-accent": c.accent,
    "--color-bg": c.background,
    "--color-surface": c.surface,
    "--color-text": c.text,
    "--color-muted": c.muted,
    "--color-btn-bg": c.buttonBg,
    "--color-btn-text": c.buttonText,
    "--font-headline": theme.fonts.headline,
    "--font-secondary": theme.fonts.secondary,
    "--font-body": theme.fonts.body,
    "--radius": theme.radius,
  } as React.CSSProperties;

  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body
        style={themeStyle}
        data-theme-mode={theme.mode}
        data-bg-style={theme.backgroundStyle}
        className="min-h-screen bg-bg text-text font-body antialiased"
      >
        {children}
      </body>
    </html>
  );
}
