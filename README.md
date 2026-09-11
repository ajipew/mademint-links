# LinkLanding

A fast, mobile-first "link in bio" landing page, built for QR codes. One
permanent URL, unlimited customizable buttons, and one config file that
controls the whole page. Ships branded as **MadeMint Digital Co.** by
default — replace the config to rebrand it for any business in minutes.

Built with Next.js 14 (App Router), React, TypeScript, and Tailwind CSS.
Deploys to Vercel with zero code changes.

---

## 1. What's inside

```
/app
  layout.tsx        → fonts, SEO/OG/Twitter metadata, theme variables
  page.tsx           → the public landing page
  globals.css        → base styles, background style variants
  admin/qr/page.tsx  → unlisted QR code generator (visit /admin/qr)
/components
  BrandHeader.tsx    → logo, name, tagline, description, verified badge
  LinkButton.tsx      → a single link button (accessible, animated)
  LinkList.tsx        → renders all enabled links in order
  Footer.tsx          → copyright (auto-updating year), optional legal links
  QRCodeGenerator.tsx → generate/download the QR code (PNG + SVG)
  PageViewTracker.tsx → fires the page_view analytics event
/config
  site.config.ts     → ⭐ THE ONLY FILE YOU NEED TO EDIT TO REBRAND ⭐
/lib
  analytics.ts       → privacy-friendly event tracking (no cookies/PII)
  url.ts             → link safety validation
/public
  logo-placeholder.svg, og-image-placeholder.svg, favicon.ico
```

---

## 2. Local development

Requirements: Node.js 18.18+ (Node 20 LTS recommended) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit `config/site.config.ts` — the page
hot-reloads automatically.

Visit http://localhost:3000/admin/qr to preview and download the QR code.

---

## 3. Deploying to Vercel

1. Push this project to a GitHub, GitLab, or Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no build settings need to change.
4. Click **Deploy**. You'll get a URL like `linklanding.vercel.app`.

Or deploy straight from your machine with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

---

## 4. Connecting a custom domain

1. In the Vercel dashboard, open your project → **Settings → Domains**.
2. Add your domain (e.g. `mademintdigital.com` or a subdomain like
   `links.mademintdigital.com`).
3. Vercel shows you a DNS record (an `A` record or `CNAME`) — add it at
   your domain registrar (e.g. Namecheap, GoDaddy, Cloudflare).
4. Wait for DNS to propagate (usually minutes, sometimes a few hours).
5. **Important:** once you have your final domain, update
   `siteConfig.url` in `config/site.config.ts` to match it exactly — this
   is the URL that gets encoded into your QR code and used for SEO/OG
   tags. Redeploy after changing it.

---

## 5. Changing the logo

1. Add your image file to `/public` (e.g. `public/my-logo.png`). Square
   images work best (e.g. 200×200px or larger).
2. In `config/site.config.ts`, update:
   ```ts
   logo: "/my-logo.png",
   ```
3. To use an external image URL instead, just paste the full URL there
   — Next.js Image is already configured to allow any HTTPS host.

---

## 6. Changing colors, fonts, and style

Everything lives under `theme` in `config/site.config.ts`:

```ts
theme: {
  mode: "light",                 // "light" | "dark"
  colors: {
    primary: "#65D6AD",
    secondary: "#171717",
    accent: "#65D6AD",
    background: "#F7F7F3",
    surface: "#FFFFFF",
    text: "#171717",
    muted: "#6B7280",
    buttonBg: "#FFFFFF",
    buttonText: "#171717",
  },
  fonts: {
    headline: "'Poppins', system-ui, sans-serif",
    secondary: "'Montserrat', system-ui, sans-serif",
    body: "'Poppins', system-ui, sans-serif",
  },
  radius: "18px",                // button/card corner rounding
  buttonStyle: "solid",          // "solid" | "outline" | "soft"
  backgroundStyle: "pattern",    // "solid" | "gradient" | "pattern"
}
```

Changing any of these values updates the whole page immediately — no
other files need touching. If you switch fonts to something other than
Poppins/Montserrat, update the `next/font/google` imports at the top of
`app/layout.tsx` to load the new font family, then reference it in
`fonts.headline` / `fonts.body`.

---

## 7. Adding, removing, and reordering buttons

All buttons live in the `links` array in `config/site.config.ts`:

