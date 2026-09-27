"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, animate, inView, motion, useReducedMotion } from "framer-motion";
import BrandLogo from "./brand-logo";

function PageEffects() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion !== false) return;
    const controls: ReturnType<typeof animate>[] = [];
    const seen = new WeakSet<Element>();
    const cleanups: (() => void)[] = [];
    let frame = 0;
    // Content is fully visible in the server HTML and without JavaScript.
    // Only elements entering the viewport receive a short, one-time reveal.
    function observeContent() {
      const targets = Array.from(document.querySelectorAll<HTMLElement>("main section, main article, main header, footer"))
        .filter((element) => !seen.has(element) && element.id !== "top" && !element.closest("dialog, [role=dialog], .mobile-carousel-track") && !element.parentElement?.closest("article, section:not(#top)"));
      targets.forEach((element) => seen.add(element));
      if (targets.length) cleanups.push(inView(targets, (element) => {
        controls.push(animate(element, { opacity: [0.75, 1], y: [14, 0] }, { duration: 0.5, ease: [0.22, 1, 0.36, 1] }));
      }, { amount: 0.08 }));
      const heading = document.querySelector("main h1");
      if (heading && !seen.has(heading)) {
        seen.add(heading);
        controls.push(animate(heading, { opacity: [0.8, 1], y: [8, 0] }, { duration: 0.5, ease: "easeOut" }));
      }
    }
    observeContent();
    const observer = new MutationObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(observeContent); });
    const content = document.getElementById("main-content");
    if (content) observer.observe(content, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      cleanups.forEach((stop) => stop());
      controls.forEach((control) => control.complete());
    };
  }, [pathname, reducedMotion]);

  return null;
}

function SitePreloader() {
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const finish = () => { frame = requestAnimationFrame(() => setLoading(false)); };
    // Do not wait indefinitely for third-party embeds or slow connections.
    const timeout = window.setTimeout(finish, reducedMotion ? 0 : 1200);
    if (document.readyState === "complete" || reducedMotion) finish();
    else window.addEventListener("load", finish, { once: true });
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      window.removeEventListener("load", finish);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {loading && <motion.div id="site-preloader" key="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className="site-preloader fixed inset-0 z-[100] grid place-items-center bg-[#F6F9FC]" role="status" aria-label="Loading asconsultations">
        <div className="flex flex-col items-center px-6">
          <BrandLogo className="w-[210px] sm:w-[250px]" priority />
          <div className="mt-7 h-1 w-44 overflow-hidden rounded-full bg-[#D9EDF9]" aria-hidden="true"><motion.div className="h-full w-1/2 rounded-full bg-brand-orange" animate={reducedMotion ? {} : { x: ["-100%", "200%"] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }} /></div>
          <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-[#667085] uppercase">A clearer way forward</p>
          <button type="button" onClick={() => setLoading(false)} className="mt-6 rounded-lg px-4 py-3 text-sm font-semibold text-brand-orange-dark hover:bg-[#E8F3FB] focus-visible:outline-2 focus-visible:outline-brand-orange">Continue to website</button>
        </div>
      </motion.div>}
    </AnimatePresence>
  );
}

export default function SiteExperience({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>{children}<PageEffects /><SitePreloader /></MotionConfig>;
}
