import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { breadcrumbSchema, createPageMetadata, pageSeo, webPageSchema } from "../../../lib/seo";
import StructuredData from "../../../components/structured-data";

export const metadata = createPageMetadata({ ...pageSeo.faqs, path: "/tax-tools/faqs" });

const faqs = [
  { question: "How do I use the salary calculator?", answer: "Enter your monthly taxable salary in Pakistani rupees and select a tax year. You can type the amount or adjust the slider. The estimate updates automatically as you make changes." },
  { question: "Which tax years can I select?", answer: "The calculator includes tax years 2010 through 2026. Choose the year that matches the period you want to calculate. The dates for your selected year appear below the inputs." },
  { question: "What does the calculator show?", answer: "It shows estimated monthly and annual income tax, take-home pay after that tax, and the effective tax rate for the salary and year you select." },
  { question: "Can I use it for business or freelance income?", answer: "This tool is designed for salary income. For help with business, freelance, or mixed income, contact our team to discuss your situation." },
  { question: "Does using the calculator submit a tax return?", answer: "No. The calculator provides an estimate only; it does not submit a return or make a payment. You can explore our income tax filing services when you are ready for help with filing." },
  { question: "How can I get help from asconsultations?", answer: "Visit the Contact page to email us or start a WhatsApp conversation. Tell us which service you need and our team can guide you on the next steps." },
];

export default function FaqsPage() {
  return (
    <div className="mx-auto max-w-[1544px] px-5 sm:px-[clamp(32px,3.7vw,52px)]">
      <StructuredData data={[{ ...webPageSchema({ ...pageSeo.faqs, path: "/tax-tools/faqs", type: "FAQPage" }), mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tax Tools", path: "/tax-tools" }, { name: "FAQs", path: "/tax-tools/faqs" }])]} />
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <header><p className="mb-3 text-xs font-bold tracking-[0.16em] text-brand-orange-dark uppercase">Here to help</p><h1 className="text-4xl leading-tight font-extrabold tracking-tight text-navy sm:text-5xl">Frequently asked questions</h1><p className="mt-5 max-w-md text-lg leading-8 text-[#667085]">A few helpful answers before you get started.</p><Link href="/tax-tools/contact" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3.5 font-bold text-white hover:bg-brand-orange-dark">Still have a question? <ArrowRight size={18} aria-hidden="true" /></Link></header>
        <div className="space-y-3">{faqs.map((faq, index) => <details key={faq.question} open={index === 0} className="group rounded-2xl border border-[#e8e8ed] bg-white open:border-[#CCE8F8] open:bg-[#F6F9FC]"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-2xl p-5 text-base leading-6 font-bold text-navy focus-visible:outline-2 focus-visible:outline-brand-orange sm:p-6 [&::-webkit-details-marker]:hidden">{faq.question}<ChevronDown className="size-5 shrink-0 text-brand-orange-dark transition-transform group-open:rotate-180" aria-hidden="true" /></summary><p className="px-5 pb-6 text-base leading-7 text-[#667085] sm:px-6">{faq.answer}</p></details>)}</div>
      </div>
    </div>
  );
}
