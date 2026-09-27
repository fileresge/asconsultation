"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, PhoneCall, X } from "lucide-react";
import { serviceContact, type BusinessService } from "../lib/business-services";

export default function ServiceCallbackDialog({ service, onClose }: { service: BusinessService; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const message = `Hello asconsultations, I would like to request a callback.\nService: ${service.title}\nUsername: ${name.trim()}\nContact: ${phone.trim()}${email.trim() ? `\nEmail: ${email.trim()}` : ""}${notes.trim() ? `\nMessage: ${notes.trim()}` : ""}`;
  const inputClass = "mt-2 w-full rounded-xl border border-[#dedee5] bg-white px-4 py-3 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15";

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog ref={dialogRef} aria-labelledby="callback-heading" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_32px)] max-w-lg overflow-y-auto rounded-3xl border-0 bg-white p-6 text-navy shadow-2xl backdrop:bg-navy/45 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div><span className="mb-4 grid size-11 place-items-center rounded-xl bg-[#E8F3FB] text-brand-orange-dark"><PhoneCall size={22} /></span><h2 id="callback-heading" className="text-2xl font-extrabold">Let&apos;s talk about your service</h2></div>
        <button type="button" onClick={onClose} aria-label="Close callback form" className="rounded-lg p-2 text-[#747780] hover:bg-[#f5f5f7] focus-visible:outline-2 focus-visible:outline-brand-orange"><X size={21} /></button>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#747780]">{service.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#747780]">Fill in your details, then send the prepared message on WhatsApp to request a callback.</p>
      <form action={`https://wa.me/${serviceContact.whatsapp}`} method="get" target="_blank" rel="noopener noreferrer" onSubmit={() => setSubmitted(true)} className="mt-6 grid gap-4">
        <input type="hidden" name="text" value={message} />
        <label className="text-sm font-bold">Username <span className="font-normal text-brand-orange-dark">(required)</span><input autoFocus required pattern={".*\\S.*"} maxLength={100} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className={inputClass} placeholder="Your name" title="Please enter your name." /></label>
        <label className="text-sm font-bold">Contact number <span className="font-normal text-brand-orange-dark">(required)</span><input required type="tel" pattern="[+]?[0-9][0-9 ]{6,23}" maxLength={25} autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} placeholder="e.g. 03XX XXXXXXX" title="Enter your phone number using digits, spaces, and an optional leading +." /></label>
        <label className="text-sm font-bold">Email <span className="font-normal text-[#85858a]">(optional)</span><input type="email" maxLength={254} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} placeholder="you@example.com" /></label>
        <label className="text-sm font-bold">Message <span className="font-normal text-[#85858a]">(optional)</span><textarea rows={3} maxLength={1000} value={notes} onChange={(event) => setNotes(event.target.value)} className={`${inputClass} resize-y`} placeholder="Tell us a little about what you need." /></label>
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3.5 font-bold text-white transition-colors hover:bg-brand-orange-dark">Continue on WhatsApp <ArrowUpRight size={18} /></button>
        {submitted && <p role="status" className="text-sm leading-relaxed text-[#747780]">Your message is ready in WhatsApp. Send it there to complete your callback request.</p>}
      </form>
    </dialog>
  );
}
