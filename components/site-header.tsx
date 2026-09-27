"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MobileNavigation from "./mobile-navigation";
import { ArrowRight, BookOpen, ChevronDown, Menu, UsersRound, X } from "lucide-react";
import BrandLogo from "./brand-logo";
import { serviceCategories, serviceCategoryUrl } from "../lib/business-services";
import ServiceIcon from "./service-icon";
import TaxToolIcon from "./tax-tool-icon";
import { taxToolLinks } from "../lib/tax-tools";

const navClass = "inline-flex items-center gap-1 rounded-lg px-3 py-3 text-sm font-bold transition-colors hover:bg-[#F0F7FC] hover:text-brand-orange-dark focus-visible:outline-2 focus-visible:outline-brand-orange";

const resourceLinks = [
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/our-team", label: "Our Team", icon: UsersRound },
];

export default function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<"tax" | "services" | "resources" | null>(null);
  const taxOpen = activeMenu === "tax";
  const servicesOpen = activeMenu === "services";
  const resourcesOpen = activeMenu === "resources";
  const setServicesOpen = (open: boolean) => setActiveMenu((current) => open ? "services" : current === "services" ? null : current);
  const setResourcesOpen = (open: boolean) => setActiveMenu((current) => open ? "resources" : current === "resources" ? null : current);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const servicesButton = useRef<HTMLButtonElement>(null);
  const taxButton = useRef<HTMLButtonElement>(null);
  const resourcesButton = useRef<HTMLButtonElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function closeMenus() {
    setActiveMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative z-40 border-b border-[#eeeef0] bg-white shadow-[0_2px_9px_rgb(8_19_44/7%)]"
      onMouseLeave={() => setActiveMenu(null)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenus(); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          if (mobileOpen) mobileButton.current?.focus();
          else if (taxOpen) taxButton.current?.focus();
          else if (resourcesOpen) resourcesButton.current?.focus();
          else servicesButton.current?.focus();
          closeMenus();
        }
      }}
    >
      <div className="flex h-[62px] items-center gap-4 px-5 sm:h-[72px] sm:px-[clamp(24px,3.7vw,52px)] lg:gap-6">
        <Link href="/" aria-label="asconsultations home" onClick={closeMenus} className="inline-flex shrink-0">
          <BrandLogo className="w-[140px] sm:w-[160px] lg:w-[180px]" priority />
        </Link>
        <nav className="hidden h-full flex-1 items-center justify-center gap-1 whitespace-nowrap xl:flex" aria-label="Primary navigation">
          <div className="relative flex h-full items-center" onMouseLeave={() => setActiveMenu((current) => current === "tax" ? null : current)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActiveMenu((current) => current === "tax" ? null : current); }}>
            <button
              ref={taxButton}
              type="button"
              aria-expanded={taxOpen}
              aria-controls="tax-tools-menu"
              className={`${navClass} cursor-pointer ${taxOpen || pathname.startsWith("/tax-tools") ? "bg-[#F0F7FC] text-brand-orange-dark" : "text-[#292a2f]"}`}
              onMouseEnter={() => setActiveMenu("tax")}
              onClick={() => setActiveMenu(taxOpen ? null : "tax")}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActiveMenu("tax");
                  requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#tax-tools-menu a")?.focus());
                }
              }}
            >Tax Tools <ChevronDown size={14} className={`transition-transform ${taxOpen ? "rotate-180" : ""}`} aria-hidden="true" /></button>
            <div id="tax-tools-menu" hidden={!taxOpen} className="absolute top-full -left-10 w-[310px] pt-2">
              <nav aria-label="Tax tools" className="relative rounded-[20px] border border-[#e8e8ed] bg-white p-3 shadow-[0_10px_30px_rgb(7_28_61/12%)]">
                <span aria-hidden="true" className="absolute -top-[7px] left-[92px] size-3 rotate-45 border-t border-l border-[#e8e8ed] bg-white" />
                {taxToolLinks.map((item) => <Link key={item.href} href={item.href} onClick={closeMenus} aria-current={pathname === item.href ? "page" : undefined} className="flex items-center gap-4 rounded-xl px-4 py-4 text-lg font-semibold text-[#292a2f] transition-colors hover:bg-[#F0F7FC] hover:text-brand-orange-dark focus-visible:outline-2 focus-visible:outline-brand-orange"><TaxToolIcon icon={item.icon} className="size-8 shrink-0" />{item.label}</Link>)}
              </nav>
            </div>
          </div>
          <button
            ref={servicesButton}
            type="button"
            aria-expanded={servicesOpen}
            aria-controls="business-services-menu"
            className={`${navClass} cursor-pointer ${servicesOpen || pathname.startsWith("/business-services") ? "bg-[#F0F7FC] text-brand-orange-dark" : "text-[#292a2f]"}`}
            onMouseEnter={() => { setServicesOpen(true); setResourcesOpen(false); }}
            onClick={() => { setServicesOpen(!servicesOpen); setResourcesOpen(false); }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setServicesOpen(true);
                setResourcesOpen(false);
                requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#business-services-menu a")?.focus());
              }
            }}
          >Business Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true" /></button>
          <Link href={serviceCategoryUrl("sales-tax")} className={navClass} onClick={closeMenus} onMouseEnter={() => { setServicesOpen(false); setResourcesOpen(false); }}>Sales Tax</Link>
          <div className="relative flex h-full items-center" onMouseEnter={() => { setResourcesOpen(true); setServicesOpen(false); }} onMouseLeave={() => setResourcesOpen(false)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setResourcesOpen(false); }}>
            <button
              ref={resourcesButton}
              type="button"
              aria-expanded={resourcesOpen}
              aria-controls="resources-menu"
              className={`${navClass} cursor-pointer ${resourcesOpen || resourceLinks.some((item) => pathname.startsWith(item.href)) ? "bg-[#F0F7FC] text-brand-orange-dark" : ""}`}
              onClick={() => { setResourcesOpen(!resourcesOpen); setServicesOpen(false); }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setResourcesOpen(true);
                  setServicesOpen(false);
                  requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#resources-menu a")?.focus());
                }
              }}
            >Resources <ChevronDown size={14} className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`} aria-hidden="true" /></button>
            <div id="resources-menu" hidden={!resourcesOpen} className="absolute top-full -left-5 w-[260px] pt-2">
              <nav aria-label="Resources" className="relative rounded-2xl border border-[#e8e8ed] bg-white p-3 shadow-[0_10px_30px_rgb(7_28_61/12%)]">
                <span aria-hidden="true" className="absolute -top-[7px] left-16 size-3 rotate-45 border-t border-l border-[#e8e8ed] bg-white" />
                {resourceLinks.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={closeMenus} aria-current={pathname.startsWith(href) ? "page" : undefined} className="flex items-center gap-4 rounded-xl px-4 py-4 text-base font-semibold text-navy transition-colors hover:bg-[#F0F7FC] hover:text-brand-orange-dark focus-visible:outline-2 focus-visible:outline-brand-orange"><Icon size={27} strokeWidth={1.6} aria-hidden="true" />{label}</Link>)}
              </nav>
            </div>
          </div>
        </nav>
        <div className="hidden items-center gap-3 whitespace-nowrap xl:flex">
          <div className="flex gap-0.5 rounded-lg border border-[#dedee2] p-[3px]" aria-label="Language selection">
            <button className="rounded-[5px] bg-brand-orange px-[9px] py-[7px] text-[13px] font-bold text-white">English</button>
            <button className="rounded-[5px] px-[9px] py-[7px] text-[13px] font-bold text-[#4b4c50]" lang="ur">اردو</button>
          </div>
          <Link href="/tax-tools/contact" className="rounded-lg border border-[#dedee2] px-4 py-2.5 text-sm font-bold">Contact</Link>
          <Link href={serviceCategoryUrl("income-tax")} onClick={closeMenus} className="rounded-lg bg-brand-orange px-4 py-3 text-sm font-extrabold text-white shadow-[0_7px_13px_rgb(8_122_200/18%)] transition-colors hover:bg-brand-orange-dark">File Tax Return</Link>
        </div>
        <button ref={mobileButton} type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" className="ml-auto grid size-11 place-items-center rounded-lg p-2 text-navy focus-visible:outline-2 focus-visible:outline-brand-orange xl:hidden" onClick={() => { setMobileOpen(!mobileOpen); setActiveMenu(null); }}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div id="business-services-menu" hidden={!servicesOpen} className="absolute top-full right-0 left-0 hidden border-t border-[#ededf0] bg-white shadow-[0_18px_28px_rgb(7_28_61/10%)] xl:block">
        <nav aria-label="Business services" className="mx-auto grid max-w-[1800px] grid-cols-6 gap-4 px-8 py-7">
          {serviceCategories.map((category) => <Link key={category.id} href={serviceCategoryUrl(category.id)} onClick={closeMenus} className="group rounded-xl p-4 transition-colors hover:bg-[#F6F9FC] focus-visible:outline-2 focus-visible:outline-brand-orange">
            <span className="mb-3 grid size-12 place-items-center rounded-xl bg-[#E8F3FB] text-brand-orange-dark"><ServiceIcon category={category.id} /></span>
            <span className="block text-[15px] font-extrabold text-navy group-hover:text-brand-orange-dark">{category.title}</span>
            <span className="mt-2 block text-[13px] leading-relaxed text-[#777b85]">{category.description}</span>
          </Link>)}
          <Link href="/business-services" onClick={closeMenus} className="rounded-2xl border border-dashed border-brand-orange/40 bg-[#F6F9FC] p-4 transition-colors hover:bg-[#E8F3FB] focus-visible:outline-2 focus-visible:outline-brand-orange">
            <span className="mb-3 grid size-12 place-items-center rounded-xl bg-[#DCEFFC] text-brand-orange-dark"><ArrowRight /></span>
            <span className="block text-[15px] font-extrabold text-brand-orange-dark">View All Services</span>
            <span className="mt-2 block text-[13px] leading-relaxed text-[#777b85]">Explore our full range of tax and business solutions.</span>
          </Link>
        </nav>
      </div>

      <AnimatePresence>{mobileOpen && <MobileNavigation key="mobile-drawer" onClose={closeMenus} />}</AnimatePresence>
    </header>
  );
}
