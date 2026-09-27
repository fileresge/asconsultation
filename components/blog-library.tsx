"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Clock3, Search, X } from "lucide-react";
import { blogPosts, readingMinutes } from "../lib/blog";
import BlogArtwork from "./blog-artwork";

const categories = ["All articles", "Getting started", "Organisation", "Business essentials"];

export default function BlogLibrary() {
  const [category, setCategory] = useState("All articles");
  const [query, setQuery] = useState("");
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const posts = blogPosts.filter((post) => (category === "All articles" || category === post.category) && words.every((word) => `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(word)));

  return (
    <section id="articles" aria-labelledby="articles-heading" className="scroll-mt-8 py-16 sm:py-20">
      <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-center"><h2 id="articles-heading" className="text-3xl font-extrabold tracking-[-0.8px] text-navy">Explore the journal</h2><div className="relative w-full md:w-[320px]"><label htmlFor="blog-search" className="sr-only">Search articles</label><Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#8a8f99]" aria-hidden="true" /><input id="blog-search" type="search" placeholder="Find an article..." value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-full border border-[#e1e4e9] bg-white py-3.5 pr-11 pl-11 text-base outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 [&::-webkit-search-cancel-button]:appearance-none" />{query && <button type="button" aria-label="Clear article search" onClick={() => setQuery("")} className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-[#7b818e]"><X size={17} /></button>}</div></div>
      <div className="mb-8 flex flex-wrap gap-2" aria-label="Article categories">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${category === item ? "border-navy bg-navy text-white" : "border-[#e5e7eb] bg-white text-[#6f7580] hover:border-brand-orange hover:text-brand-orange-dark"}`}>{item}</button>)}</div>
      <p role="status" aria-live="polite" className="sr-only">{posts.length} articles found</p>
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-[22px] border border-[#e5e7eb] bg-white shadow-[0_3px_12px_rgb(7_28_61/3%)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_12px_30px_rgb(7_28_61/9%)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange motion-safe:hover:-translate-y-1 motion-reduce:transition-none"><div className="h-[240px]"><BlogArtwork post={post} /></div><div className="flex flex-1 flex-col p-6"><p className="mb-3 text-[11px] font-bold tracking-[0.06em] text-brand-orange-dark uppercase">{post.category}</p><h3 className="text-[21px] leading-snug font-bold tracking-[-0.4px] text-navy group-hover:text-brand-orange-dark">{post.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#777d88]">{post.excerpt}</p><div className="mt-auto flex items-center justify-between border-t border-[#eef0f3] pt-4"><span className="inline-flex items-center gap-1.5 text-xs text-[#9095a0]"><Clock3 size={14} aria-hidden="true" />{readingMinutes(post)} min read</span><span className="grid size-8 place-items-center rounded-full bg-[#E8F3FB] text-brand-orange-dark"><ArrowUpRight size={17} aria-hidden="true" /></span></div></div></Link>)}
      </div>
      {posts.length === 0 && <div className="rounded-2xl border border-dashed border-[#d9dfe7] bg-[#f8fafc] px-6 py-16 text-center"><Search size={32} className="mx-auto mb-4 text-brand-orange" aria-hidden="true" /><h3 className="text-xl font-bold text-navy">No articles found</h3><p className="mt-2 text-sm text-[#777d88]">Try a different keyword or explore another category.</p><button type="button" onClick={() => { setQuery(""); setCategory("All articles"); }} className="mt-5 rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white hover:bg-brand-orange-dark">Show all articles</button></div>}
    </section>
  );
}
