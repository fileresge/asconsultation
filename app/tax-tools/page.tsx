import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TaxToolIcon from "../../components/tax-tool-icon";
import { taxToolLinks } from "../../lib/tax-tools";
import { breadcrumbSchema, createPageMetadata, pageSeo, webPageSchema } from "../../lib/seo";
import StructuredData from "../../components/structured-data";

export const metadata = createPageMetadata({ ...pageSeo.tools, path: "/tax-tools" });

export default function TaxToolsPage() {
  return (
    <div className="mx-auto max-w-[1544px] px-5 sm:px-[clamp(32px,3.7vw,52px)]">
      <StructuredData data={[webPageSchema({ ...pageSeo.tools, path: "/tax-tools", type: "CollectionPage" }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tax Tools", path: "/tax-tools" }])]} />
      <header className="mb-10"><p className="mb-3 text-xs font-bold tracking-[0.16em] text-brand-orange-dark uppercase">A little clarity goes a long way</p><h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Your tax toolkit.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#667085]">Calculate your salary tax, find an answer, or get in touch. Everything you need to take the next step.</p></header>
      <div className="grid gap-5 md:grid-cols-3">{taxToolLinks.map((item) => <Link key={item.href} href={item.href} className="group rounded-3xl border border-[#CCE8F8] bg-[#F6F9FC] p-7 transition-colors hover:bg-[#E8F3FB] focus-visible:outline-2 focus-visible:outline-brand-orange"><span className="mb-8 grid size-14 place-items-center rounded-2xl bg-white text-brand-orange-dark"><TaxToolIcon icon={item.icon} /></span><h2 className="flex items-center justify-between gap-3 text-xl font-bold text-navy">{item.label}<ArrowUpRight size={22} aria-hidden="true" /></h2><p className="mt-3 text-base leading-7 text-[#667085]">{item.description}</p></Link>)}</div>
    </div>
  );
}
