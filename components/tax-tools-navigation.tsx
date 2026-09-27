"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { taxToolLinks } from "../lib/tax-tools";
import TaxToolIcon from "./tax-tool-icon";

export default function TaxToolsNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Tax tools pages" className="flex flex-wrap gap-2">
      {taxToolLinks.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-brand-orange ${pathname === item.href ? "border-brand-orange bg-[#F0F7FC] text-brand-orange-dark" : "border-[#e8e8ed] bg-white text-navy hover:bg-[#F0F7FC]"}`}><TaxToolIcon icon={item.icon} className="size-5" />{item.label}</Link>)}
    </nav>
  );
}
