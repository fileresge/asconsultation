import { Calculator, FileQuestionMark, MailOpen } from "lucide-react";
import { taxToolLinks } from "../lib/tax-tools";

export default function TaxToolIcon({ icon, className = "size-7" }: { icon: (typeof taxToolLinks)[number]["icon"]; className?: string }) {
  const Icon = { calculator: Calculator, faqs: FileQuestionMark, contact: MailOpen }[icon];
  return <Icon className={className} strokeWidth={1.5} aria-hidden="true" />;
}
