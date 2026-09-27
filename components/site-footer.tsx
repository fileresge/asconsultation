import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import BrandLogo from "./brand-logo";
import { serviceCategories, serviceCategoryUrl, serviceContact, whatsappEnquiryUrl } from "../lib/business-services";
import { socialLinks } from "../lib/social-links";
import { taxToolLinks } from "../lib/tax-tools";
import { officeLocation } from "../lib/office-location";

const footerLinkClass = "inline-flex min-h-10 items-center rounded-sm text-sm leading-6 text-[#b7c3d5] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange";
const headingClass = "mb-4 text-xs font-bold tracking-[0.16em] text-white uppercase";

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true" focusable="false">
      {icon === "facebook" && <path d="M13.7 22v-9.1h3.1l.5-3.6h-3.6V7c0-1 .3-1.7 1.8-1.7h1.9V2.1c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.5H6.8v3.6h3.1V22h3.8Z" />}
      {icon === "instagram" && <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.4" cy="6.6" r="1.1" /></>}
      {icon === "linkedin" && <path d="M5.4 7.7H2V22h3.4V7.7ZM3.7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM22 13.7c0-4.3-2.3-6.3-5.3-6.3-2.4 0-3.5 1.3-4.1 2.2V7.7H9.2V22h3.4v-8c0-2.1.4-4.1 2.9-4.1s2.5 2.4 2.5 4.2V22h4v-8.3Z" />}
    </svg>
  );
}

export default function SiteFooter() {
  const whatsappUrl = whatsappEnquiryUrl("tax and business services");

  return (
    <footer aria-label="asconsultations footer" className="relative isolate mt-auto overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-orange/80 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-64 -right-64 -z-10 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(255,106,25,0.09),transparent_65%)]" />
      <div className="mx-auto max-w-[1544px] px-5 sm:px-[clamp(32px,3.7vw,52px)]">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-9 sm:py-11 md:flex-row md:items-center">
          <div>
            <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-[#00AEEF] uppercase">Tax. Accounting. Business.</p>
            <h2 className="text-[28px] leading-tight font-bold tracking-[-0.8px] sm:text-[34px]">Your next step, made simpler.</h2>
          </div>
          <Link href="/tax-tools/contact" className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-5 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange">Talk to our team <ArrowUpRight size={20} className="transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" /></Link>
        </div>

        <div className="grid gap-x-10 gap-y-10 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-[1.2fr_1fr_0.8fr_1.15fr] lg:gap-x-12">
          <div className="min-w-0">
            <Link href="/" aria-label="asconsultations home" className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"><BrandLogo className="w-[210px]" /></Link>
            <p className="mt-5 max-w-[290px] text-sm leading-7 text-[#b7c3d5]">Personal guidance for your taxes, accounting, and business. Helping you move forward with confidence in Pakistan.</p>
            <nav aria-label="asconsultations social media" className="mt-6 flex gap-3">
              {socialLinks.map((social) => <a key={social.icon} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`asconsultations on ${social.name} (opens in a new tab)`} title={social.name} className="grid size-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-[#dce4ef] transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"><SocialIcon icon={social.icon} /></a>)}
            </nav>
          </div>

          <nav aria-labelledby="footer-services-heading">
            <h2 id="footer-services-heading" className={headingClass}>Our services</h2>
            <ul className="space-y-1">{serviceCategories.map((category) => <li key={category.id}><Link href={serviceCategoryUrl(category.id)} className={footerLinkClass}>{category.title}</Link></li>)}</ul>
            <Link href="/business-services" className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-bold text-[#00AEEF] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange">View all services <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </nav>

          <nav aria-labelledby="footer-explore-heading">
            <h2 id="footer-explore-heading" className={headingClass}>Explore</h2>
            <ul className="space-y-1">
              {taxToolLinks.map((item) => <li key={item.href}><Link href={item.href} className={footerLinkClass}>{item.label}</Link></li>)}
              <li><Link href="/blog" className={footerLinkClass}>Blog &amp; Insights</Link></li>
              <li><Link href="/our-team" className={footerLinkClass}>Our Team</Link></li>
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className={headingClass}>Get in touch</h2>
            <p className="mb-5 text-sm leading-7 text-[#b7c3d5]">Have a question? Start a conversation with our team.</p>
            <address className="mb-3 not-italic"><Link href="/tax-tools/contact#office-location" className="group flex items-start gap-3 rounded-sm py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"><MapPin size={19} className="mt-0.5 shrink-0 text-[#00AEEF]" aria-hidden="true" /><span className="min-w-0"><span className="block text-xs text-[#b7c3d5]">Visit our office</span><span className="mt-1.5 block text-sm leading-6 transition-colors group-hover:text-[#00AEEF]">{officeLocation.address}</span></span></Link></address>
            <a href={`mailto:${serviceContact.email}`} className="group flex items-start gap-3 rounded-sm py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"><Mail size={19} className="mt-0.5 shrink-0 text-[#00AEEF]" aria-hidden="true" /><span className="min-w-0"><span className="block text-xs text-[#b7c3d5]">Email us</span><span className="mt-1.5 block break-all text-sm font-semibold leading-6 transition-colors group-hover:text-[#00AEEF]">{serviceContact.email}</span></span></a>
            {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group mt-3 flex items-start gap-3 rounded-sm py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"><MessageCircle size={19} className="mt-0.5 shrink-0 text-[#00AEEF]" aria-hidden="true" /><span><span className="block text-xs text-[#b7c3d5]">Chat on WhatsApp</span><span className="mt-1.5 block text-sm font-semibold leading-6 transition-colors group-hover:text-[#00AEEF]">+{serviceContact.whatsapp}</span></span></a>}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 pb-8 text-xs leading-6 text-[#a6b4c9] sm:flex-row sm:items-center sm:justify-between sm:pb-6 md:pb-24">
          <p>&copy; {new Date().getFullYear()} asconsultations. All rights reserved.</p>
          <p className="sm:pr-20">Management, Taxation &amp; Corporate Consultants</p>
        </div>
      </div>
    </footer>
  );
}