```ts
links: [
  {
    title: "Visit Our Website",
    url: "https://example.com",
    icon: "website",
    enabled: true,
  },
  // ...more buttons
],
```

- **Add a button:** copy one block and paste it wherever you want it to
  appear — order in the array = order on the page.
- **Remove a button:** delete its block (or set `enabled: false` to hide
  it temporarily without deleting it).
- **Rename a button:** change `title`.
- **Change where it goes:** change `url`.
- **Reorder buttons:** cut and paste blocks into a new order.
- **Change the icon:** set `icon` to any key from the `ICONS` map at the
  top of `config/site.config.ts` (`website`, `facebook`, `instagram`,
  `tiktok`, `messenger`, `whatsapp`, `youtube`, `shopee`, `lazada`,
  `etsy`, `store`, `portfolio`, `drive`, `catalog`, `order`, `booking`,
  `email`, `phone`, `custom`). Need one that isn't listed? Import it
  from `lucide-react` and add it to the `ICONS` object.
- **Email/phone buttons:** use `url: "mailto:you@example.com"` or
  `url: "tel:+639171234567"`.

**Placeholder links:** any button still pointing at `example.com` shows
a small "Placeholder link" note under its title on the live page, so you
don't forget to replace it before sharing the QR code. Replace the
`url` field to make the note disappear.

---

## 8. Generating your QR code

The QR code always encodes **one URL** — `siteConfig.url` — never a
per-platform link. That's the point: you print/share this QR code once,
and can keep changing the buttons behind it forever without reprinting.

1. Set `siteConfig.url` to your real, final domain.
2. Deploy (or run locally).
3. Visit `/admin/qr` (e.g. `https://yourdomain.com/admin/qr`).
4. Choose a resolution (2048px recommended for print) and error
   correction level (High is best if you plan to add a logo overlay).
5. Download as PNG (raster, universal) or SVG (vector, best for large
   print like signage or packaging).

This route is unlisted (not linked anywhere on the public page) but is
not password-protected — if that matters for your use case, remove the
route after generating your file, or add your own auth check to
`app/admin/qr/page.tsx`.

---

## 9. Analytics

Analytics are privacy-friendly by default: no cookies, no personal data
collected, nothing sent anywhere unless you wire it up.

Every click fires two readable events (e.g. clicking "Instagram" fires
`link_click` and `instagram_click`); page loads fire `page_view`.

- **To disable entirely:** set `analytics.enabled: false` in
  `config/site.config.ts`.
- **To connect Plausible:** add the Plausible script tag to
  `app/layout.tsx`; events are forwarded automatically if
  `window.plausible` exists.
- **To connect anything else** (GA4, PostHog, Vercel Analytics, your own
  backend): listen for the event in your own script:
  ```js
  window.addEventListener("linklanding:event", (e) => {
    console.log(e.detail.name, e.detail.props);
  });
  ```

See `lib/analytics.ts` for the full implementation.

---

## 10. Security notes

- All outbound URLs are validated (`lib/url.ts`) — only `https:`,
  `http:`, `mailto:`, `tel:`, and `sms:` links are rendered.
- External links automatically get `target="_blank"` with
  `rel="noopener noreferrer"`.
- No API keys or secrets are used by this project, so there's nothing
  sensitive in the client bundle. If you later add a backend/analytics
  API key, put it in a `.env.local` file (already gitignored) and only
  reference it from server-side code.

---

## 11. Performance

- Fonts load via `next/font/google` (self-hosted, no external request,
  no layout shift).
- Images use `next/image` for automatic optimization and responsive
  sizing.
- No client-side JavaScript frameworks beyond what Next.js ships;
  the QR generator code only loads on the `/admin/qr` route, not on the
  public page.
- Typical Lighthouse scores on Vercel's edge network are 95–100 across
  Performance, Accessibility, Best Practices, and SEO for this template
  — actual scores depend on the logo/OG image you upload, so keep those
  reasonably sized (a few hundred KB at most).

---

## 12. Placeholder content checklist

Before sharing your QR code, replace these TODOs in
`config/site.config.ts`:

- [ ] `logo` — your real logo file
- [ ] `url` — your real, final domain
- [ ] `seo.ogImage` — a real 1200×630 social preview image
- [ ] Every `links[].url` currently pointing at `example.com`

Nothing else needs to change to go live.
