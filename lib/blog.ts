export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  category: "Getting started" | "Organisation" | "Business essentials";
  excerpt: string;
  coverTitle: string;
  artwork: "conversation" | "documents" | "routine" | "business";
  intro: string;
  sections: { title: string; paragraphs: string[]; checklist?: string[] }[];
};

// Editorial content lives here. Add a unique slug to publish another article.
export const blogPosts: BlogPost[] = [
  {
    slug: "prepare-for-your-first-consultation",
    title: "A clearer start: preparing for your first consultation",
    seoTitle: "How to Prepare for Your First Consultation",
    category: "Getting started",
    excerpt: "A little preparation can turn an uncertain first conversation into a useful plan. Here is a practical place to begin.",
    coverTitle: "Clarity starts with a conversation.",
    artwork: "conversation",
    intro: "You do not need to have every answer before speaking with a professional. A first consultation is an opportunity to explain your situation, ask questions, and understand what happens next. A few simple preparations can help you make the most of that time.",
    sections: [
      { title: "Start with what you want to achieve", paragraphs: ["Write down the main reason you are getting in touch. Perhaps you want help organising your records, understanding a service, or preparing a business enquiry. A short explanation is more useful than trying to describe everything at once.", "If there is a date or an unresolved question that matters to you, mention it at the beginning. This helps keep the conversation focused on your priorities."] },
      { title: "Prepare an overview, not a perfect file", paragraphs: ["Make a simple list of the documents you already have and anything you are still looking for. You can ask which items are relevant before sharing sensitive information. Keep your original files in a safe place and work from copies."], checklist: ["A brief description of your situation or business", "Your main questions and preferred outcome", "A list of the records you have available", "Any relevant correspondence you want to discuss"] },
      { title: "Leave with clear next steps", paragraphs: ["Before the conversation ends, confirm the scope of the service, what you need to provide, and how you will stay in touch. Ask for an explanation of the fee and any separate charges, and clarify how an estimated timeline may depend on documents or external processes.", "Keep a short note of what was agreed. A clear next step is a useful outcome, even when some questions still need further review."] },
    ],
  },
  {
    slug: "organise-your-business-documents",
    title: "Give your business documents a home",
    seoTitle: "How to Organise Your Business Documents",
    category: "Organisation",
    excerpt: "A consistent folder structure and a few naming habits can make important records easier to find when you need them.",
    coverTitle: "Less searching. More clarity.",
    artwork: "documents",
    intro: "Documents tend to arrive in different places: an email attachment, a phone download, a scanned page, or a message. Bringing them into an organised system can make everyday administration less frustrating.",
    sections: [
      { title: "Choose a structure you can maintain", paragraphs: ["Start with a small number of folders that reflect how you work. You might organise records by business, year, and document type. Use the same structure each time so that someone returning to the files later can follow it.", "Separate working drafts from final versions. Keep personal records apart from business records where possible, and limit access to the people who need it."] },
      { title: "Make filenames do some of the work", paragraphs: ["A useful filename says what the document is without requiring you to open it. A date, a short description, and a reference can be enough. For example, a file named 2026-09-office-invoice-014.pdf is easier to identify than scan-final-new.pdf."], checklist: ["Use a consistent date format", "Add a short, recognisable description", "Keep reference numbers where available", "Mark drafts and final versions clearly"] },
      { title: "Build in a short review", paragraphs: ["Set aside a regular moment to move new files into the right place and identify missing information. Check that scanned documents are readable and complete before filing them away.", "Maintain a secure backup and ask your adviser which records you need to keep for your circumstances. An organised folder helps you retrieve a document; it does not replace checking that the document itself is appropriate."] },
    ],
  },
  {
    slug: "monthly-recordkeeping-routine",
    title: "A small monthly routine for better recordkeeping",
    seoTitle: "A Simple Monthly Business Recordkeeping Routine",
    category: "Organisation",
    excerpt: "Create a repeatable admin habit that helps you collect records, spot gaps, and keep questions in one place.",
    coverTitle: "Small habits. A clearer picture.",
    artwork: "routine",
    intro: "A growing pile of paperwork can be difficult to tackle all at once. A short, regular review gives you a chance to organise new records while the details are still familiar.",
    sections: [
      { title: "Collect before you sort", paragraphs: ["Begin by bringing the month's new documents into one working folder. Include the records relevant to your business and keep a separate list of anything you are waiting to receive. Avoid changing or overwriting original documents.", "Choose a regular time for this task. A routine is easier to maintain when it is small enough to fit into your existing schedule."] },
      { title: "Keep an open-questions list", paragraphs: ["If a record is unclear, note the question rather than making an assumption. Add the document name and any context that will help you or your adviser review it later."], checklist: ["Which documents are still missing?", "Are all pages and attachments included?", "Can each document be clearly identified?", "What needs clarification before the next review?"] },
      { title: "Finish with a useful handover", paragraphs: ["Store the organised files in their usual folders, update your missing-items list, and record what needs follow-up. If someone else handles your accounts, agree on a consistent way to share the information securely.", "The aim is not to solve every accounting question in a single session. It is to keep the information easier to find and the next conversation easier to have."] },
    ],
  },
  {
    slug: "write-a-clear-business-brief",
    title: "How to write a useful brief for your business adviser",
    seoTitle: "How to Write a Clear Business Adviser Brief",
    category: "Business essentials",
    excerpt: "Explain your business, your priorities, and the support you need in a concise brief that starts a more productive conversation.",
    coverTitle: "Your business. A clear brief.",
    artwork: "business",
    intro: "Whether you are exploring a new service or reviewing how your business is organised, a brief helps an adviser understand the context. It can be a few paragraphs rather than a formal presentation.",
    sections: [
      { title: "Describe the business in plain language", paragraphs: ["Explain what the business does, who it serves, and where you are in its journey. Mention whether you are planning, already operating, or making a change. Focus on the details that relate to the help you are seeking.", "You do not need to choose a legal or technical label yourself. Describe your situation and ask the adviser to help identify the questions that need further consideration."] },
      { title: "Separate priorities from background", paragraphs: ["Put your most important questions first. Background information is helpful, but it should support the conversation rather than make the main issue difficult to find."], checklist: ["What do you want help with?", "What have you already done?", "Which decisions are still open?", "Are there practical timing or budget constraints?"] },
      { title: "Ask for a defined scope", paragraphs: ["Use the brief to discuss what the adviser will do, what is outside the service, and what you will need to provide. Ask how the work will be communicated and what completion will look like.", "Keep the agreed scope alongside your brief. When your needs change, update the conversation so that expectations stay clear on both sides."] },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function readingMinutes(post: BlogPost) {
  const text = [post.intro, ...post.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.checklist ?? [])])].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}
