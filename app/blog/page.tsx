import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { blogPosts, readingMinutes } from "../../lib/blog";
import BlogArtwork from "../../components/blog-artwork";
import BlogLibrary from "../../components/blog-library";
import StructuredData from "../../components/structured-data";
import { absoluteUrl, breadcrumbSchema, createPageMetadata, pageSeo } from "../../lib/seo";

export const metadata = createPageMetadata({ ...pageSeo.blog, path: "/blog" });

export default function BlogPage() {
  const featured = blogPosts[0];
  return (
    <main className="bg-[linear-gradient(180deg,#F6F9FC_0%,#fff_550px)] px-5 pt-7 sm:px-10">
      <StructuredData data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]),
        { "@context": "https://schema.org", "@type": "Blog", name: "asconsultations Journal", description: pageSeo.blog.description, url: absoluteUrl("/blog"), publisher: { "@id": absoluteUrl("/#organization") }, blogPost: blogPosts.map((post) => ({ "@type": "BlogPosting", headline: post.title, description: post.excerpt, url: absoluteUrl(`/blog/${post.slug}`) })) },
      ]} />
      <div className="mx-auto max-w-[1360px]">
        <nav aria-label="Breadcrumb" className="mb-10 flex gap-2 text-sm"><Link href="/" className="text-[#777b85] hover:text-brand-orange-dark">Home</Link><span aria-hidden="true" className="text-[#b0b2ba]">/</span><span aria-current="page" className="font-semibold text-brand-orange-dark">Blog</span></nav>
        <header className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-4 text-xs font-bold tracking-[0.18em] text-brand-orange-dark uppercase">The asconsultations journal</p><h1 className="text-[44px] leading-[1.07] font-extrabold tracking-[-1.8px] text-navy sm:text-[60px]">A little insight.<br />A lot more <span className="text-brand-orange">clarity.</span></h1></div><p className="max-w-[400px] text-base leading-relaxed text-[#7b7f89] sm:text-lg">Thoughtful reads, practical habits, and useful starting points for your business journey.</p></header>
        <section aria-labelledby="featured-heading" className="grid overflow-hidden rounded-[28px] border border-[#e8e4df] bg-white shadow-[0_10px_35px_rgb(7_28_61/5%)] md:grid-cols-[1fr_1.05fr]"><BlogArtwork post={featured} featured /><div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-12"><p className="mb-5 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-brand-orange-dark uppercase"><span className="size-1.5 rounded-full bg-brand-orange" />Featured read</p><h2 id="featured-heading" className="max-w-lg text-[30px] leading-[1.2] font-extrabold tracking-[-1px] text-navy sm:text-[38px]">{featured.title}</h2><p className="mt-5 text-base leading-relaxed text-[#777d88]">{featured.excerpt}</p><p className="mt-5 inline-flex items-center gap-2 text-xs text-[#959aa4]"><Clock3 size={14} aria-hidden="true" />{readingMinutes(featured)} min read<span aria-hidden="true">·</span>{featured.category}</p><Link href={`/blog/${featured.slug}`} className="mt-7 inline-flex items-center gap-3 rounded-xl bg-brand-orange px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-orange-dark">Read the story <ArrowRight size={17} /></Link></div></section>
        <BlogLibrary />
        <section className="mb-16 flex flex-col items-start justify-between gap-6 rounded-3xl bg-navy p-8 text-white md:flex-row md:items-center sm:p-10"><div><p className="mb-3 text-xs font-bold tracking-wider text-[#00AEEF] uppercase">From reading to a real conversation</p><h2 className="text-3xl font-bold tracking-[-0.7px]">Ready for your next step?</h2><p className="mt-3 text-sm leading-relaxed text-white/65">Explore our services or meet the people who can guide you.</p></div><div className="flex flex-wrap gap-3"><Link href="/business-services" className="rounded-xl bg-brand-orange px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-orange-dark">Explore services</Link><Link href="/our-team" className="rounded-xl border border-white/25 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10">Meet the team</Link></div></section>
      </div>
    </main>
  );
}
