"use client";

import { Children, useEffect, useId, useRef, useState, type ReactNode } from "react";

export default function MobileCarousel({ children, label, labels, initialIndex = 0 }: { children: ReactNode; label: string; labels: string[]; initialIndex?: number }) {
  const slides = Children.toArray(children);
  const startIndex = Math.min(Math.max(initialIndex, 0), Math.max(slides.length - 1, 0));
  const [active, setActive] = useState(startIndex);
  const trackRef = useRef<HTMLDivElement>(null);
  const id = useId();

  function goTo(index: number) {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    const left = track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left - (track.clientWidth - slide.clientWidth) / 2;
    track.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const mobile = window.matchMedia("(max-width: 900px)");
    let frame = 0;
    let currentIndex = startIndex;

    function measure() {
      if (!track || !mobile.matches) return;
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      Array.from(track.children).forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const delta = Math.abs(rect.left + rect.width / 2 - center);
        if (delta < distance) { nearest = index; distance = delta; }
      });
      currentIndex = nearest;
      setActive(nearest);
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    function align() {
      if (!track) return;
      if (!mobile.matches) { track.scrollTo({ left: 0, behavior: "instant" }); return; }
      const slide = track.children[currentIndex] as HTMLElement | undefined;
      if (!slide) return;
      track.scrollTo({ left: track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left - (track.clientWidth - slide.clientWidth) / 2, behavior: "instant" });
      onScroll();
    }

    const observer = new ResizeObserver(align);
    observer.observe(track);
    track.addEventListener("scroll", onScroll, { passive: true });
    mobile.addEventListener("change", align);
    align();
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", onScroll);
      mobile.removeEventListener("change", align);
      cancelAnimationFrame(frame);
    };
  }, [startIndex, slides.length]);

  return (
    <div className="min-w-0" role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={trackRef} id={id} className="mobile-carousel-track" tabIndex={0} aria-label={`${label}: swipe or use the arrow keys`} onKeyDown={(event) => {
        if (event.target !== event.currentTarget || !window.matchMedia("(max-width: 900px)").matches) return;
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        goTo(event.key === "Home" ? 0 : event.key === "End" ? slides.length - 1 : Math.max(0, Math.min(slides.length - 1, active + (event.key === "ArrowRight" ? 1 : -1))));
      }}>
        {slides.map((slide, index) => <div key={labels[index] ?? index} className="mobile-carousel-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${labels[index] ?? label}`}>{slide}</div>)}
      </div>
      {slides.length > 1 && <div className="flex justify-center gap-1 md:hidden" aria-label={`${label} slide controls`}>{slides.map((_, index) => <button key={index} type="button" aria-label={`Show ${labels[index] ?? `slide ${index + 1}`}`} aria-controls={id} aria-current={active === index ? "true" : undefined} onClick={() => goTo(index)} className="grid size-10 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-brand-orange"><span className={`h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${active === index ? "w-6 bg-brand-orange" : "w-1.5 bg-[#d9dce1]"}`} /></button>)}</div>}
    </div>
  );
}
