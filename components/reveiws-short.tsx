import Image from "next/image";
import { ArrowRight, Clapperboard, Play, Star } from "lucide-react";
import MobileCarousel from "./mobile-carousel";

export type ShortReview = {
  id: string;
  name: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  dateLabel: string;
};

export type ShortReel = {
  id: string;
  title: string;
  /** YouTube links play inline; other social links open in a new tab. */
  url?: string;
  /** Optional direct video file URL for playback inside the card. */
  videoSrc?: string;
  thumbnail?: string;
  duration?: string;
};

export type ReviewsShortProps = {
  reviews?: ShortReview[];
  reels?: ShortReel[];
  reviewsTitle?: string;
  reelsTitle?: string;
  allReviewsUrl?: string;
  allReelsUrl?: string;
  className?: string;
};

const demoReviews: ShortReview[] = [
  {
    id: "hamza",
    name: "Hamza Raza",
    quote: "The team made my first tax return feel simple. They explained every step and kept me updated throughout the process.",
    rating: 5,
    dateLabel: "2 weeks ago",
  },
  {
    id: "amir",
    name: "Amir Hassan",
    quote: "Quick responses, clear guidance, and a smooth filing experience. It was a relief to have someone take care of the details.",
    rating: 5,
    dateLabel: "1 month ago",
  },
  {
    id: "sana",
    name: "Sana Ali",
    quote: "I had a few questions about my documents and received patient, helpful support. Everything was handled professionally.",
    rating: 5,
    dateLabel: "1 month ago",
  },
];

// Add social links with `url`, or direct video file links with `videoSrc`.
// You can also pass your own `reels` array wherever this component is used.
const defaultReels: ShortReel[] = [
  {
    id: "RLHNiQtV6dc",
    title: "YouTube Short 1",
    url: "https://youtube.com/shorts/RLHNiQtV6dc?si=At5ikDN2xq75u-42",
  },
  {
    id: "YicznB0KW7Q",
    title: "YouTube Short 2",
    url: "https://youtube.com/shorts/YicznB0KW7Q?si=Hontn2Q3rKXaa4zi",
  },
  {
    id: "LyGuOFN_Cy4",
    title: "YouTube Short 3",
    url: "https://youtube.com/shorts/LyGuOFN_Cy4?si=13GquznJIsIYo2my",
  },
];

const avatarColors = ["bg-[#81969f]", "bg-[#7d2b9f]", "bg-[#b14bbb]"];
const reelColors = [
  "from-[#073B72] to-[#244b6c]",
  "from-brand-orange-dark to-[#00AEEF]",
  "from-[#163c4a] to-[#33767d]",
];
const panelClassName =
  "min-w-0 rounded-[20px] border border-[#e6e6e6] bg-white p-5 shadow-[0_5px_28px_rgb(0_0_0/6%)] sm:p-[30px]";
const linkClassName =
  "inline-flex shrink-0 items-center gap-2 rounded text-sm font-bold text-brand-orange-dark transition-colors hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange sm:text-base";

function youtubeEmbedUrl(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;

    const host = parsed.hostname.replace(/^www\./, "");
    const parts = parsed.pathname.split("/").filter(Boolean);
    let videoId: string | null = null;

    if (host === "youtu.be") {
      videoId = parts[0];
    } else if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      videoId = ["shorts", "embed", "live"].includes(parts[0])
        ? parts[1]
        : parsed.searchParams.get("v");
    }

    if (!videoId || !/^[\w-]{11}$/.test(videoId)) return null;

    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      loop: "1",
      playlist: videoId,
      playsinline: "1",
      controls: "1",
      rel: "0",
    });

    return `https://www.youtube.com/embed/${videoId}?${params}`;
  } catch {
    return null;
  }
}

