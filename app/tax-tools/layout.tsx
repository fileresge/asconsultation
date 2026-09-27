import Link from "next/link";
import TaxToolsNavigation from "../../components/tax-tools-navigation";

export default function TaxToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pb-16">
      <div className="mx-auto max-w-[1544px] px-5 pt-8 pb-8 sm:px-[clamp(32px,3.7vw,52px)] sm:pt-10">
        <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-sm"><Link href="/" className="text-navy hover:text-brand-orange-dark">Home</Link><span aria-hidden="true" className="text-[#a4a6af]">/</span><Link href="/tax-tools" className="font-semibold text-brand-orange-dark">Tax Tools</Link></nav>
        <TaxToolsNavigation />
      </div>
      {children}
    </main>
  );
}
