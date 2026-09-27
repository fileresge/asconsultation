"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { galleryImages } from "../lib/team";

function GalleryViewer({ initialIndex, onClose }: { initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photo = galleryImages[index];
  function previous() { setIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length); }
  function next() { setIndex((current) => (current + 1) % galleryImages.length); }

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);

  return (
    <dialog ref={dialogRef} aria-label="asconsultations photo gallery" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); previous(); } if (event.key === "ArrowRight") { event.preventDefault(); next(); } }} className="fixed inset-0 m-auto w-[calc(100%_-_24px)] max-w-[1200px] overflow-hidden rounded-2xl border border-white/15 bg-navy p-4 text-white shadow-2xl backdrop:bg-[#020b19]/90 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4"><p className="text-sm font-medium">{photo.title}</p><button autoFocus type="button" onClick={onClose} aria-label="Close gallery" className="rounded-full bg-white/10 p-2 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-brand-orange"><X size={22} /></button></div>
      <div className="relative h-[min(60dvh,calc(100dvh_-_190px))] sm:h-[min(65dvh,calc(100dvh_-_210px))]"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1200px) 95vw, 1150px" className="object-contain" /></div>
      <div className="mt-4 flex items-center justify-between"><button type="button" onClick={previous} aria-label="Previous photo" className="rounded-full bg-white/10 p-3 hover:bg-white/20"><ArrowLeft size={20} /></button><p aria-live="polite" className="text-sm text-white/70">{index + 1} / {galleryImages.length}</p><button type="button" onClick={next} aria-label="Next photo" className="rounded-full bg-white/10 p-3 hover:bg-white/20"><ArrowRight size={20} /></button></div>
    </dialog>
  );
}

export default function TeamGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-8 bg-navy px-5 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-bold tracking-[0.18em] text-[#00AEEF] uppercase">Life at asconsultations</p><h2 id="gallery-heading" className="text-4xl font-extrabold tracking-[-1.2px] text-white sm:text-[48px]">A closer look at <span className="text-[#00AEEF]">our world.</span></h2></div><p className="max-w-sm text-sm leading-relaxed text-white/60 sm:text-base">The people and moments behind our work. Explore the gallery, one photograph at a time.</p></div>
        <div className="grid items-start gap-6 md:grid-cols-[1.2fr_1fr] md:gap-8">
          {galleryImages.map((photo, index) => <div key={photo.src} className={index === 1 ? "md:pt-16" : ""}>
            <button type="button" onClick={() => setSelected(index)} aria-label={`View ${photo.title}`} className="group block w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/5 text-left transition-colors hover:border-white/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange">
              <div className="relative overflow-hidden"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 900px) 95vw, 50vw" className="h-auto w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" /><span className="absolute right-4 bottom-4 grid size-10 place-items-center rounded-full bg-white text-navy shadow-lg"><Expand size={17} aria-hidden="true" /></span></div>
              <div className="flex items-center justify-between gap-4 p-5 sm:p-6"><div><h3 className="text-lg font-bold text-white">{photo.title}</h3><p className="mt-1 text-sm text-white/55">{photo.caption}</p></div><span aria-hidden="true" className="text-sm text-white/35">0{index + 1}</span></div>
            </button>
            {index === 0 && <p className="max-w-lg pt-8 text-[26px] leading-snug font-medium tracking-[-0.4px] text-white/85 sm:text-[32px]">Good work starts with<br /><span className="text-[#00AEEF]">good conversations.</span></p>}
          </div>)}
        </div>
      </div>
      {selected !== null && <GalleryViewer initialIndex={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
