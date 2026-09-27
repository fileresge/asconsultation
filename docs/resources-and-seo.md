# Resources and SEO

Resources links to `/blog` and `/our-team` on desktop and mobile. Dropdown links
are included in the initial HTML so visitors using keyboards and crawlers can
discover the pages. There is no Videos entry or new video page.

## Content

- `lib/blog.ts`: four original editorial guides, their search categories,
  article sections, slugs, and SEO titles. Adding an entry creates a matching
  article route at the next build and adds it to the sitemap. Published dates
  are deliberately omitted until actual editorial publication dates exist.
- `lib/team.ts`: partner descriptions based on the supplied `partner` file,
  labelled demo team members, and gallery image records. Add gallery files
  under `public/gallery` and list their paths, intrinsic sizes, captions, and
  alt text here. The gallery supports click, keyboard arrows, and Escape.
- Team demo profiles are not included as real people in structured data.

## SEO

The canonical origin is `https://asconsultations.com.pk`, configured in `lib/seo.ts`.
Each public page and article has its own title and description, canonical URL,
Open Graph tags, Twitter card, and a 1200-by-630 branded preview served by `/og`.
The root metadata also defines the site name and metadata base URL.

`/sitemap.xml` includes the homepage, services page, blog, team page, and every
article. Query-string search/filter URLs canonicalise to `/business-services`
and are not duplicated in the sitemap. `/robots.txt` allows crawling and links
to the production sitemap. Vercel preview builds have `noindex` page metadata.

JSON-LD describes the organization, website, breadcrumbs, real partners,
articles, and visible services. It contains no invented ratings, publication
dates, certifications, or street address. The services route renders its
query-filtered catalog in the initial server HTML.

After deployment, submit `https://asconsultations.com.pk/sitemap.xml` in your verified
Google Search Console property and check the live URLs. Search engines decide
when and how to index pages; metadata does not guarantee a ranking position.

## Callback popup

Request a call opens a modal requiring username and contact number. Email and
message are optional. Native validation checks required fields and email
format. Submission opens a prepared WhatsApp message to `923362137034`; the
visitor sends it in WhatsApp. No callback data is stored on the website.
