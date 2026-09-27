import { useState, type FormEvent } from "react";
import { ArrowUpRight, X } from "lucide-react";

const fieldClass = "mt-1.5 w-full rounded-xl border border-[#dce2ea] bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-[#087AC825]";

export default function ConsultationForm({ whatsappNumber, service, onClose, onEvent }: { whatsappNumber: string; service: string; onClose: () => void; onEvent: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const message = `Assalam-o-Alaikum AS Consultations,\n\nI visited your website and would like assistance regarding ${service || "tax and business services"}.\n\nName: ${name}\nPhone / WhatsApp: ${phone}\nMy question is: ${details || "Please contact me to discuss my requirements."}`;
    onEvent();
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="absolute inset-0 z-10 overflow-y-auto bg-white p-5">
      <div className="flex items-center justify-between"><div><h3 className="font-extrabold text-navy">Request a consultation</h3><p className="mt-1 text-xs text-[#687487]">Your details open in WhatsApp for you to review and send.</p></div><button type="button" onClick={onClose} aria-label="Close consultation form" className="grid size-10 place-items-center rounded-lg hover:bg-[#f3f5f8]"><X size={20} /></button></div>
      <form onSubmit={submit} className="mt-5 grid gap-4">
        <label className="text-xs font-bold text-navy">Name<input required maxLength={80} autoComplete="name" className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label className="text-xs font-bold text-navy">Phone / WhatsApp<input required type="tel" pattern="[+]?[0-9][0-9 ]{6,23}" maxLength={25} autoComplete="tel" className={fieldClass} value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
        <label className="text-xs font-bold text-navy">How can we help?<textarea maxLength={500} rows={4} className={`${fieldClass} resize-none`} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Service, tax year, taxpayer type, or a short summary" /></label>
        <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-sm font-bold text-white hover:bg-brand-orange-dark">Continue on WhatsApp <ArrowUpRight size={17} /></button>
      </form>
      <p className="mt-4 text-[11px] leading-5 text-[#687487]">Please do not share passwords, OTPs, bank credentials, portal logins, or confidential tax documents here.</p>
    </div>
  );
}



