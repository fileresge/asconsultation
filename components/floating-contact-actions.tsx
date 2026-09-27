"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bot, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const topics = [
  { id: "filing", label: "I want to file my taxes", answer: "Start by comparing our Essential, Priority, and Premium filing plans. Choose a plan to discuss the next steps with our team on WhatsApp.", href: "/#file", action: "Explore filing plans" },
  { id: "calculator", label: "Help me calculate salary tax", answer: "Our salary calculator estimates tax and take-home pay. Enter your monthly taxable salary and select the tax year to get started.", href: "/tax-tools/salary-calculator", action: "Open salary calculator" },
  { id: "services", label: "I need business services", answer: "Explore our tax, company registration, accounting, and other business services. Each service includes its requirements and a way to contact the team.", href: "/business-services", action: "Browse business services" },
  { id: "contact", label: "I’d like to speak to the team", answer: "You can reach our team on WhatsApp or send an email. Our Contact page also has a form to help you prepare your enquiry.", href: "/tax-tools/contact", action: "Go to Contact" },
] as const;

export default function FloatingContactActions({ whatsappUrl, email }: { whatsappUrl: string | null; email: string }) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const [topicId, setTopicId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const topic = topics.find((item) => item.id === topicId);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (topicId && open) answerRef.current?.scrollIntoView({ behavior: "instant", block: "nearest" });
  }, [topicId, open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <div aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-[#e8e8ed] bg-white/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgb(7_28_61/7%)] backdrop-blur-md md:inset-x-auto md:right-6 md:bottom-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
        {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens in a new tab)" className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#128c4a] px-4 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#0f743e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128c4a] md:size-14 md:flex-none md:rounded-full md:p-0"><Image src="/svg/whatsapp.svg" alt="" width={24} height={24} className="size-6 rounded-full" unoptimized /><span className="md:sr-only">WhatsApp</span></a>}
        <button ref={triggerRef} type="button" aria-label={open ? "Close chatbot" : "Open chatbot"} aria-expanded={open} aria-controls="asconsultations-chatbot" onClick={() => setOpen(!open)} className="inline-flex min-h-12 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#123362] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange md:size-14 md:flex-none md:rounded-full md:p-0">{open ? <X size={23} aria-hidden="true" /> : <Bot size={23} aria-hidden="true" />}<span className="md:sr-only">{open ? "Close chat" : "Chatbot"}</span></button>
      </div>

      <AnimatePresence>{open && <motion.section key="chatbot" initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : 8 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} id="asconsultations-chatbot" role="dialog" aria-labelledby="chatbot-heading" aria-describedby="chatbot-description" className="fixed right-3 bottom-[calc(88px+env(safe-area-inset-bottom))] left-3 z-50 flex max-h-[calc(100dvh-120px-env(safe-area-inset-bottom))] flex-col overflow-hidden rounded-3xl border border-[#e8e8ed] bg-white text-navy shadow-[0_16px_70px_rgb(7_28_61/25%)] sm:left-auto sm:w-[380px] md:right-6 md:bottom-24">
        <header className="flex shrink-0 items-center gap-3 bg-navy px-5 py-4 text-white">
          <span className="grid size-10 place-items-center rounded-xl bg-white/10"><Bot size={23} aria-hidden="true" /></span>
          <div className="flex-1"><h2 id="chatbot-heading" className="text-base font-bold">asconsultations assistant</h2><p id="chatbot-description" className="mt-1 text-xs text-[#bdc9dd]">Quick help, one tap away</p></div>
          <button ref={closeRef} type="button" aria-label="Close assistant" onClick={close} className="grid size-10 cursor-pointer place-items-center rounded-lg hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"><X size={21} aria-hidden="true" /></button>
        </header>
        <div className="overflow-y-auto overscroll-contain p-5">
          <p className="rounded-2xl rounded-tl-sm bg-[#f3f5f8] p-4 text-sm leading-6">Hello! I can help you find the right page or connect with the asconsultations team. What would you like to do?</p>
          <div className="mt-4 grid gap-2" aria-label="Choose a help topic">{topics.map((item) => <button key={item.id} type="button" aria-pressed={topicId === item.id} onClick={() => setTopicId(item.id)} className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-orange ${topicId === item.id ? "border-brand-orange bg-[#F0F7FC] text-brand-orange-dark" : "border-[#e0e4ea] hover:border-brand-orange hover:bg-[#F6F9FC]"}`}>{item.label}</button>)}</div>
          <div ref={answerRef} role="status" aria-live="polite" aria-atomic="true">{topic && <div className="mt-4 rounded-2xl rounded-tl-sm bg-[#f3f5f8] p-4"><p className="text-sm leading-6">{topic.answer}</p><Link href={topic.href} onClick={() => setOpen(false)} className="mt-3 inline-flex items-center gap-2 rounded text-sm font-bold text-brand-orange-dark hover:underline focus-visible:outline-2 focus-visible:outline-brand-orange">{topic.action}<ArrowUpRight size={16} aria-hidden="true" /></Link></div>}</div>
          <p className="mt-5 text-xs leading-5 text-[#667085]">Prefer email? <a href={`mailto:${email}`} className="break-all font-semibold text-brand-orange-dark hover:underline">{email}</a></p>
        </div>
      </motion.section>}</AnimatePresence>
    </>
  );
}
