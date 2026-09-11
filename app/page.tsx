import BrandHeader from "@/components/BrandHeader";
import LinkList from "@/components/LinkList";
import Footer from "@/components/Footer";
import PageViewTracker from "@/components/PageViewTracker";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-start sm:items-center justify-center px-5 py-10 sm:py-14">
      <PageViewTracker />
      <div className="w-full max-w-card flex flex-col gap-8">
        <BrandHeader />
        <LinkList />
        <Footer />
      </div>
    </main>
  );
}
