import catalog from "./business-services-data.json";

export const serviceCategories = [
  { id: "income-tax", title: "Income Tax Return", description: "Personal and business tax filing, NTN registration, and withholding statements." },
  { id: "sales-tax", title: "Sales Tax Registration", description: "GST and provincial registrations, with ongoing sales tax return filing." },
  { id: "company-registration", title: "Company Registration", description: "Company formation, partnerships, nonprofit registrations, and compliance." },
  { id: "intellectual-property", title: "Intellectual Property", description: "Protect your work with trademark, copyright, and patent registration." },
  { id: "other-registrations", title: "Other Registrations", description: "PSEB, freelancer, call centre, chamber of commerce, and P@SHA services." },
] as const;

export type ServiceCategory = (typeof serviceCategories)[number]["id"];
export type BusinessService = {
  id: string;
  title: string;
  subtitle: string;
  category: ServiceCategory;
  price: string;
  notes: string[];
  timeline: string | null;
  requirements: string[];
};

export const businessServices = catalog as BusinessService[];

export function filterServices(category: string, query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return businessServices.filter((service) => {
    const text = `${service.title} ${service.subtitle} ${service.requirements.join(" ")}`.toLowerCase();
    return (category === "all" || service.category === category) && words.every((word) => text.includes(word));
  });
}

export function serviceCategoryUrl(category: string) {
  return `/business-services?category=${encodeURIComponent(category)}`;
}

// Optional deployment overrides for the business contact details.
export const serviceContact = {
  email: "info@asconsultation.com",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923227168831").replace(/\D/g, ""),
};

export function whatsappEnquiryUrl(service: string) {
  return serviceContact.whatsapp
    ? `https://wa.me/${serviceContact.whatsapp}?text=${encodeURIComponent(`Hello asconsultations, I would like help with ${service}. Please share the next steps.`)}`
    : null;
}
