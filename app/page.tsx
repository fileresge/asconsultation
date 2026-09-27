import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import FilingOverview from "./filing-overview";
import PricingPlans from "./pricing-plans";
import TaxCalculator from "./tax-calculator";
import ClientsAndCollaborations from "./clients-and-collaborations";
import DeadlineCta from "./deadline-cta";
import ReviewsShort from "../components/reveiws-short";
import { whatsappEnquiryUrl } from "../lib/business-services";
import { createPageMetadata, pageSeo, webPageSchema } from "../lib/seo";
import StructuredData from "../components/structured-data";

export const metadata = createPageMetadata({ ...pageSeo.home, path: "/" });

const benefits = [
  { icon: "/svg/encryption.png", title: "Secure & Encrypted", text: "Your data is 100% safe with bank-level security" },
  { icon: "/svg/expert-consultant.png", title: "Expert Consultants", text: "Certified professionals at your service" },
  { icon: "/svg/fast-turnaround.png", title: "Fast Turnaround", text: "Quick processing & maximum refund" },
  { icon: "/svg/fbr-complaint.svg", title: "FBR Compliant", text: "100% compliant with FBR regulations" },
  { icon: "/svg/raast.svg", title: "RAAST Secure Payment", text: "Fast, safe and reliable payments via RAAST" },
];

const statistics = [
  { icon: Star, value: "4.9/5", label: "Average Rating", iconClass: "w-7 text-[#ffba09] sm:w-10", glyphClass: "size-[30px] fill-current" },
  { icon: ShieldCheck, value: "Trusted by", label: "taxpayers across Pakistan", iconClass: "w-7 text-brand-orange sm:w-10", glyphClass: "size-[30px]" },
];

const filingButton = "inline-flex items-center justify-center rounded-[7px] bg-brand-orange font-extrabold text-white shadow-[0_7px_13px_rgb(8_122_200/18%)] transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-brand-orange-dark";

