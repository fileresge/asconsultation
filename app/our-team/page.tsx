import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, UserRound } from "lucide-react";
import { partners, teamMembers } from "../../lib/team";
import { whatsappEnquiryUrl } from "../../lib/business-services";
import TeamGallery from "../../components/team-gallery";
import StructuredData from "../../components/structured-data";
import { absoluteUrl, breadcrumbSchema, createPageMetadata, pageSeo } from "../../lib/seo";

export const metadata = createPageMetadata({ ...pageSeo.team, path: "/our-team" });

export default function OurTeamPage() {
  return (
    <main>
      <StructuredData data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Our Team", path: "/our-team" }]),
        { "@context": "https://schema.org", "@type": "AboutPage", name: pageSeo.team.title, description: pageSeo.team.description, url: absoluteUrl("/our-team"), mainEntity: partners.map((partner) => ({ "@type": "Person", name: partner.name, jobTitle: partner.role, description: partner.description, image: absoluteUrl(partner.image), worksFor: { "@id": absoluteUrl("/#organization") } })) },
      ]} />
      <section className="overflow-hidden bg-[linear-gradient(120deg,#F6F9FC_0%,#fff_70%)] px-5 pt-7 pb-16 sm:px-10 sm:pb-20">
        <div className="mx-auto max-w-[1360px]">
          <nav aria-label="Breadcrumb" className="mb-10 flex gap-2 text-sm"><Link href="/" className="text-[#777b85] hover:text-brand-orange-dark">Home</Link><span aria-hidden="true" className="text-[#b0b2ba]">/</span><span aria-current="page" className="font-semibold text-brand-orange-dark">Our Team</span></nav>
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
            <div><p className="mb-5 text-xs font-bold tracking-[0.18em] text-brand-orange-dark uppercase">People first. Always.</p><h1 className="max-w-xl text-[42px] leading-[1.08] font-extrabold tracking-[-1.8px] text-navy sm:text-[56px] lg:text-[64px]">The people behind your <span className="text-brand-orange">peace of mind.</span></h1><p className="mt-6 max-w-lg text-base leading-relaxed text-[#757a86] sm:text-lg">Tax, accounting, and compliance are personal. Meet the people bringing clarity, care, and a practical perspective to your business journey.</p><div className="mt-8 flex flex-wrap gap-4"><a href="#partners" className="inline-flex items-center gap-3 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-dark">Meet our partners <ArrowDown size={17} /></a><a href="#gallery" className="inline-flex items-center gap-3 rounded-xl border border-[#e5e5e9] bg-white px-6 py-3.5 text-sm font-bold text-navy hover:border-brand-orange">Explore the gallery <ArrowRight size={17} /></a></div></div>
            <div className="relative pb-6 pl-4 sm:pl-7"><div aria-hidden="true" className="absolute inset-0 top-7 right-5 rounded-[32px] bg-[#DCEFFC]" /><div className="relative overflow-hidden rounded-[28px] border border-white bg-white p-2 shadow-[0_16px_45px_rgb(7_28_61/10%)]"><Image src="/gallery/image-1.png" alt="A group photograph in an office" width={1022} height={664} sizes="(max-width: 900px) 95vw, 48vw" loading="eager" className="h-auto w-full rounded-[22px]" /><div className="flex items-center justify-between gap-3 px-4 py-5"><p className="text-sm font-bold text-navy">Personal guidance. Shared purpose.</p><span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-[#E8F3FB] text-brand-orange"><Check size={19} /></span></div></div></div>
          </div>
        </div>
      </section>

      <section id="partners" aria-labelledby="partners-heading" className="scroll-mt-8 px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1360px]"><div className="mb-10 max-w-2xl"><p className="mb-3 text-xs font-bold tracking-[0.18em] text-brand-orange-dark uppercase">Our partners</p><h2 id="partners-heading" className="text-4xl font-extrabold tracking-[-1px] text-navy sm:text-[46px]">Experience with a personal approach.</h2><p className="mt-4 text-base leading-relaxed text-[#777b85]">Focused expertise and thoughtful guidance, built around the needs of each client.</p></div>
          <div className="grid gap-7 lg:grid-cols-2">{partners.map((partner) => <article key={partner.name} className="overflow-hidden rounded-3xl border border-[#e8e8ec] bg-white shadow-[0_6px_24px_rgb(7_28_61/5%)] sm:grid sm:grid-cols-[0.8fr_1.2fr] lg:grid-cols-[0.75fr_1.25fr]">
            <div className="relative min-h-[330px] bg-[#f3f2f0] sm:min-h-full"><Image src={partner.image} alt={partner.name} fill sizes="(max-width: 600px) 90vw, (max-width: 1140px) 40vw, 24vw" className="object-cover object-top" /></div>
            <div className="flex flex-col p-6 sm:p-7"><p className="text-[11px] leading-relaxed font-bold tracking-wide text-brand-orange-dark uppercase">{partner.role}</p><h3 className="mt-3 text-2xl font-extrabold tracking-[-0.5px] text-navy">{partner.name}</h3><p className="mt-4 text-sm leading-[1.8] text-[#737884]">{partner.description}</p><ul className="mt-6 flex flex-wrap gap-2">{partner.focus.map((focus) => <li key={focus} className="rounded-full bg-[#F0F7FC] px-3 py-1.5 text-[11px] font-semibold text-[#052B55]">{focus}</li>)}</ul></div>
          </article>)}</div>
        </div>
      </section>

      <section aria-labelledby="team-heading" className="bg-[#f8fafc] px-5 py-16 sm:px-10 sm:py-20"><div className="mx-auto max-w-[1360px]"><div className="mb-10 text-center"><p className="mb-3 text-xs font-bold tracking-[0.18em] text-brand-orange-dark uppercase">Working together</p><h2 id="team-heading" className="text-4xl font-extrabold tracking-[-1px] text-navy sm:text-[46px]">Meet our team</h2><p className="mt-4 text-base text-[#777b85]">A shared focus on thoughtful service and clear communication.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{teamMembers.map((member, index) => <article key={member.name} className="rounded-2xl border border-[#e6e9ee] bg-white p-6"><div className={`relative mb-5 grid aspect-[5/4] place-items-center overflow-hidden rounded-xl ${index % 2 ? "bg-[#edf2f7]" : "bg-[#E8F3FB]"}`}><span aria-hidden="true" className="grid size-24 place-items-center rounded-full bg-white/70"><UserRound size={46} strokeWidth={1.2} className="text-[#9ba6b7]" /></span><span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#7b8390]">DEMO PROFILE</span></div><h3 className="text-lg font-bold text-navy">{member.name}</h3><p className="mt-1 text-sm font-semibold text-brand-orange-dark">{member.role}</p><p className="mt-3 text-sm leading-relaxed text-[#777b85]">{member.description}</p></article>)}</div></div></section>

      <TeamGallery />
      <section className="px-5 py-16 sm:px-10"><div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-6 rounded-3xl border border-[#D8E7F2] bg-[#F6F9FC] p-8 md:flex-row md:items-center sm:p-10"><div><h2 className="text-3xl font-extrabold tracking-[-0.8px] text-navy">Let&apos;s start a conversation.</h2><p className="mt-3 text-base text-[#777b85]">Tell us where you are today, and where you want to go.</p></div><a href={whatsappEnquiryUrl("speaking with the asconsultations team")!} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-brand-orange px-6 py-4 text-sm font-bold text-white hover:bg-brand-orange-dark">Talk to our team <ArrowRight size={18} /></a></div></section>
    </main>
  );
}
