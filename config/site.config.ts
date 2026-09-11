// ─────────────────────────────────────────────────────────────
// SITE CONFIGURATION
// This is the ONLY file you need to edit to rebrand this page
// for a new business, creator, or organization.
//
// Changing anything below automatically updates the live page —
// no other files need to change.
// ─────────────────────────────────────────────────────────────

import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Facebook,
  Instagram,
  MessageCircle,
  Youtube,
  ShoppingBag,
  Store,
  Briefcase,
  FolderOpen,
  ClipboardList,
  CalendarCheck,
  Mail,
  Phone,
  Link2,
  Music2,
} from "lucide-react";

// Every icon key you can reference from a link's `icon` field.
// Add more here (from lucide-react) if you need an icon that
// isn't listed yet — then reference the new key below.
export const ICONS: Record<string, LucideIcon> = {
  website: Globe,
  facebook: Facebook,
  instagram: Instagram,
  tiktok: Music2,
  messenger: MessageCircle,
  whatsapp: MessageCircle,
  youtube: Youtube,
  shopee: ShoppingBag,
  lazada: ShoppingBag,
  etsy: ShoppingBag,
  store: Store,
  portfolio: Briefcase,
  drive: FolderOpen,
  catalog: ClipboardList,
  order: ClipboardList,
  booking: CalendarCheck,
  email: Mail,
  phone: Phone,
  custom: Link2,
};

export type LinkItem = {
  /** Text shown on the button */
  title: string;
  /** Destination URL. Use tel: / mailto: for phone/email. */
  url: string;
  /** Key from the ICONS map above */
  icon: keyof typeof ICONS;
  /** Set to false to hide the button without deleting it */
  enabled: boolean;
  /** Optional: analytics event name override (defaults to a slug of the title) */
  eventName?: string;
  /** Optional: force same-tab navigation (defaults to new tab for external links) */
  openInNewTab?: boolean;
};

export type ThemeMode = "light" | "dark";
export type BackgroundStyle = "solid" | "gradient" | "pattern";
export type ButtonStyle = "solid" | "outline" | "soft";

export type Theme = {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    buttonBg: string;
    buttonText: string;
  };
  fonts: {
    headline: string; // CSS font-family stack
    secondary: string;
    body: string;
  };
  radius: string; // e.g. "16px", "9999px"
  buttonStyle: ButtonStyle;
  backgroundStyle: BackgroundStyle;
};

export type SiteConfig = {
  businessName: string;
  tagline: string;
  description?: string;
  handle?: string; // e.g. "@mademintdigitalco", shown under the links
  logo: string; // path in /public, or a full URL
  verified?: boolean;
  url: string; // the permanent landing-page URL (used for QR + SEO)
  seo: {
    title: string;
    description: string;
    ogImage?: string; // path in /public, or full URL
  };
  footer: {
    showTagline?: boolean;
    links?: { label: string; url: string }[]; // e.g. Privacy, Terms, Contact
  };
  analytics: {
    enabled: boolean;
  };
  theme: Theme;
  links: LinkItem[];
};

export const siteConfig: SiteConfig = {
  businessName: "MadeMint Digital Co.",
  tagline: "Fresh Ideas. Made Digital.",
  description: "Digital Products • Custom Designs • Ready-to-Print",
  handle: "@mademintdigitalco",
  logo: "/logo-placeholder.svg", // TODO: replace with your real logo in /public
  verified: true,
  url: "https://mademintdigital.com/links", // TODO: replace with your real domain

  seo: {
    title: "MadeMint Digital Co. | Official Links",
    description:
      "Explore MadeMint Digital Co. — digital products, custom designs, ready-to-print solutions and official social channels.",
    ogImage: "/og-image-placeholder.svg", // TODO: replace with a real 1200x630 image
  },

  footer: {
    showTagline: true,
    links: [
      // Uncomment and fill in if you want footer legal links:
      // { label: "Privacy", url: "/privacy" },
      // { label: "Terms", url: "/terms" },
      // { label: "Contact", url: "mailto:hello@example.com" },
    ],
  },

  analytics: {
    enabled: true,
  },

  theme: {
    mode: "light",
    colors: {
      primary: "#65D6AD", // MadeMint Green
      secondary: "#171717", // Charcoal
      accent: "#65D6AD",
      background: "#F7F7F3", // Soft Cream
      surface: "#FFFFFF",
      text: "#171717", // Charcoal
      muted: "#6B7280",
      buttonBg: "#FFFFFF",
      buttonText: "#171717",
    },
    fonts: {
      headline: "'Poppins', system-ui, sans-serif",
      secondary: "'Montserrat', system-ui, sans-serif",
      body: "'Poppins', system-ui, sans-serif",
    },
    radius: "18px",
    buttonStyle: "solid",
    backgroundStyle: "pattern",
  },

  // ───────────────────────────────────────────────────────────
  // LINKS — add, remove, reorder, rename freely.
  // To add a button: copy a block below and paste it wherever
  // you want it to appear in the list.
  // To disable without deleting: set enabled: false.
  // ───────────────────────────────────────────────────────────
  links: [
    {
      title: "Visit Our Website",
      url: "https://example.com", // TODO: replace placeholder
      icon: "website",
      enabled: true,
    },
    {
      title: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61594012509992", // TODO: replace placeholder
      icon: "facebook",
      enabled: true,
    },
    {
      title: "Instagram",
      url: "https://instagram.com/example", // TODO: replace placeholder
      icon: "instagram",
      enabled: true,
    },
    {
      title: "Message Us",
      url: "https://example.com/contact", // TODO: replace placeholder
      icon: "messenger",
      enabled: true,
    },
  ],
};

export default siteConfig;
