"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode as QrCodeIcon } from "lucide-react";
import { siteConfig } from "@/config/site.config";

/**
 * Optional admin-only QR generator.
 *
 * Not linked from the public page by default — mount it on an
 * internal/admin route (see /app/admin/qr/page.tsx) if you want
 * a UI for generating and downloading the QR code that should be
 * printed or embedded wherever you advertise this landing page.
 *
 * The QR always encodes `siteConfig.url` — the ONE permanent
 * landing-page link — never an individual social link.
 */
export default function QRCodeGenerator() {
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [size, setSize] = useState(1024);
  const [errorCorrection, setErrorCorrection] = useState<
    "L" | "M" | "Q" | "H"
  >("H");

  useEffect(() => {
    let cancelled = false;

    async function generate() {
      const opts: QRCode.QRCodeToDataURLOptions = {
        width: size,
        margin: 4, // white quiet zone
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: "#171717",
          light: "#FFFFFFFF",
        },
      };

      const [png, svg] = await Promise.all([
        QRCode.toDataURL(siteConfig.url, opts),
        QRCode.toString(siteConfig.url, {
          type: "svg",
          margin: 4,
          errorCorrectionLevel: errorCorrection,
          color: { dark: "#171717", light: "#FFFFFFFF" },
        }),
      ]);

      if (!cancelled) {
        setPngUrl(png);
        setSvgMarkup(svg);
      }
    }

    generate();
    return () => {
      cancelled = true;
    };
  }, [size, errorCorrection]);

  function downloadPng() {
    if (!pngUrl) return;
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = "qr-code.png";
    a.click();
  }

  function downloadSvg() {
    if (!svgMarkup) return;
    const blob = new Blob([svgMarkup], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-4 p-6 rounded-2xl bg-surface ring-1 ring-black/5">
      <div className="flex items-center gap-2 text-text">
        <QrCodeIcon className="w-5 h-5" />
        <h2 className="font-headline font-semibold text-base">
          Landing Page QR Code
        </h2>
      </div>

      <p className="text-xs text-muted text-center break-all">
        Encodes: <span className="font-mono">{siteConfig.url}</span>
      </p>

      <div className="bg-white p-4 rounded-xl ring-1 ring-black/5">
        {pngUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pngUrl} alt="QR code preview" width={200} height={200} />
        ) : (
          <div className="w-[200px] h-[200px] animate-pulse bg-gray-100 rounded" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 w-full text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted">Resolution</span>
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="rounded-lg border border-black/10 px-2 py-1.5 bg-white"
          >
            <option value={512}>512px (web)</option>
            <option value={1024}>1024px (print)</option>
            <option value={2048}>2048px (high-res print)</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted">Error correction</span>
          <select
            value={errorCorrection}
            onChange={(e) =>
              setErrorCorrection(e.target.value as "L" | "M" | "Q" | "H")
            }
            className="rounded-lg border border-black/10 px-2 py-1.5 bg-white"
          >
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="Q">Quartile</option>
            <option value="H">High (best for print/logos)</option>
          </select>
        </label>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={downloadPng}
          disabled={!pngUrl}
          className="flex-1 flex items-center justify-center gap-2 rounded-theme bg-btn-bg text-btn-text ring-1 ring-black/10 px-4 py-2.5 text-sm font-medium hover:-translate-y-0.5 transition-transform disabled:opacity-50"
        >
          <Download className="w-4 h-4" /> PNG
        </button>
        <button
          onClick={downloadSvg}
          disabled={!svgMarkup}
          className="flex-1 flex items-center justify-center gap-2 rounded-theme bg-btn-bg text-btn-text ring-1 ring-black/10 px-4 py-2.5 text-sm font-medium hover:-translate-y-0.5 transition-transform disabled:opacity-50"
        >
          <Download className="w-4 h-4" /> SVG
        </button>
      </div>
    </div>
  );
}
