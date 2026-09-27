import TaxCalculator from "../../tax-calculator";
import { absoluteUrl, breadcrumbSchema, createPageMetadata, pageSeo, webPageSchema } from "../../../lib/seo";
import StructuredData from "../../../components/structured-data";

export const metadata = createPageMetadata({ ...pageSeo.calculator, path: "/tax-tools/salary-calculator" });

export default function SalaryCalculatorPage() {
  return <><StructuredData data={[{ ...webPageSchema({ ...pageSeo.calculator, path: "/tax-tools/salary-calculator" }), mainEntity: { "@type": "WebApplication", name: "asconsultations Salary Tax Calculator", url: absoluteUrl("/tax-tools/salary-calculator"), applicationCategory: "FinanceApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript", offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" } } }, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tax Tools", path: "/tax-tools" }, { name: "Salary Calculator", path: "/tax-tools/salary-calculator" }])]} /><header className="mx-auto mb-8 max-w-[1544px] px-5 sm:px-[clamp(32px,3.7vw,52px)]"><h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Salary Tax Calculator Pakistan</h1><p className="mt-4 text-lg leading-8 text-[#667085]">Understand your salary. Plan your next step.</p></header><TaxCalculator /></>;
}