export default function Home() {
  return (
    <main>
      <StructuredData data={webPageSchema({ ...pageSeo.home, path: "/" })} />
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_94%_17%,#EDF7FC_0%,#F6F9FC_23%,#F6F9FC_48%,#fff_76%)] px-5 pt-5 pb-7 text-center sm:px-[clamp(32px,3.7vw,52px)] sm:pt-[34px] md:min-h-[417px] md:pt-[23px] md:pb-[15px] md:text-left" id="top">
        <div className="relative z-10 mx-auto max-w-[600px] md:mx-0 md:w-[53%]">
          <p className="mb-[17px] inline-flex items-center gap-1.5 rounded-full bg-[#E8F3FB] px-4 py-2 text-xs font-extrabold text-brand-orange-dark sm:mb-[18px] sm:text-sm">
            Tax Season 2026 is Here! <Sparkles size={16} aria-hidden="true" />
          </p>
          <h1 className="text-[clamp(28px,7.5vw,38px)] leading-[1.12] font-[850] tracking-[-1px] text-[#18191e] md:text-[clamp(38px,3vw,48px)] md:leading-[1.08] md:tracking-[-1.8px]">
            Tax filing in Pakistan.<br /><span className="text-brand-orange">Made simple.</span>
          </h1>
        </div>
        <div className="pointer-events-none relative mx-auto mt-5 mb-6 aspect-[1218/730] w-full max-w-[600px] md:absolute md:right-[-8%] md:bottom-[-18px] md:m-0 md:aspect-auto md:h-[404px] md:w-[55%] md:max-w-none lg:right-[-1.1%]" aria-label="asconsultations tax dashboard and filing tools">
          <Image src="/images/banner-image.png" alt="Tax filing dashboard, calculator, FBR compliance shield and plants" width={1218} height={730} loading="eager" fetchPriority="high" sizes="(max-width: 900px) 90vw, 55vw" className="size-full object-contain object-center" />
        </div>
        <div className="relative z-10 mx-auto max-w-[600px] md:mx-0 md:w-[53%]">
          <p className="mb-7 text-[17px] leading-[1.65] text-[#6c6d72] md:mt-[21px] md:max-w-[580px] md:text-base">
            <span className="md:hidden">File your tax return with expert guidance and personal support. Simple steps, clear advice, and a team that&apos;s here to help.</span>
            <span className="hidden md:inline">
            Move forward with confidence. asconsultations helps you prepare and file your Pakistan tax return, with personal guidance from your first document to final submission.
            </span>
          </p>
          <div className="flex flex-col gap-3.5 md:flex-row md:flex-wrap md:items-center md:gap-4">
            <a className={`${filingButton} min-h-12 w-full gap-3 px-[22px] py-3.5 text-base md:w-auto md:text-[15px]`} href="#file">
              Start Filing Now <ArrowRight className="shrink-0" size={19} strokeWidth={2.6} aria-hidden="true" />
            </a>
            <a className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-[7px] border border-[#dcdee3] bg-white px-[21px] py-3.5 text-base font-bold text-[#404147] shadow-[0_3px_12px_rgb(7_28_61/4%)] md:w-auto md:py-0 md:text-[15px]" href={whatsappEnquiryUrl("income tax filing")!} target="_blank" rel="noopener noreferrer">
              <Image src="/svg/whatsapp.svg" alt="" width={21} height={21} className="size-[21px] shrink-0" unoptimized />
              Chat on WhatsApp
            </a>
          </div>
          <div className="mt-6 hidden flex-wrap gap-[clamp(22px,3vw,45px)] md:flex" aria-label="asconsultations statistics">
            {statistics.map(({ icon: Icon, value, label, iconClass, glyphClass }) => (
              <div key={label} className="flex items-center gap-[5px] sm:gap-2.5">
                <span className={`grid h-[34px] shrink-0 place-items-center sm:h-12 ${iconClass}`}><Icon className={glyphClass} aria-hidden="true" /></span>
                <p className="grid gap-px">
                  <strong className="text-[13px] leading-[18px] text-[#27272b] sm:text-base">{value}</strong>
                  <small className="max-w-[70px] text-[10px] text-[#8a8a8e] sm:max-w-none sm:text-[13px] sm:whitespace-nowrap">{label}</small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(110deg,#fff_0%,#F6F9FC_76%,#fff_100%)] px-[15px] pt-6 pb-5 sm:px-[clamp(32px,3.7vw,52px)]" aria-label="Why choose asconsultations">
        <div className="mx-auto grid max-w-[1288px] grid-cols-1 overflow-hidden rounded-[13px] border border-[#dedee2] bg-white shadow-[0_8px_17px_rgb(10_25_48/7%)] sm:grid-cols-3 md:grid-cols-5">
          {benefits.map((benefit) => (
            <article className="flex min-h-[68px] items-center gap-[13px] border-b border-[#e8e8eb] px-4 py-3 last:border-0 sm:min-h-[84px] sm:gap-[9px] sm:border-r sm:px-2.5 sm:py-3.5 sm:[&:nth-child(3)]:border-r-0 sm:[&:nth-child(4)]:border-b-0 md:border-b-0 md:[&:nth-child(3)]:border-r lg:gap-[13px] lg:px-4 lg:py-[15px]" key={benefit.title}>
              <Image src={benefit.icon} alt="" width={40} height={40} className="size-10 shrink-0 object-contain" unoptimized />
              <div className="min-w-0">
                <h2 className="mb-[3px] text-[13px] font-extrabold text-[#24252a] sm:text-[11.5px] lg:text-[13px]">{benefit.title}</h2>
                <p className="text-xs leading-[1.28] text-[#85858a] sm:text-[11.5px] lg:text-[12.5px]">{benefit.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FilingOverview />
      <PricingPlans />
      <TaxCalculator />
      <ClientsAndCollaborations />
      <div id="resources"><ReviewsShort /></div>
      <DeadlineCta />
    </main>
  );
}
