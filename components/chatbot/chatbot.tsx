"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, ChevronDown, MessageCircle, RotateCcw, Send, Trash2, X } from "lucide-react";
import { chatbotConfig } from "../../lib/chatbot-config";
import ChatMessage, { type ChatMessageData } from "./chat-message";
import ConsultationForm from "./consultation-form";

const initialMessage: ChatMessageData = { id: "welcome", role: "assistant", content: chatbotConfig.welcomeMessage };

function track(name: string) {
  const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  analyticsWindow.gtag?.("event", name);
  analyticsWindow.dataLayer?.push({ event: name });
}

function inferredService(messages: ChatMessageData[]) {
  const latest = [...messages].reverse().find((item) => item.role === "user")?.content;
  return latest?.slice(0, 180) || "tax and business services";
}

function hasHighIntent(messages: ChatMessageData[]) {
  const text = messages.filter((item) => item.role === "user").map((item) => item.content).join(" ").toLowerCase();
  return /\b(need|want|file|register|registration|notice|appeal|consultant|hire|received|handle|book|help me)\b/.test(text);
}

export default function Chatbot({ whatsappNumber }: { whatsappNumber: string }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailed, setLastFailed] = useState<string | null>(null);
  const [showConsultation, setShowConsultation] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let hydrationTimer: number | undefined;
    try {
      const saved = localStorage.getItem(chatbotConfig.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessageData[];
        if (Array.isArray(parsed) && parsed.length) {
          hydrationTimer = window.setTimeout(() => setMessages(parsed.slice(-30)), 0);
        }
      }
    } catch { /* Ignore inaccessible or invalid browser storage. */ }
    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    try { localStorage.setItem(chatbotConfig.storageKey, JSON.stringify(messages.slice(-30))); } catch { /* Storage is optional. */ }
    endRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, [messages, loading, reducedMotion]);

  useEffect(() => {
    if (!open) return;
    if (!minimized) window.setTimeout(() => textareaRef.current?.focus(), 150);
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  function openChat() {
    setOpen(true);
    setMinimized(false);
    track("chatbot_opened");
  }

  function close() {
    setOpen(false);
    setShowConsultation(false);
    triggerRef.current?.focus();
  }

  async function send(rawMessage = input) {
    const message = rawMessage.trim();
    if (!message || loading || message.length > chatbotConfig.maxMessageLength) return;
    const userMessage: ChatMessageData = { id: crypto.randomUUID(), role: "user", content: message };
    const priorMessages = messages.filter((item) => item.id !== "welcome");
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError(null);
    setLastFailed(null);
    setLoading(true);
    track("chatbot_message_sent");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: priorMessages.slice(-chatbotConfig.maxHistoryMessages).map(({ role, content }) => ({ role, content })) }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) throw new Error(data.error || "Unable to get a response.");
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: data.reply! }]);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Sorry, the assistant is unavailable right now.");
      setLastFailed(message);
    } finally {
      setLoading(false);
    }
  }

  function clearConversation() {
    setMessages([initialMessage]);
    setError(null);
    setLastFailed(null);
    localStorage.removeItem(chatbotConfig.storageKey);
  }

  function onTextareaKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  }

  const whatsappText = `Assalam-o-Alaikum AS Consultations,\n\nI visited your website and would like assistance regarding ${inferredService(messages)}.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-[#e8e8ed] bg-white/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgb(7_28_61/7%)] backdrop-blur-md md:inset-x-auto md:right-6 md:bottom-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none">
        <a href={whatsappUrl} onClick={() => track("whatsapp_clicked")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens in a new tab)" className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#128c4a] px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#0f743e] md:size-14 md:flex-none md:rounded-full md:p-0"><Image src="/svg/whatsapp.svg" alt="" width={24} height={24} unoptimized /><span className="md:sr-only">WhatsApp</span></a>
        <button ref={triggerRef} type="button" onClick={open ? close : openChat} aria-label={open ? "Close AS Consultations AI" : "Ask AS Consultations AI"} aria-expanded={open} aria-controls="asconsultations-ai-chat" className="group inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#123362] md:w-auto md:flex-none md:rounded-full md:px-5"><Bot size={22} /><span>{open ? "Close" : "Ask AS Consultations AI"}</span><span className="absolute -top-1 -right-1 size-3 rounded-full border-2 border-white bg-brand-orange" aria-hidden="true" /></button>
      </div>

      <AnimatePresence>{open && !minimized && <motion.section id="asconsultations-ai-chat" role="dialog" aria-modal="false" aria-labelledby="chatbot-title" initial={{ opacity: 0, y: reducedMotion ? 0 : 18, scale: reducedMotion ? 1 : 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reducedMotion ? 0 : 12, scale: reducedMotion ? 1 : 0.98 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="fixed inset-x-0 top-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-50 flex flex-col overflow-hidden bg-white text-navy shadow-[0_18px_80px_rgb(7_28_61/28%)] sm:top-auto sm:right-4 sm:bottom-[calc(84px+env(safe-area-inset-bottom))] sm:left-auto sm:h-[min(620px,calc(100dvh-120px))] sm:w-[410px] sm:rounded-3xl sm:border sm:border-[#dce2ea] md:right-6 md:bottom-24">
        <header className="flex shrink-0 items-center gap-3 bg-[linear-gradient(135deg,#073B72,#087AC8)] px-4 py-3.5 text-white">
          <span className="relative grid size-10 place-items-center rounded-xl bg-white/10"><Bot size={22} /><span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-navy bg-[#42d392]" /></span>
          <div className="min-w-0 flex-1"><h2 id="chatbot-title" className="truncate text-sm font-extrabold">{chatbotConfig.assistantName}</h2><p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#c6d2e5]"><span className="size-1.5 rounded-full bg-[#42d392]" />Online Ã‚Â· {chatbotConfig.subtitle}</p></div>
          <button type="button" onClick={() => setMinimized(true)} aria-label="Minimize chat" className="grid size-9 place-items-center rounded-lg hover:bg-white/10"><ChevronDown size={20} /></button>
          <button type="button" onClick={close} aria-label="Close chat" className="grid size-9 place-items-center rounded-lg hover:bg-white/10"><X size={20} /></button>
        </header>

        <div className="relative min-h-0 flex-1">
          <div className="h-full overflow-y-auto overscroll-contain bg-[#fafbfc] px-4 py-4" aria-live="polite">
            <div className="grid gap-3">{messages.map((message) => <ChatMessage key={message.id} message={message} />)}</div>
            {messages.length === 1 && <><div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" aria-label="Quick actions">{chatbotConfig.quickActions.map((action) => <button key={action} type="button" onClick={() => { track("quick_action_clicked"); void send(action); }} className="shrink-0 rounded-full border border-[#dce2ea] bg-white px-3.5 py-2 text-xs font-bold text-navy hover:border-brand-orange hover:bg-[#F0F7FC]">{action}</button>)}</div><div className="mt-3"><p className="mb-2 text-[10px] font-bold tracking-[.1em] text-[#7b8593] uppercase">Popular questions</p><div className="grid gap-1.5">{chatbotConfig.suggestions.slice(0, 3).map((question) => <button key={question} type="button" onClick={() => void send(question)} className="rounded-lg px-2 py-1.5 text-left text-xs font-semibold text-[#526176] hover:bg-white hover:text-brand-orange-dark">{question}</button>)}</div></div></>}
            {hasHighIntent(messages) && !loading && <div className="mt-4 rounded-2xl border border-[#cfe8f8] bg-[#F0F7FC] p-3.5"><p className="text-sm font-extrabold text-navy">Need a Tax Consultant?</p><p className="mt-1 text-xs leading-5 text-[#687487]">Get a professional review for advice based on your facts.</p><div className="mt-3 flex gap-2"><a href={whatsappUrl} onClick={() => track("whatsapp_clicked")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#128c4a] px-3 text-xs font-bold text-white"><MessageCircle size={15} />WhatsApp</a><button type="button" onClick={() => setShowConsultation(true)} className="min-h-10 flex-1 rounded-lg bg-brand-orange px-3 text-xs font-bold text-white">Request consultation</button></div></div>}
            {loading && <div className="mt-3 flex items-center gap-2 text-xs text-[#687487]"><span className="grid size-7 place-items-center rounded-full bg-navy text-white"><Bot size={15} /></span><span className="flex gap-1 rounded-2xl bg-[#f1f4f8] px-4 py-3" aria-label="AS Consultations AI is typing"><i className="size-1.5 animate-bounce rounded-full bg-[#7a8798] [animation-delay:-.2s]" /><i className="size-1.5 animate-bounce rounded-full bg-[#7a8798] [animation-delay:-.1s]" /><i className="size-1.5 animate-bounce rounded-full bg-[#7a8798]" /></span></div>}
            {error && <div role="alert" className="mt-3 rounded-xl border border-[#ffd8c1] bg-[#fff6f0] p-3 text-xs leading-5 text-[#8d3510]">{error}{lastFailed && <button type="button" onClick={() => void send(lastFailed)} className="ml-2 inline-flex items-center gap-1 font-bold underline"><RotateCcw size={13} />Retry</button>}</div>}
            <div ref={endRef} />
          </div>
          {showConsultation && <ConsultationForm whatsappNumber={whatsappNumber} service={inferredService(messages)} onClose={() => setShowConsultation(false)} onEvent={() => track("consultation_requested")} />}
        </div>

        <footer className="shrink-0 border-t border-[#e8ebef] bg-white p-3">
          <div className="flex items-end gap-2 rounded-2xl border border-[#dce2ea] bg-white p-2 focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-[#087AC818]"><textarea ref={textareaRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onTextareaKeyDown} maxLength={chatbotConfig.maxMessageLength} rows={1} aria-label="Message AS Consultations AI" placeholder="Ask about tax, registration or compliance..." className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-ink outline-none placeholder:text-[#9299a4]" /><button type="button" onClick={() => void send()} disabled={!input.trim() || loading} aria-label="Send message" className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-orange text-white disabled:cursor-not-allowed disabled:opacity-40"><Send size={18} /></button></div>
          <div className="mt-2 flex items-center justify-between gap-3 px-1"><button type="button" onClick={clearConversation} className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#687487] hover:text-brand-orange-dark"><Trash2 size={12} />Clear conversation</button><p className="text-right text-[10px] text-[#87909d]">Avoid passwords, OTPs & bank details Ã‚Â· Powered by AI</p></div>
        </footer>
      </motion.section>}</AnimatePresence>

      {open && minimized && <button type="button" onClick={() => setMinimized(false)} className="fixed right-4 bottom-[calc(82px+env(safe-area-inset-bottom))] z-50 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-bold text-white shadow-xl md:right-6 md:bottom-24"><Bot size={20} />Resume chat</button>}
    </>
  );
}



