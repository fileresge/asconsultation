import Image from "next/image";
import { FileCheck2, FilePenLine, FolderOpen, ListChecks, LockKeyhole, MessagesSquare, ShieldCheck, UserRoundPlus, UsersRound } from "lucide-react";
import consultant from "../public/images/consultant.png";

const filingSteps = [
  {
    icon: UserRoundPlus,
    title: "Start with you",
    description: "Create your asconsultations account and set up your profile.",
  },
  {
    icon: FilePenLine,
    title: "Share the details",
    description: "Tell us about your income and upload your tax documents.",
  },
  {
    icon: FolderOpen,
    title: "Leave the prep to us",
    description: "Your consultant prepares your return for your review and approval.",
  },
  {
    icon: FileCheck2,
    title: "File with confidence",
    description: "We submit your approved return and explain what comes next.",
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Clarity on compliance",
    description: "Understand FBR requirements and what they mean for you.",
  },
  {
    icon: ListChecks,
    title: "Help at every step",
    description: "From your first document to your final submission.",
  },
  {
    icon: LockKeyhole,
    title: "Privacy comes first",
    description: "Your personal and financial details, handled with care.",
  },
  {
    icon: MessagesSquare,
    title: "People you can talk to",
    description: "Get practical answers from our tax consultants.",
  },
];

export default function FilingOverview() {
  return (
    <section
      className="bg-[linear-gradient(180deg,#fff_0%,#fafbfc_100%)] px-5 pt-12 pb-16 sm:px-[clamp(32px,3.7vw,52px)] sm:pt-16 sm:pb-20"
      aria-label="Filing with asconsultations"
    >
      <div className="mx-auto max-w-[1440px]">
        <article aria-labelledby="how-asconsultations-works">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <p className="mb-4 flex items-center gap-2.5 text-[11px] font-bold tracking-[0.18em] text-brand-orange-dark uppercase">
                <span className="h-px w-7 bg-brand-orange" aria-hidden="true" />
                How asconsultations works
              </p>
              <h2 id="how-asconsultations-works" className="text-[32px] leading-[1.12] font-bold tracking-[-1.2px] text-navy sm:text-[42px] lg:text-[48px]">
                Your taxes, handled.<br />
                <span className="text-[#7b8595]">In four simple steps.</span>
              </h2>
            </div>
            <p className="max-w-[350px] text-[15px] leading-7 text-[#667085] md:pb-1">
              A little information from you. Expert guidance from us. asconsultations makes the journey from paperwork to filing feel simple.
            </p>
          </div>

          <ol className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-10 md:grid-cols-4">
            {filingSteps.map(({ icon: Icon, title, description }, index) => (
              <li key={title} className="relative overflow-hidden rounded-[20px] border border-[#e8ecf0] bg-white p-6 shadow-[0_4px_16px_rgb(7_28_61/2%)] lg:p-7">
                <div className="mb-7 flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#E8F3FB] text-brand-orange">
                    <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="text-[28px] leading-none font-medium tracking-[-1px] text-[#c8cfd8]" aria-hidden="true">0{index + 1}</span>
                </div>
                <h3 className="text-[18px] leading-snug font-bold tracking-[-0.3px] text-navy">{title}</h3>
                <p className="mt-2.5 text-sm leading-[1.75] text-[#667085]">{description}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="mt-8 grid overflow-hidden rounded-[28px] bg-navy shadow-[0_20px_60px_-24px_rgb(7_28_61/35%)] md:mt-10 md:grid-cols-[1.1fr_1fr] lg:rounded-[32px]" aria-labelledby="why-choose-asconsultations">
          <div className="px-6 py-9 sm:p-10 lg:p-12">
            <p className="mb-5 flex items-center gap-2.5 text-[11px] font-bold tracking-[0.18em] text-[#00AEEF] uppercase">
              <span className="h-px w-7 bg-[#00AEEF]" aria-hidden="true" />
              Why choose asconsultations
            </p>
            <h2 id="why-choose-asconsultations" className="text-[32px] leading-[1.12] font-bold tracking-[-1px] text-white sm:text-[40px] lg:text-[46px]">
              Real people.<br />
              <span className="text-[#00AEEF]">Expert tax support.</span>
            </h2>
            <p className="mt-5 max-w-[430px] text-[15px] leading-7 text-[#bcc9db]">
              You don&apos;t have to figure it all out alone. Our consultants bring clarity, care and a personal approach to your tax return.
            </p>
            <ul className="mt-8 grid gap-x-6 gap-y-7 border-t border-white/15 pt-8 sm:grid-cols-2">
              {reasons.map((reason) => (
                <li key={reason.title}>
                  <span className="mb-3 grid size-10 place-items-center rounded-xl bg-[#F0F7FC] text-brand-orange">
                    <reason.icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="text-sm leading-snug font-bold text-white lg:text-[15px]">{reason.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-[#bcc9db]">{reason.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-3 mb-3 flex min-w-0 flex-col justify-end overflow-hidden rounded-[22px] bg-[#E8F3FB] pt-8 sm:mx-4 sm:mb-4 md:mt-4 md:ml-0 lg:rounded-[24px]">
            <div className="relative z-10 px-6 sm:px-8 md:pt-5">
              <p className="text-[11px] font-bold tracking-[0.15em] text-[#667085] uppercase">The human side of tax</p>
              <p className="mt-2 max-w-[280px] text-xl leading-snug font-medium tracking-[-0.4px] text-navy sm:text-2xl">A little guidance.<br />A lot more confidence.</p>
            </div>
            <div className="relative mt-5 flex flex-1 items-end justify-center">
              <Image
                src={consultant}
                alt="asconsultations tax consultant ready to help with your return"
                sizes="(max-width: 600px) 90vw, (max-width: 900px) 540px, (max-width: 1544px) 45vw, 660px"
                className="h-auto w-full max-w-[540px] object-contain object-bottom md:max-w-none"
              />
              <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/95 px-5 py-4 shadow-[0_8px_30px_rgb(7_28_61/10%)] backdrop-blur-sm sm:right-6 sm:bottom-6 sm:left-6">
                <div>
                  <p className="text-sm font-bold text-navy">Your asconsultations team</p>
                  <p className="mt-1 text-xs text-[#667085]">Personal guidance. Every step of the way.</p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#E8F3FB] text-brand-orange" aria-hidden="true"><UsersRound className="size-[18px]" /></span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
