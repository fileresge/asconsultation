"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const inputClass = "mt-2 min-h-12 w-full rounded-xl border border-[#dedee5] bg-[#fafbfc] px-4 py-3 text-base font-normal text-navy outline-none transition-colors placeholder:text-[#9298a2] focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15";

export default function ContactForm({ email }: { email: string }) {
  const [draftReady, setDraftReady] = useState(false);
  const reducedMotion = useReducedMotion();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const replyEmail = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const digits = phone.replace(/\D/g, "");

    phoneInput.setCustomValidity(/^\+?[\d\s().-]+$/.test(phone) && digits.length >= 7 && digits.length <= 15 ? "" : "Enter a phone number with 7 to 15 digits, including your country code if needed.");
    if (!form.reportValidity()) return;

    const body = [
      "Hello asconsultations,",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      ...(replyEmail ? [`Email: ${replyEmail}`] : []),
      ...(message ? ["", "Message:", message] : []),
    ].join("\r\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Website contact enquiry")}&body=${encodeURIComponent(body)}`;
    setDraftReady(true);
  }

  return (
    <section aria-labelledby="contact-form-heading" className="min-w-0 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_12px_36px_rgb(7_28_61/5%)] sm:p-8">
      <h2 id="contact-form-heading" className="text-2xl font-extrabold tracking-tight text-navy">Get in touch</h2>
      <p id="contact-form-help" className="mt-3 text-sm leading-6 text-[#667085]">Fill in your details, then send the prepared message from your email app.</p>
      <form action={`mailto:${email}`} method="post" encType="text/plain" onSubmit={handleSubmit} onChange={() => setDraftReady(false)} aria-describedby="contact-form-help" className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor="contact-name" className="text-sm font-bold text-navy">Name <span className="font-normal text-brand-orange-dark">(required)</span>
            <input id="contact-name" name="name" type="text" required pattern={".*\\S.*"} maxLength={100} autoComplete="name" placeholder="Your full name" title="Please enter your name." className={inputClass} />
          </label>
          <label htmlFor="contact-phone" className="text-sm font-bold text-navy">Phone <span className="font-normal text-brand-orange-dark">(required)</span>
            <input id="contact-phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" placeholder="e.g. 03XX XXXXXXX" onChange={(event) => event.currentTarget.setCustomValidity("")} className={inputClass} />
          </label>
        </div>
        <label htmlFor="contact-email" className="text-sm font-bold text-navy">Email <span className="font-normal text-[#667085]">(optional)</span>
          <input id="contact-email" name="email" type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" className={inputClass} />
        </label>
        <label htmlFor="contact-message" className="text-sm font-bold text-navy">Message <span className="font-normal text-[#667085]">(optional)</span>
          <textarea id="contact-message" name="message" rows={5} maxLength={1000} placeholder="How can we help you?" className={`${inputClass} min-h-32 resize-y`} />
        </label>
        <motion.button whileHover={reducedMotion ? undefined : { y: -2 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }} type="submit" className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3.5 font-bold text-white transition-colors hover:bg-brand-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange">Continue to email <ArrowUpRight size={18} aria-hidden="true" /></motion.button>
        {draftReady && <p role="status" className="rounded-xl bg-[#F0F7FC] p-4 text-sm leading-6 text-navy">Complete your enquiry by pressing Send in your email app. If it didn&apos;t open, email <a href={`mailto:${email}`} className="break-all font-bold text-brand-orange-dark underline">{email}</a> directly. Your details are still here.</p>}
        <noscript><p className="text-sm leading-6 text-[#667085]">Enable JavaScript to prepare your message, or email <a href={`mailto:${email}`} className="break-all text-brand-orange-dark underline">{email}</a> directly.</p></noscript>
      </form>
    </section>
  );
}
