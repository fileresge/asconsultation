"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check, Clock3, PhoneCall, Search, X } from "lucide-react";
import { businessServices, filterServices, serviceCategories, whatsappEnquiryUrl, type BusinessService } from "../lib/business-services";
import ServiceIcon from "./service-icon";
import ServiceCallbackDialog from "./service-callback-dialog";

const topPicks = ["annual-income-tax-filing", "private-limited-company-registration", "trademark-registration"];

export default function BusinessServicesCatalog() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "all";
  const category = serviceCategories.some((item) => item.id === categoryParam) ? categoryParam : "all";
  const query = searchParams.get("q") ?? "";
  const selectedId = searchParams.get("service");
  const [callbackService, setCallbackService] = useState<BusinessService | null>(null);
  const filtered = filterServices(category, query);
  const selectedService = businessServices.find((service) => service.id === selectedId);
  const services = selectedService ? filtered.filter((service) => service.id === selectedId) : filtered;

  function updateFilters(next: { category?: string; q?: string; service?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (!value || (key === "category" && value === "all")) params.delete(key);
      else params.set(key, value);
    }
    window.history.replaceState(null, "", `/business-services${params.size ? `?${params}` : ""}`);
  }

  return (
    <>
      <div className="mb-7 flex flex-wrap gap-2.5" aria-label="Filter services by category">
        {[{ id: "all", title: "All services" }, ...serviceCategories].map((item) => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => updateFilters({ category: item.id, service: "" })} className={`rounded-full border px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${category === item.id ? "border-brand-orange bg-brand-orange text-white shadow-[0_5px_15px_rgb(8_122_200/22%)]" : "border-[#e5e5ea] bg-white text-[#454854] shadow-[0_2px_5px_rgb(7_28_61/4%)] hover:border-brand-orange/40 hover:bg-[#F6F9FC]"}`}>{item.title}</button>)}
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-9 xl:grid-cols-[minmax(0,1fr)_340px]">
        <aside className="lg:sticky lg:top-6 lg:col-start-2 lg:row-start-1">
          <label htmlFor="service-search" className="sr-only">Search business services</label>
          <div className="relative">
            <Search size={20} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#93959f]" aria-hidden="true" />
            <input id="service-search" type="search" value={query} onChange={(event) => updateFilters({ q: event.target.value, service: "" })} placeholder="Search services..." className="w-full rounded-xl border border-[#e0e0e6] bg-[#fafafa] py-4 pr-11 pl-12 text-base text-navy outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 [&::-webkit-search-cancel-button]:appearance-none" />
            {query && <button type="button" aria-label="Clear search" onClick={() => updateFilters({ q: "", service: "" })} className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-[#747780] hover:bg-[#eeeef2]"><X size={18} /></button>}
          </div>
          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-[#e6e6eb] bg-white shadow-[0_3px_12px_rgb(7_28_61/4%)] lg:block">
            <h2 className="mt-6 inline-block rounded-r-full bg-brand-orange py-2.5 pr-7 pl-6 text-sm font-extrabold tracking-wide text-white">TOP PICKS</h2>
            <div className="grid divide-y divide-[#eeeef2] px-6">
              {topPicks.map((id) => {
                const service = businessServices.find((item) => item.id === id)!;
                return <Link key={id} href={`/business-services?category=${service.category}&service=${id}#service-results`} className="group flex items-center gap-4 py-6 focus-visible:outline-2 focus-visible:outline-brand-orange">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#E8F3FB] text-brand-orange-dark"><ServiceIcon category={service.category} /></span>
                  <span className="flex-1"><span className="block text-sm leading-snug font-bold text-navy group-hover:text-brand-orange-dark">{service.title}</span><span className="mt-1 block text-xs text-[#838691]">{service.price}</span></span>
                  <ArrowRight size={16} className="shrink-0 text-brand-orange" />
                </Link>;
              })}
            </div>
          </div>
          <div className="mt-6 hidden rounded-2xl bg-navy p-6 text-white lg:block">
            <PhoneCall className="mb-4 text-[#00AEEF]" size={25} aria-hidden="true" />
            <h2 className="text-lg font-bold">Not sure where to start?</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">Tell us about your business. We&apos;ll help you find the right service.</p>
            <a href={whatsappEnquiryUrl("choosing the right business service")!} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#00AEEF] hover:text-white">Talk to our team <ArrowRight size={17} /></a>
          </div>
        </aside>

        <div id="service-results" className="min-w-0 scroll-mt-6 lg:col-start-1 lg:row-start-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#7b7e88]">
            <p role="status" aria-live="polite">{services.length} {services.length === 1 ? "service" : "services"}{query ? ` matching “${query}”` : " available"}</p>
            {(category !== "all" || query || selectedId) && <button type="button" onClick={() => updateFilters({ category: "all", q: "", service: "" })} className="font-semibold text-brand-orange-dark hover:underline">Reset filters</button>}
          </div>
          <div className="grid gap-6">
            {services.map((service) => <article key={service.id} id={service.id} className="scroll-mt-6 rounded-[20px] border border-[#e4e4e9] bg-white p-5 shadow-[0_3px_10px_rgb(7_28_61/5%)] sm:p-8">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:gap-6">
                <div><h2 className="text-xl leading-snug font-extrabold text-navy sm:text-[23px]">{service.title}</h2>{service.subtitle && <p className="mt-2 text-sm leading-relaxed text-[#747780]">{service.subtitle}</p>}</div>
                <p className="shrink-0 text-xl font-extrabold text-brand-orange-dark sm:max-w-[230px] sm:text-right">{service.price}</p>
              </div>
              {service.notes.map((note, index) => <p key={index} className="mt-3 text-sm leading-relaxed text-[#777b85]">{note}</p>)}
              <div className="mt-6 flex flex-wrap items-start justify-between gap-2 border-y border-[#f0f0f3] py-4 text-sm">
                <span className="inline-flex items-center gap-2 font-semibold text-[#515663]"><Clock3 size={17} className="text-brand-orange" aria-hidden="true" />Completion time</span>
                <span className="max-w-[70%] text-right leading-relaxed text-[#747780]">{service.timeline ?? "Contact us for an estimated timeline"}</span>
              </div>
              <h3 className="mt-5 mb-3 text-base font-bold text-navy">Requirements</h3>
              <ul className="grid gap-2.5">
                {service.requirements.map((requirement, index) => <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-[#646975] sm:text-[15px]"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#E8F3FB] text-brand-orange-dark"><Check size={13} strokeWidth={3} aria-hidden="true" /></span>{requirement}</li>)}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                <button type="button" onClick={() => setCallbackService(service)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3.5 text-sm font-bold text-white shadow-[0_5px_12px_rgb(8_122_200/18%)] transition-colors hover:bg-brand-orange-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"><PhoneCall size={17} aria-hidden="true" />Request a call</button>
                <a href={whatsappEnquiryUrl(service.title)!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#27b76b] px-5 py-3.5 text-sm font-bold text-[#16854b] transition-colors hover:bg-[#f0fcf5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27b76b]"><Image src="/svg/whatsapp.svg" alt="" width={21} height={21} unoptimized />Chat on WhatsApp</a>
              </div>
            </article>)}
            {services.length === 0 && <div className="rounded-2xl border border-dashed border-[#dcdde5] bg-[#fafafa] px-6 py-16 text-center"><Search className="mx-auto mb-4 text-brand-orange" size={32} aria-hidden="true" /><h2 className="text-xl font-bold text-navy">No services found</h2><p className="mt-2 text-sm text-[#747780]">Try another search or browse all our services.</p><button type="button" onClick={() => updateFilters({ category: "all", q: "", service: "" })} className="mt-5 rounded-lg bg-brand-orange px-5 py-3 text-sm font-bold text-white hover:bg-brand-orange-dark">Show all services</button></div>}
          </div>
        </div>
      </div>
      {callbackService && <ServiceCallbackDialog key={callbackService.id} service={callbackService} onClose={() => setCallbackService(null)} />}
    </>
  );
}
