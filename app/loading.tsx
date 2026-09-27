export default function Loading() {
  return <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-10" aria-busy="true"><p role="status" className="mb-8 text-sm font-semibold text-brand-orange-dark">Loading your next step…</p><div aria-hidden="true" className="space-y-6 motion-safe:animate-pulse"><div className="h-10 w-2/3 max-w-lg rounded-xl bg-[#E8F3FB]" /><div className="h-5 w-full max-w-2xl rounded-lg bg-[#f0f3f7]" /><div className="grid gap-5 md:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-56 rounded-3xl bg-[#f5f7fa]" />)}</div></div></div>;
}
