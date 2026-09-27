import { BriefcaseBusiness, Building2, Copyright, FileText, ReceiptText } from "lucide-react";
import type { ServiceCategory } from "../lib/business-services";

const icons = {
  "income-tax": FileText,
  "sales-tax": ReceiptText,
  "company-registration": Building2,
  "intellectual-property": Copyright,
  "other-registrations": BriefcaseBusiness,
};

export default function ServiceIcon({ category, className = "size-6" }: { category: ServiceCategory; className?: string }) {
  const Icon = icons[category];
  return <Icon className={className} strokeWidth={1.7} aria-hidden="true" />;
}
