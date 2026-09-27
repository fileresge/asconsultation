import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { serviceContact, whatsappEnquiryUrl } from "../../../lib/business-services";
import { absoluteUrl, breadcrumbSchema, createPageMetadata, pageSeo, webPageSchema } from "../../../lib/seo";
import StructuredData from "../../../components/structured-data";
import ContactForm from "../../../components/contact-form";
import { officeLocation } from "../../../lib/office-location";

export const metadata = createPageMetadata({ ...pageSeo.contact, path: "/tax-tools/contact" });

export default function ContactPage() {
  const whatsappUrl = whatsappEnquiryUrl("tax and business services");
  return (
    <div className="mx-auto max-w-[1544px] px-5 sm:px-[clamp(32px,3.7vw,52px)]">
      <StructuredData data={[{ ...webPageSchema({ ...pageSeo.contact, path: "/tax-tools/contact", type: "ContactPage" }), mainEntity: { "@id": absoluteUrl("/#organization") } }, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tax Tools", path: "/tax-tools" }, { name: "Contact", path: "/tax-tools/contact" }])]} />
      <section className="grid gap-10 rounded-[28px] border border-[#CCE8F8] bg-[linear-gradient(115deg,#F6F9FC,#E8F3FB)] p-6 sm:p-10 lg:grid-cols-2 lg:p-12">
        <div className="min-w-0">
        <header><p className="mb-4 text-xs font-bold tracking-[0.16em] text-brand-orange-dark uppercase">Contact us</p><h1 className="text-4xl leading-tight font-extrabold tracking-tight text-navy sm:text-5xl">A helpful team.<br />An easier next step.</h1><p className="mt-5 max-w-lg text-lg leading-8 text-[#667085]">Have a question about your taxes or business? Contact asconsultations and tell us how we can help.</p><Link href="/tax-tools/faqs" className="mt-7 inline-flex items-center gap-2 font-bold text-brand-orange-dark hover:underline">Explore our FAQs <ArrowUpRight size={18} aria-hidden="true" /></Link></header>
        <div className="mt-8 grid content-start gap-4">
          <a href={`mailto:${serviceContact.email}`} className="group flex min-w-0 items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-colors hover:border-brand-orange focus-visible:outline-2 focus-visible:outline-brand-orange sm:p-6"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#F0F7FC] text-brand-orange-dark"><Mail aria-hidden="true" /></span><span className="min-w-0"><span className="block text-lg font-bold text-navy">Email us</span><span className="mt-2 block break-all text-base font-semibold text-brand-orange-dark">{serviceContact.email}</span><span className="mt-2 block text-sm leading-6 text-[#667085]">Send your questions and the service you need help with.</span></span></a>
          {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-colors hover:border-brand-orange focus-visible:outline-2 focus-visible:outline-brand-orange sm:p-6"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#eef8f0] text-[#258448]"><MessageCircle aria-hidden="true" /></span><span><span className="block text-lg font-bold text-navy">Chat on WhatsApp</span><span className="mt-2 block text-base font-semibold text-brand-orange-dark">+{serviceContact.whatsapp}</span><span className="mt-2 block text-sm leading-6 text-[#667085]">Start a conversation with our team about your next steps.</span></span></a>}
        </div>
        </div>
        <ContactForm email={serviceContact.email} />
      </section>
      <section id="office-location" aria-labelledby="office-location-heading" className="mt-8 grid scroll-mt-8 overflow-hidden rounded-[28px] border border-[#e6e9ee] bg-white lg:grid-cols-[0.8fr_1.5fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-[#F0F7FC] text-brand-orange-dark"><MapPin size={24} aria-hidden="true" /></span>
          <p className="mb-3 text-xs font-bold tracking-[0.16em] text-brand-orange-dark uppercase">Our location</p>
          <h2 id="office-location-heading" className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Find us in Karachi</h2>
          <address className="mt-5 max-w-sm text-base leading-8 text-[#667085] not-italic">{officeLocation.address}</address>
        </div>
        <iframe
          src={officeLocation.mapEmbedUrl}
          title="asconsultations office location on Google Maps"
          width="600"
          height="450"
          className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[450px]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </section>
    </div>
  );
}
