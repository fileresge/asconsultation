import Link from "next/link";
import { Suspense } from "react";
import BusinessServicesCatalog from "../../components/business-services-catalog";
import StructuredData from "../../components/structured-data";
import { absoluteUrl, breadcrumbSchema, createPageMetadata, pageSeo } from "../../lib/seo";
import { businessServices, filterServices, serviceCategories } from "../../lib/business-services";

export async function generateMetadata({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  // Filters share the catalog's canonical URL; search results are not landing pages.
  return createPageMetadata({ ...pageSeo.services, path: "/business-services", noIndex: Boolean(params.q) });
}

export default async function BusinessServicesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // Reading the request filters renders the catalog on the server and keeps its
  // structured data aligned with the services actually visible on this URL.
  const params = await searchParams;
  const category = serviceCategories.some((item) => item.id === params.category) ? String(params.category) : "all";
  const query = typeof params.q === "string" ? params.q : "";
  const selected = businessServices.find((service) => service.id === params.service);
  const filtered = filterServices(category, query);
  const visibleServices = selected ? filtered.filter((service) => service.id === selected.id) : filtered;
  return (
    <main className="mx-auto w-full max-w-[1640px] px-5 pt-7 pb-20 sm:px-10 sm:pt-9 lg:px-16">
      <StructuredData data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Business Services", path: "/business-services" }]),
        { "@context": "https://schema.org", "@type": "CollectionPage", name: pageSeo.services.title, description: pageSeo.services.description, url: absoluteUrl("/business-services"), mainEntity: { "@type": "ItemList", numberOfItems: visibleServices.length, itemListElement: visibleServices.map((service, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name: service.title, description: service.subtitle || `${service.title} services from asconsultations.`, url: absoluteUrl(`/business-services?service=${service.id}`), provider: { "@id": absoluteUrl("/#organization") }, areaServed: { "@type": "Country", name: "Pakistan" } } })) } },
      ]} />
      <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-sm sm:text-base"><Link href="/" className="text-navy hover:text-brand-orange-dark">Home</Link><span aria-hidden="true" className="text-[#a4a6af]">/</span><span aria-current="page" className="font-semibold text-brand-orange-dark">Business Services</span></nav>
      <header className="mb-8">
        <h1 className="text-[36px] leading-[1.15] font-extrabold tracking-[-1.5px] text-navy sm:text-[48px] lg:text-[56px]">Our business services</h1>
        <p className="mt-5 max-w-[1120px] text-base leading-relaxed text-[#777b85] sm:text-xl">Build your business with confidence. Get expert assistance with tax filing, business registration, and compliance, with clear requirements and personal guidance at every step.</p>
      </header>
      <Suspense fallback={<div role="status" className="rounded-2xl border border-[#e6e6eb] bg-[#F6F9FC] p-12 text-center text-[#747780]">Loading business services…</div>}><BusinessServicesCatalog /></Suspense>
    </main>
  );
}
