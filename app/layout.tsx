import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import FloatingContactActions from "../components/floating-contact-actions";
import SiteExperience from "../components/site-experience";
import StructuredData from "../components/structured-data";
import { serviceContact, whatsappEnquiryUrl } from "../lib/business-services";
import { socialLinks } from "../lib/social-links";
import { officeLocation } from "../lib/office-location";
import { absoluteUrl, createPageMetadata, pageSeo, siteName, siteUrl } from "../lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({ ...pageSeo.home, path: "/" }),
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  formatDetection: { telephone: false },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#073B72" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
    >
      <body className="flex min-h-full flex-col bg-white pb-[calc(80px+env(safe-area-inset-bottom))] font-sans leading-[normal] text-ink md:pb-0">
        <noscript><style>{"#site-preloader { display: none !important; }"}</style></noscript>
        <a href="#main-content" className="fixed top-3 left-3 z-[110] -translate-y-24 rounded-xl bg-navy px-5 py-3 font-bold text-white focus:translate-y-0">Skip to content</a>
        <StructuredData data={{ "@context": "https://schema.org", "@graph": [
          { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: siteName, url: absoluteUrl("/"), description: pageSeo.home.description, logo: { "@type": "ImageObject", url: absoluteUrl("/header-logo.png"), width: 1000, height: 400 }, image: absoluteUrl("/header-logo.png"), telephone: "+923227168831", email: serviceContact.email, address: officeLocation.postalAddress, sameAs: socialLinks.map((social) => social.href), areaServed: { "@type": "Country", name: "Pakistan" }, knowsAbout: ["Income tax filing", "NTN registration", "Sales tax", "Company registration", "Accounting"], contactPoint: { "@type": "ContactPoint", telephone: "+923227168831", email: serviceContact.email, contactType: "customer service", areaServed: "PK", availableLanguage: ["English", "Urdu"] } },
          { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: siteName, url: absoluteUrl("/"), description: pageSeo.home.description, inLanguage: "en-PK", publisher: { "@id": absoluteUrl("/#organization") } },
        ] }} />
        <SiteExperience>
        <SiteHeader /><div id="main-content" tabIndex={-1} className="min-w-0 flex-1 outline-none">{children}</div><SiteFooter />
        <FloatingContactActions whatsappUrl={whatsappEnquiryUrl("tax and business services")} email={serviceContact.email} />
        </SiteExperience>
      </body>
    </html>
  );
}
