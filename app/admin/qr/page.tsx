import QRCodeGenerator from "@/components/QRCodeGenerator";

// This route is intentionally unlisted (no public link points to it).
// Visit it directly at /admin/qr whenever you need to (re)generate
// the QR code for printing on packaging, signage, receipts, etc.
//
// For production use, consider protecting this route (e.g. with
// middleware + a password, or removing it after you've grabbed
// the file you need).
export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminQrPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-10">
      <QRCodeGenerator />
    </main>
  );
}
