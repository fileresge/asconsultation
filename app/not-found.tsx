import Link from "next/link";

export default function NotFound() {
  return <main className="mx-auto flex min-h-[50dvh] w-full max-w-2xl flex-col items-center justify-center px-5 py-16 text-center"><p className="text-sm font-bold tracking-[0.2em] text-brand-orange-dark">404</p><h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy">This page couldn&apos;t be found.</h1><p className="mt-5 text-base leading-7 text-[#667085]">The link may have changed. Explore our tax tools or head back to the homepage to find what you need.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className="rounded-xl bg-brand-orange px-6 py-3.5 font-bold text-white hover:bg-brand-orange-dark">Back to home</Link><Link href="/tax-tools" className="rounded-xl border border-[#e2e6eb] px-6 py-3.5 font-bold text-navy hover:bg-[#F0F7FC]">Explore tax tools</Link></div></main>;
}
