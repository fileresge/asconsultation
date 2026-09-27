import { ArrowRight } from "lucide-react";

export default function DeadlineCta() {
  return (
    <section
      aria-labelledby="deadline-heading"
      className="px-4 pb-12 sm:px-5 sm:pb-16"
    >
      <div className="relative isolate mx-auto flex max-w-[1800px] flex-col items-center gap-5 overflow-hidden rounded-[24px] bg-linear-to-r from-brand-orange-dark via-brand-orange to-brand-orange-dark px-6 py-7 text-center shadow-[0_8px_30px_rgb(8_122_200/16%)] sm:rounded-[32px] sm:px-10 sm:py-8 md:min-h-[235px] md:flex-row md:gap-8 md:text-left lg:gap-[clamp(28px,3vw,54px)] lg:px-[clamp(40px,4.4vw,80px)]">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1000 235"
          preserveAspectRatio="none"
          className="pointer-events-none absolute right-0 bottom-0 -z-10 h-[78%] w-full fill-white/[0.07] md:w-[55%]"
        >
          <path d="M0 235V146H33V113H55V81H72V57H88V35H110V13H121V0H132V13H143V35H154V57H171V81H188V113H200V146H220V117H238V89H254V65H267V43H280V23H294V43H309V65H325V89H338V117H356V146H383V101H402V73H417V51H429V31H440V14H451V0H463V14H474V31H485V51H498V73H514V101H533V146H555V121H572V96H586V69H601V28H615V69H630V96H645V121H659V146H683V91H703V67H719V44H732V28H746V13H759V0H771V13H784V31H799V54H813V80H828V110H845V146H869V113H884V91H901V66H917V44H930V65H944V91H957V117H972V146H1000V235Z" />
        </svg>

        <div
          aria-hidden="true"
          className="flex h-[120px] w-[110px] shrink-0 flex-col overflow-hidden rounded-[20px] border-2 border-[#BFE5F7] bg-white font-serif sm:h-[140px] sm:w-[128px]"
        >
          <span className="grid h-[48px] shrink-0 place-items-center bg-[#DCEFFC] text-[26px] leading-none font-bold text-brand-orange-dark sm:h-[56px] sm:text-[30px]">
            SEP
          </span>
          <span className="grid flex-1 place-items-center pb-1 text-[38px] leading-none font-bold text-navy sm:text-[44px]">
            30
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h2
            id="deadline-heading"
            className="text-[28px] leading-[1.15] font-extrabold tracking-[-0.8px] text-white sm:text-[34px] lg:text-[clamp(32px,2.2vw,40px)]"
          >
            Don&apos;t Miss the Deadline!
          </h2>
          <p className="mx-auto mt-3 max-w-[790px] text-base leading-[1.5] text-white sm:text-lg md:mx-0 lg:text-xl">
            File your income tax return before{" "}
            <time dateTime="2026-09-30">September 30, 2026</time> and avoid penalties.
          </p>
        </div>

        <a
          href="#file"
          className="inline-flex min-h-[54px] w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-6 py-3 text-base font-extrabold text-brand-orange-dark shadow-[0_6px_20px_rgb(7_28_61/8%)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-[#F0F7FC] hover:shadow-[0_10px_24px_rgb(7_28_61/16%)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-safe:hover:-translate-y-1 motion-reduce:transition-none sm:min-h-[60px] sm:w-auto sm:px-8 lg:text-xl"
        >
          File Tax Return Now
          <ArrowRight size={23} strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
