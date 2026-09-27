import { Check, FileCheck2, UserRoundCheck, Zap } from "lucide-react";
import MobileCarousel from "../components/mobile-carousel";
import { whatsappEnquiryUrl } from "../lib/business-services";

const plans = [
  {
    id: "essential",
    name: "Essential Filing",
    price: "3,900",
    description: "Straightforward support for your regular tax return.",
    icon: FileCheck2,
    popular: false,
    action: "Get Started",
    features: [
      "Processing time: 48 hours to 5 working days",
      "Ideal for standard tax filing cases",
      "Prepared and filed by the asconsultations team",
      "Suitable for salaried individuals and routine cases",
      "Processing starts after payment and complete documents",
    ],
  },
  {
    id: "priority",
    name: "Priority Filing",
    price: "5,500",
    description: "A faster route for urgent and time-sensitive returns.",
    icon: Zap,
    popular: true,
    action: "Choose Priority",
    features: [
      "Priority handling by the asconsultations tax team",
      "Processing time: 24 to 48 hours",
      "Faster turnaround for urgent submissions",
      "Ideal for clients who need quick filing",
      "Depends on timely submission of complete documents",
    ],
  },
  {
    id: "premium",
    name: "Premium Consultant Filing",
    price: "14,500",
    description: "One-to-one guidance from a senior tax consultant.",
    icon: UserRoundCheck,
    popular: false,
    action: "Book Consultation",
    features: [
      "Zoom or in-person consultation",
      "Personal guidance from a senior consultant",
      "A detailed review of your tax return",
      "Better understanding of your financial management",
      "Ideal for clients seeking personalized assistance",
    ],
  },
];

export default function PricingPlans() {
  return (
    <section
      id="file"
      aria-labelledby="pricing-heading"
      className="scroll-mt-8 bg-white px-5 py-14 sm:px-[clamp(32px,3.7vw,52px)] sm:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-brand-orange-dark uppercase">asconsultations filing plans</p>
          <h2 id="pricing-heading" className="text-[32px] leading-[1.15] font-bold tracking-[-1.2px] text-navy sm:text-[42px] lg:text-[46px]">
            Choose Your Tax Filing Plan
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#667085] sm:text-base">Flexible options. Expert support. A plan for every filing need.</p>
        </div>

        <div className="mt-8">
        <MobileCarousel label="Tax filing plans" labels={plans.map((plan) => plan.name)} initialIndex={1}>
          {plans.map((plan) => (
            <article
              key={plan.id}
              aria-labelledby={`${plan.id}-plan`}
              className={`relative flex min-w-0 flex-col rounded-[22px] border-2 p-6 lg:p-8 ${
                plan.popular
                  ? "border-brand-orange bg-[linear-gradient(180deg,#F6F9FC_0%,#fff_40%)] shadow-[0_12px_40px_-12px_rgb(8_122_200/25%)]"
                  : "border-[#edf0f3] bg-white shadow-[0_6px_24px_rgb(7_28_61/5%)]"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand-orange px-5 py-2 text-[11px] leading-none font-extrabold tracking-[0.06em] text-white uppercase">
                  Most popular
                </span>
              )}

              <div className="border-b border-[#edf0f3] pt-2 pb-6 text-center">
                <span className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-[#E8F3FB] text-brand-orange">
                  <plan.icon className="size-8" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 id={`${plan.id}-plan`} className="text-[17px] leading-6 font-bold tracking-[-0.3px] text-navy md:min-h-12 lg:min-h-6">{plan.name}</h3>
                <p className="mt-3 flex flex-wrap items-baseline justify-center gap-2 text-brand-orange-dark">
                  <span className="text-sm font-bold">PKR</span>
                  <span className="text-[40px] leading-none font-extrabold tracking-[-1.5px] lg:text-[44px]">{plan.price}</span>
                </p>
                <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-[#667085] md:min-h-12">{plan.description}</p>
              </div>

              <ul className="flex-1 space-y-4 py-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-[1.65] text-[#667085]">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-orange text-white" aria-hidden="true">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappEnquiryUrl(plan.name)!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${plan.action}: ${plan.name}, PKR ${plan.price}`}
                className="mt-2 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-brand-orange px-4 py-3 text-sm font-bold text-white shadow-[0_5px_14px_rgb(8_122_200/18%)] transition-colors hover:bg-brand-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
              >
                {plan.action}
              </a>
            </article>
          ))}
        </MobileCarousel>
        </div>
      </div>
    </section>
  );
}
