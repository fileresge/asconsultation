"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronDown, Home, Mail, UsersRound, X } from "lucide-react";
import BrandLogo from "./brand-logo";
import { serviceCategories, serviceCategoryUrl, serviceContact } from "../lib/business-services";
import { taxToolLinks } from "../lib/tax-tools";
import ServiceIcon from "./service-icon";
import TaxToolIcon from "./tax-tool-icon";

function Accordion({ id, label, open, onToggle, children }: { id: string; label: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  return <div className="border-b border-[#edf0f3] py-1"><button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 text-left font-bold text-navy hover:bg-[#F6F9FC] focus-visible:outline-2 focus-visible:outline-brand-orange">{label}<motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown size={18} aria-hidden="true" /></motion.span></button><AnimatePresence initial={false}>{open && <motion.div id={id} key={id} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.24 }} className="overflow-hidden"><div className="grid gap-1 pb-3 pl-2">{children}</div></motion.div>}</AnimatePresence></div>;
}

export default function MobileNavigation({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(pathname.startsWith("/tax-tools") ? "tax" : pathname.startsWith("/business-services") ? "services" : null);
  const reducedMotion = useReducedMotion();
  const linkClass = "flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#667085] hover:bg-[#F0F7FC] hover:text-brand-orange-dark focus-visible:outline-2 focus-visible:outline-brand-orange";

  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (desktop.matches) onCloseRef.current(); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; desktop.removeEventListener("change", closeOnDesktop); };
  }, []);

  return (
    <dialog ref={dialogRef} id="mobile-navigation" aria-labelledby="mobile-navigation-title" onCancel={(event) => { event.preventDefault(); event.stopPropagation(); onClose(); }} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-navy outline-none backdrop:bg-transparent">
      <motion.div aria-hidden="true" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className="absolute inset-0 bg-navy/45 backdrop-blur-sm" />
      <motion.div initial={{ x: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }} animate={{ x: 0, opacity: 1 }} exit={{ x: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }} transition={{ duration: reducedMotion ? 0.1 : 0.32, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-y-0 right-0 flex w-[min(88vw,390px)] flex-col bg-white shadow-2xl">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#edf0f3] px-5 pt-[max(20px,env(safe-area-inset-top))] pb-5"><Link href="/" onClick={onClose} aria-label="asconsultations home"><BrandLogo /></Link><h2 id="mobile-navigation-title" className="sr-only">Main navigation</h2><button ref={closeRef} type="button" aria-label="Close navigation" onClick={onClose} className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-[#f3f5f8] hover:bg-[#F6F9FC] focus-visible:outline-2 focus-visible:outline-brand-orange"><X size={22} aria-hidden="true" /></button></div>
        <nav aria-label="Mobile navigation" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <Link href="/" onClick={onClose} aria-current={pathname === "/" ? "page" : undefined} className={linkClass}><Home size={20} className="text-brand-orange" aria-hidden="true" />Home</Link>
          <Accordion id="mobile-tax-tools" label="Tax Tools" open={expanded === "tax"} onToggle={() => setExpanded(expanded === "tax" ? null : "tax")}>{taxToolLinks.map((item) => <Link key={item.href} href={item.href} onClick={onClose} aria-current={pathname === item.href ? "page" : undefined} className={linkClass}><TaxToolIcon icon={item.icon} className="size-5 shrink-0 text-brand-orange" />{item.label}</Link>)}</Accordion>
          <Accordion id="mobile-services" label="Business Services" open={expanded === "services"} onToggle={() => setExpanded(expanded === "services" ? null : "services")}>{serviceCategories.map((category) => <Link key={category.id} href={serviceCategoryUrl(category.id)} onClick={onClose} className={linkClass}><ServiceIcon category={category.id} className="size-5 shrink-0 text-brand-orange" />{category.title}</Link>)}<Link href="/business-services" onClick={onClose} className={`${linkClass} text-brand-orange-dark`}>View all services <ArrowUpRight size={17} aria-hidden="true" /></Link></Accordion>
          <Link href={serviceCategoryUrl("sales-tax")} onClick={onClose} className="flex min-h-14 items-center rounded-xl px-3 font-bold hover:bg-[#F6F9FC]">Sales Tax</Link>
          <Accordion id="mobile-resources" label="Resources" open={expanded === "resources"} onToggle={() => setExpanded(expanded === "resources" ? null : "resources")}><Link href="/blog" onClick={onClose} className={linkClass}><BookOpen size={20} className="text-brand-orange" aria-hidden="true" />Blog &amp; Insights</Link><Link href="/our-team" onClick={onClose} className={linkClass}><UsersRound size={20} className="text-brand-orange" aria-hidden="true" />Our Team</Link></Accordion>
          <Link href="/tax-tools/contact" onClick={onClose} className={linkClass}><Mail size={20} className="text-brand-orange" aria-hidden="true" />Contact us</Link>
        </nav>
        <div className="shrink-0 border-t border-[#edf0f3] bg-[#F6F9FC] px-5 pt-5 pb-[max(20px,env(safe-area-inset-bottom))]"><Link href={serviceCategoryUrl("income-tax")} onClick={onClose} className="flex min-h-12 items-center justify-center gap-3 rounded-xl bg-brand-orange px-4 py-3 text-sm font-bold text-white hover:bg-brand-orange-dark">File Tax Return <ArrowUpRight size={18} aria-hidden="true" /></Link><a href={`mailto:${serviceContact.email}`} className="mt-4 block break-all text-center text-xs font-semibold text-[#667085] hover:text-brand-orange-dark">{serviceContact.email}</a></div>
      </motion.div>
    </dialog>
  );
}
