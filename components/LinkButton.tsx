"use client";

import { ArrowUpRight } from "lucide-react";
import { ICONS, type LinkItem } from "@/config/site.config";
import { isExternalLink, isSafeUrl } from "@/lib/url";
import { trackLinkClick } from "@/lib/analytics";

export default function LinkButton({ link }: { link: LinkItem }) {
  if (!link.enabled) return null;
  if (!isSafeUrl(link.url)) return null;

  const Icon = ICONS[link.icon] ?? ICONS.custom;
  const external = link.openInNewTab ?? isExternalLink(link.url);
  const isPlaceholder = link.url.includes("example.com");

  return (
    <a
      href={link.url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => trackLinkClick(link.title, link.url)}
      className="
        group relative flex items-center gap-3 w-full
        rounded-theme bg-btn-bg text-btn-text
        px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)]
        ring-1 ring-black/5
        transition-all duration-150 ease-out
        hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]
        active:translate-y-0 active:scale-[0.99]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg
      "
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/15 text-secondary shrink-0">
        <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
      </span>

      <span className="flex-1 text-left font-body font-medium text-[15px] leading-snug">
        {link.title}
        {isPlaceholder ? (
          <span className="block text-[11px] font-normal text-muted">
            Placeholder link — replace in config/site.config.ts
          </span>
        ) : null}
      </span>

      <ArrowUpRight
        className="w-4 h-4 text-muted shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}
