export const faq = [
  {
    question: "Which stacks do you work with?",
    answer:
      "React and Next.js, with Tailwind and shadcn/ui. Lovable, Bolt and v0 exports are welcome when the code is available.",
  },
  {
    question: "How do you get repo access? What about confidentiality?",
    answer:
      "For a sprint, invite me to the specific repository with the least access needed. An audit can start with a live app and screenshots. I can sign an NDA before access. Private code, screens and business information stay private, and you can revoke access when we're done.",
  },
  {
    question: "What exactly is the redesigned screen in the audit?",
    answer:
      "One annotated high-fidelity mockup or an isolated coded preview of a screen in the agreed flow. It explains the proposed direction. It is not a merged production change; implementation in your app is the sprint.",
  },
  {
    question: "What's the turnaround?",
    answer:
      "The audit arrives within 3 business days after complete intake. Sprint timing is agreed after I check your codebase and confirm the scope.",
  },
  {
    question: "How do revisions work?",
    answer:
      "We agree the scope and review expectations before work starts. Audit questions are welcome. Sprint revisions stay within the agreed flow; new screens or new direction need a separate scope. I don't offer unlimited revisions.",
  },
  {
    question: "Do you write the code or just design?",
    answer:
      "Both. For a sprint, I change your actual components, styles and interaction states and deliver reviewable pull requests. The audit gives you recommendations and one screen preview. No Figma handoff.",
  },
  {
    question: "What if the audit isn't useful?",
    answer:
      "Tell me by email and I'll refund the full EUR 300 audit fee. If you upgrade to a sprint, the audit fee is credited toward the sprint.",
  },
  {
    question: "What about VAT and invoicing?",
    answer:
      "I invoice from a Romanian company. VAT treatment depends on your location and business status; EU B2B reverse charge may apply where eligible. The quote and invoice confirm the tax treatment. Owner review pending for this wording and company details.",
  },
  {
    question: "What if my app isn't React?",
    answer:
      "Email me before buying. An audit may still be useful, but I need to check whether I can give you a useful screen preview. Implementation sprints focus on React codebases.",
  },
];
export const included = [
  "UI layout and hierarchy",
  "Typography, spacing, color and tokens",
  "Components and interaction states, including empty, loading and error",
  "Responsive polish and accessibility fixes",
  "Microcopy",
];
export const excluded = [
  "Backend features and database migrations",
  "Major refactors unrelated to UI",
  "Logos and brand identity",
  "Figma files",
  "A whole new product",
  "Guaranteed business outcomes or unlimited revisions",
];
export const testimonials: { quote: string; name: string; role: string }[] = [];
export const testimonialsEnabled = false;
