# SEO, responsive layouts, and motion

Page metadata is maintained in `lib/seo.ts`. Blog articles supply their own titles, summaries, and topic keywords. All public pages have canonical URLs, Open Graph and Twitter cards, authorship, and index directives. Search result URLs use `noindex`; service filters consolidate to the main catalog canonical. Preview deployments are excluded from indexing.

| Page | Primary search topic |
| --- | --- |
| Home | Tax filing and NTN registration in Pakistan |
| Business Services | Tax, company registration, and accounting services |
| Salary Calculator | Salary tax calculator Pakistan, tax years 2010–2026 |
| Tax Tools | Pakistan tax tools |
| FAQs | Salary calculator and filing questions |
| Contact | Contact asconsultations tax consultants |
| Our Team | Tax, accounting, and audit professionals |
| Blog and articles | The actual business and recordkeeping topics in each article |

Organization, website, page, breadcrumb, article, FAQ, and calculator data use JSON-LD where applicable. There are no fabricated review ratings or publication dates in structured data. Meta keywords are included for completeness; [Google does not use that tag for ranking](https://developers.google.com/search/docs/crawling-indexing/special-tags). Useful page content and clear titles remain the priority.

## Mobile and animations

- The native modal navigation drawer slides in from the right using Framer Motion. It locks background scrolling, contains keyboard focus, closes on Escape/backdrop/link selection, and restores focus when closed. It also closes when resizing to desktop.
- Framer Motion handles page headings, section/card entrances, menu accordions, contact-button feedback, and the chatbot panel. Content is rendered visibly on the server; effects do not hide content behind a JavaScript requirement.
- Motion respects `prefers-reduced-motion`. Viewport zoom stays enabled. Mobile form fields use 16px text to avoid unwanted input zoom.
- The branded preloader appears on the initial document load. It dismisses when ready, has a manual continue action, a 1.2-second post-hydration timeout, a CSS fail-safe, and a no-JavaScript fallback. It does not replay on every route change. Next.js loading states cover navigation separately.
- Mobile layouts use flexible grids, wrapping headings, bounded dialogs, safe-area spacing, and the existing swipe carousels. Fixed contact actions have reserved space below the content.

## Verification

```sh
npm run build
npm run lint
node --test tests/site-seo.test.mjs
npm run test:tax
```

The SEO test reads production HTML and checks unique metadata, social tags, canonical URLs, JSON-LD, heading/landmark structure, mobile viewport settings, image alt attributes, preloader fallback, and sitemap coverage. It does not replace a visual device test.

Before a public launch, verify layouts at 320, 375, 390, 768, 1024, and 1440px, including landscape, the navigation drawer, form validation, swipes, reduced motion, and keyboard focus. Browser automation was unavailable in the editing session, so visual and touch-device behavior was not verified.

Search Console ownership requires the site's actual verification token. Set `GOOGLE_SITE_VERIFICATION` in deployment environment variables to emit it, then submit `https://asconsultations.com.pk/sitemap.xml` in the verified account. No Search Console ownership or submission is claimed by this implementation.

The repository still includes explicitly marked sample testimonials and demo team profiles; replace these with approved real content before publishing them as client or staff information.
