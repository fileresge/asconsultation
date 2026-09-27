import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-react";
import { blogPosts, getBlogPost, readingMinutes } from "../../../lib/blog";
import { whatsappEnquiryUrl } from "../../../lib/business-services";
import BlogArtwork from "../../../components/blog-artwork";
import StructuredData from "../../../components/structured-data";
import { absoluteUrl, breadcrumbSchema, createPageMetadata, socialImageUrl } from "../../../lib/seo";

export function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  return post ? createPageMetadata({ title: post.seoTitle, description: post.excerpt, path: `/blog/${post.slug}`, article: true, keywords: [post.seoTitle, post.category, "asconsultations Journal"] }) : { title: "Article not found | asconsultations", robots: { index: false, follow: true } };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  return (
    <main className="px-5 pt-8 pb-16 sm:px-10">
      <StructuredData data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]),
        { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, url: absoluteUrl(`/blog/${post.slug}`), mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) }, image: [socialImageUrl(post.seoTitle, "The asconsultations Journal")], inLanguage: "en-PK", articleSection: post.category, author: { "@type": "Organization", name: "asconsultations", url: absoluteUrl("/") }, publisher: { "@id": absoluteUrl("/#organization") } },
      ]} />
      <article className="mx-auto max-w-[1120px]">
        <Link href="/blog" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#727986] hover:text-brand-orange-dark"><ArrowLeft size={16} />Back to the journal</Link>
        <header className="mx-auto mb-10 max-w-[850px] text-center"><p className="mb-4 text-xs font-bold tracking-[0.15em] text-brand-orange-dark uppercase">{post.category}</p><h1 className="text-[36px] leading-[1.15] font-extrabold tracking-[-1.3px] text-navy sm:text-[50px]">{post.title}</h1><p className="mt-5 text-lg leading-relaxed text-[#7b818d]">{post.excerpt}</p><div className="mt-6 inline-flex items-center gap-3 text-sm text-[#8b919c]"><span className="font-semibold text-navy">asconsultations Journal</span><span aria-hidden="true">·</span><Clock3 size={15} aria-hidden="true" />{readingMinutes(post)} min read</div></header>
        <div className="mb-12 overflow-hidden rounded-3xl"><BlogArtwork post={post} featured /></div>
        <div className="grid items-start gap-10 md:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="In this article" className="rounded-2xl border border-[#e8ebef] bg-[#fafbfc] p-5 md:sticky md:top-8"><p className="mb-4 text-xs font-bold tracking-wide text-navy uppercase">In this article</p><ul className="grid gap-4">{post.sections.map((section, index) => <li key={section.title}><a href={`#section-${index + 1}`} className="text-sm leading-relaxed text-[#7b818d] hover:text-brand-orange-dark">{section.title}</a></li>)}</ul></nav>
          <div><p className="mb-10 text-lg leading-[1.8] text-[#596171]">{post.intro}</p>{post.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.title} className="mb-10 scroll-mt-8"><h2 className="mb-4 text-2xl leading-snug font-bold tracking-[-0.5px] text-navy">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-base leading-[1.85] text-[#6d7481]">{paragraph}</p>)}{section.checklist && <ul className="mt-6 grid gap-3 rounded-2xl bg-[#F6F9FC] p-6">{section.checklist.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#666e7b]"><Check size={18} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden="true" />{item}</li>)}</ul>}</section>)}<div className="rounded-2xl bg-navy p-7 text-white"><h2 className="text-xl font-bold">Have a question about your next step?</h2><p className="mt-3 text-sm leading-relaxed text-white/65">Talk to our team about the support that fits your situation.</p><a href={whatsappEnquiryUrl(post.title)!} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#00AEEF] hover:text-white">Start a conversation <ArrowRight size={17} /></a></div></div>
        </div>
      </article>
      <section className="mx-auto mt-16 max-w-[1120px] border-t border-[#eceef2] pt-10"><div className="mb-6 flex items-center justify-between gap-4"><h2 className="text-2xl font-bold text-navy">Keep exploring</h2><Link href="/blog" className="text-sm font-bold text-brand-orange-dark hover:underline">All articles</Link></div><div className="grid gap-5 sm:grid-cols-2">{blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2).map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-2xl border border-[#e5e8ed] p-6 transition-colors hover:border-brand-orange/50 hover:bg-[#F6F9FC]"><p className="mb-3 text-xs font-bold text-brand-orange-dark">{item.category}</p><h3 className="text-lg font-bold text-navy">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#818793]">{item.excerpt}</p></Link>)}</div></section>
    </main>
  );
}
