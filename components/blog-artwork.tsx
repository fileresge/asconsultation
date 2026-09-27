import { BriefcaseBusiness, CalendarCheck2, Files, MessagesSquare } from "lucide-react";
import type { BlogPost } from "../lib/blog";

const styles = {
  conversation: { background: "bg-navy text-white", icon: MessagesSquare, accent: "bg-[#ff8a45] text-white" },
  documents: { background: "bg-[#E8F3FB] text-navy", icon: Files, accent: "bg-white text-brand-orange" },
  routine: { background: "bg-[#eaf0f7] text-navy", icon: CalendarCheck2, accent: "bg-navy text-white" },
  business: { background: "bg-[#087AC8] text-white", icon: BriefcaseBusiness, accent: "bg-white text-brand-orange-dark" },
};

export default function BlogArtwork({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const { background, icon: Icon, accent } = styles[post.artwork];
  return (
    <div aria-hidden="true" className={`relative isolate flex h-full min-h-[230px] flex-col justify-between overflow-hidden p-7 sm:p-8 ${featured ? "min-h-[340px] sm:min-h-[410px]" : ""} ${background}`}>
      <div className="absolute -top-16 -right-16 -z-10 size-72 rounded-full border-[42px] border-current opacity-[0.045]" />
      <div className="absolute -bottom-24 -left-16 -z-10 size-64 rounded-full border-[42px] border-current opacity-[0.045]" />
      <p className="text-[10px] font-bold tracking-[0.22em] opacity-70">THE ASCONSULTATIONS JOURNAL</p>
      <div className={`mt-6 grid w-fit place-items-center rounded-2xl p-4 ${accent}`}><Icon size={featured ? 45 : 30} strokeWidth={1.4} /></div>
      <p className={`mt-7 max-w-[310px] leading-[1.15] font-extrabold tracking-[-1px] wrap-anywhere ${featured ? "text-[clamp(28px,8vw,38px)] sm:text-[46px]" : "text-[28px]"}`}>{post.coverTitle}</p>
      <span className="absolute right-7 bottom-7 size-3 rounded-full bg-current opacity-35" />
    </div>
  );
}
