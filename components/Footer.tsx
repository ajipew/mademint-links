import { siteConfig } from "@/config/site.config";

export default function Footer() {
  const year = new Date().getFullYear();
  const { businessName, tagline, footer, handle } = siteConfig;

  return (
    <footer className="flex flex-col items-center gap-2 text-center pt-6 pb-2">
      {handle ? (
        <p className="font-secondary text-xs text-muted">{handle}</p>
      ) : null}

      {footer.showTagline && tagline ? (
        <p className="font-body text-xs text-muted">{tagline}</p>
      ) : null}

      {footer.links && footer.links.length > 0 ? (
        <div className="flex items-center gap-3 text-xs text-muted">
          {footer.links.map((link, i) => (
            <a
              key={link.label}
              href={link.url}
              className="hover:text-text underline-offset-2 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}

      <p className="font-body text-[11px] text-muted/80">
        © {year} {businessName}
      </p>
    </footer>
  );
}