function ReelCard({ reel, index }: { reel: ShortReel; index: number }) {
  const embedUrl = youtubeEmbedUrl(reel.url);
  const cardClassName = "relative block aspect-[9/16] w-full overflow-hidden rounded-[22px] border border-[#e6e6e6] bg-navy shadow-[0_2px_7px_rgb(0_0_0/5%)]";

  if (reel.videoSrc) {
    return (
      <div className={cardClassName}>
        <video
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={reel.thumbnail}
          src={reel.videoSrc}
          aria-label={reel.title}
          className="absolute inset-0 size-full object-contain"
        >
          <a href={reel.videoSrc}>Watch {reel.title}</a>
        </video>
      </div>
    );
  }

  if (embedUrl) {
    return (
      <div className={cardClassName}>
        <iframe
          src={embedUrl}
          title={reel.title}
          width="270"
          height="480"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full border-0"
        />
      </div>
    );
  }

  const preview = (
      <div className={`absolute inset-0 isolate overflow-hidden bg-linear-to-br ${reelColors[index % reelColors.length]}`}>
        {reel.thumbnail ? (
          <Image
            src={reel.thumbnail}
            alt=""
            fill
            sizes="(max-width: 1400px) 240px, 16vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-10 -right-14 size-44 rounded-full border-[24px] border-white/10" />
            <div className="absolute -bottom-12 -left-10 size-40 rounded-full border-[24px] border-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-navy/65 via-transparent to-transparent" />
        <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span className={`grid size-14 place-items-center rounded-full border border-white/25 shadow-lg ${reel.url ? "bg-brand-orange text-white" : "bg-white/20 text-white/80"}`}>
            {reel.url ? <Play size={23} className="ml-1 fill-current" /> : <Clapperboard size={25} />}
          </span>
        </div>
      </div>
  );

  return reel.url ? (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${reel.title} (opens in a new tab)`}
      className={`${cardClassName} transition-[transform,box-shadow] duration-200 hover:shadow-[0_10px_24px_rgb(7_28_61/12%)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange motion-safe:hover:-translate-y-1 motion-reduce:transition-none`}
    >
      {preview}
    </a>
  ) : (
    <div role="img" aria-label={`${reel.title} — coming soon`} className={cardClassName}>{preview}</div>
  );
}

export default function ReviewsShort({
  reviews = demoReviews,
  reels = defaultReels,
  reviewsTitle = "Trusted by clients across Pakistan",
  reelsTitle = "Latest Reels & Resources",
  allReviewsUrl,
  allReelsUrl,
  className = "",
}: ReviewsShortProps) {
  return (
    <div className={`px-4 pb-14 sm:px-[30px] sm:pb-20 ${className}`}>
      <div className="mx-auto grid max-w-[1800px] gap-6 lg:grid-cols-[1.08fr_1fr] lg:gap-9">
        <section aria-label={reviewsTitle} className={panelClassName}>
          <header className="mb-7 flex flex-wrap items-start justify-between gap-4 sm:mb-9">
            <div className="max-w-[430px]">
              <h2 className="text-[26px] leading-[1.25] font-extrabold tracking-[-0.7px] text-[#1c1c1c] sm:text-[32px]">{reviewsTitle}</h2>
              {reviews === demoReviews && <p className="mt-2 text-xs font-medium text-[#85858a]">
               Sample client feedback</p>}
            </div>
            {allReviewsUrl && <a href={allReviewsUrl} className={linkClassName}>View all reviews <ArrowRight size={18} aria-hidden="true" /></a>}
          </header>
          <MobileCarousel label="Client reviews" labels={reviews.map((review) => `${review.name}'s review`)} initialIndex={1}>
            {reviews.map((review, index) => (
              <article key={review.id} className="flex min-h-[270px] min-w-0 flex-col rounded-[19px] border border-[#e6e6e6] bg-white p-5 shadow-[0_2px_7px_rgb(0_0_0/5%)] sm:min-h-[300px] lg:px-4 2xl:p-6">
                <div className="mb-4 flex gap-1" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, starIndex) => <Star key={starIndex} size={20} className={starIndex < review.rating ? "fill-[#00AEEF] text-[#00AEEF]" : "fill-[#e8e8eb] text-[#e8e8eb]"} aria-hidden="true" />)}
                </div>
                <blockquote className="mb-6 flex-1 text-base leading-[1.55] text-[#616165] italic 2xl:text-lg">&ldquo;{review.quote}&rdquo;</blockquote>
                <div className="flex items-center gap-3 border-t border-[#efeff1] pt-4">
                  <span aria-hidden="true" className={`grid size-11 shrink-0 place-items-center rounded-full text-[24px] text-white ${avatarColors[index % avatarColors.length]}`}>{review.name.charAt(0)}</span>
                  <div className="min-w-0">
                    <p className="text-sm leading-snug font-bold text-[#202124] 2xl:text-base">{review.name}</p>
                    <p className="mt-1 text-xs text-[#85858a] 2xl:text-sm">{review.dateLabel}</p>
                  </div>
                </div>
              </article>
            ))}
          </MobileCarousel>
        </section>

        <section aria-label={reelsTitle} className={panelClassName}>
          <header className="mb-7 flex flex-wrap items-start justify-between gap-4 sm:mb-9">
            <h2 className="text-[26px] leading-[1.25] font-extrabold tracking-[-0.7px] text-[#1c1c1c] sm:text-[32px]">{reelsTitle}</h2>
            {allReelsUrl && <a href={allReelsUrl} className={linkClassName}>View all <ArrowRight size={18} aria-hidden="true" /></a>}
          </header>
          <ul className="grid auto-cols-[minmax(200px,1fr)] grid-flow-col snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 2xl:gap-6">
            {reels.map((reel, index) => <li key={reel.id} className="min-w-0 snap-start"><ReelCard reel={reel} index={index} /></li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}
