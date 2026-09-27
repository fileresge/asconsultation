import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

// Run after `npm run build`: validate the HTML actually sent to crawlers,
// including pages composed from server and client components.
const root = resolve(".next/server/app");
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]);
}
function decode(value) {
  return value.replace(/&#x([a-f\d]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
}
const pages = files(root).filter((file) => file.endsWith(".html") && !relative(root, file).startsWith("_"));
const titles = new Set();
const descriptions = new Set();
const productionOrigin = "https://asconsultations.com.pk";

assert.ok(pages.length >= 11, "Build all public static pages before running the SEO checks.");

for (const file of pages) {
  const name = relative(root, file).replaceAll("\\", "/").replace(/\.html$/, "");
  const path = name === "index" ? "/" : `/${name}`;
  const html = readFileSync(file, "utf8");
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const meta = (key) => metas.find((item) => item.name === key || item.property === key)?.content;
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const canonical = links.find((item) => item.rel === "canonical")?.href;
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const description = meta("description");
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, json]) => {
    const value = JSON.parse(json);
    return Array.isArray(value) ? value : [value];
  });

  test(`${path}: unique, complete metadata and crawlable content`, () => {
    assert.ok(title.length > 15 && title.length <= 85, `Meaningful title: ${title}`);
    assert.ok(!titles.has(title), `Duplicate title: ${title}`);
    titles.add(title);
    assert.ok(description?.length >= 60 && description.length <= 220, "Useful page description");
    assert.ok(!descriptions.has(description), "Page descriptions should be distinct");
    descriptions.add(description);
    assert.equal(new URL(canonical).href, `${productionOrigin}${path}`);
    assert.equal(meta("og:title"), title);
    assert.equal(meta("twitter:title"), title);
    assert.equal(meta("og:description"), description);
    assert.equal(new URL(meta("og:url")).href, new URL(canonical).href);
    assert.equal(meta("twitter:card"), "summary_large_image");
    assert.ok(meta("og:image")?.startsWith(`${productionOrigin}/og?`));
    assert.equal(meta("og:site_name"), "asconsultations");
    assert.equal(meta("og:locale"), "en_PK");
    assert.equal(meta("twitter:description"), description);
    assert.ok(meta("keywords")?.includes(","));
    assert.ok(meta("viewport")?.includes("width=device-width"));
    assert.ok(!/user-scalable=no|maximum-scale=1(?:,|$)/.test(meta("viewport")), "Allow mobile zoom");
    assert.equal(meta("theme-color"), "#073B72");
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, "One page-level heading");
    assert.equal((html.match(/<main\b/g) ?? []).length, 1, "One main landmark");
    const organization = schemas.flatMap((item) => item["@graph"] ?? []).find((node) => node["@type"] === "Organization");
    assert.equal(organization?.url, `${productionOrigin}/`);
    assert.equal(organization?.logo?.url, `${productionOrigin}/header-logo.png`);
    if (path !== "/") assert.ok(schemas.some((item) => item["@type"] === "BreadcrumbList"), "Breadcrumb structured data");
    assert.ok(html.includes('href="#main-content"'), "Keyboard skip link");
    assert.ok(html.includes("#site-preloader { display: none !important; }"), "Preloader does not block without JavaScript");
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) assert.ok("alt" in attributes(tag), "Images have alt text or an explicit decorative alt");
  });

  if (path === "/tax-tools/faqs") test("FAQ schema matches the visible questions", () => {
    const faq = schemas.find((item) => item["@type"] === "FAQPage");
    assert.equal(faq.mainEntity.length, (html.match(/<details\b/g) ?? []).length);
    for (const question of faq.mainEntity) {
      assert.ok(decode(html).includes(question.name));
      assert.ok(decode(html).includes(question.acceptedAnswer.text));
    }
  });
}

test("sitemap lists every public static page", () => {
  const sitemap = readFileSync(join(root, "sitemap.xml.body"), "utf8");
  for (const file of pages) {
    const name = relative(root, file).replaceAll("\\", "/").replace(/\.html$/, "");
    const path = name === "index" ? "/" : `/${name}`;
    assert.ok(sitemap.includes(`<loc>${productionOrigin}${path}</loc>`), path);
  }
});
