import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export default function BrandHeader() {
  const { businessName, tagline, description, logo, verified } = siteConfig;

  return (
    <header className="flex flex-col items-center text-center gap-3 animate-fade-up">
      {logo ? (
        <div className="relative w-20 h-20 rounded-full overflow-hidden ring-1 ring-black/5 bg-surface shadow-sm">
          <Image
            src={logo}
            alt={`${businessName} logo`}
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="flex items-center gap-1.5">
        <h1 className="font-headline font-bold text-2xl text-text tracking-tight">
          {businessName}
        </h1>
        {verified ? (
          <BadgeCheck
            className="w-5 h-5 text-primary shrink-0"
            aria-label="Verified"
          />
        ) : null}
      </div>

      {tagline ? (
        <p className="font-secondary text-sm text-text/80">{tagline}</p>
      ) : null}

      {description ? (
        <p className="font-body text-xs text-muted max-w-[320px]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
