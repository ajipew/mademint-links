import { siteConfig } from "@/config/site.config";
import LinkButton from "./LinkButton";

export default function LinkList() {
  const links = siteConfig.links.filter((l) => l.enabled);

  if (links.length === 0) {
    return (
      <p className="text-center text-sm text-muted py-6">
        No links yet — add one in{" "}
        <code className="font-mono text-xs">config/site.config.ts</code>.
      </p>
    );
  }

  return (
    <nav aria-label="Links" className="flex flex-col gap-3 w-full">
      {links.map((link, i) => (
        <LinkButton key={`${link.title}-${i}`} link={link} />
      ))}
    </nav>
  );
}
