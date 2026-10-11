import type { ComparisonImage } from "@/components/service/BeforeAfter";
import { sampleAnnotations } from "./annotations/styleguide";
export type CaseStudy = {
  slug: string;
  title: string;
  client: "own product" | "concept";
  ownership: "My own product" | "Unsolicited concept";
  draft: boolean;
  stack: string[];
  date: string;
  summary: string;
  before: ComparisonImage;
  after: ComparisonImage;
  annotationsFile: string;
  decisions: { decision: string; why: string }[];
  codeChanges: string[];
  limitations: string[];
  problem: string;
  changes: string;
  implementation: string;
  result: string;
};
export const studies: CaseStudy[] = [
  {
    slug: "pricele",
    title: "Pricele: making the price the task",
    client: "own product",
    ownership: "My own product",
    draft: false,
    stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Neon"],
    date: "2026-10-11",
    summary:
      "An example of the case-study format using my daily price-guessing game. One current screen is captured locally. A historical before and a redesigned after are still pending.",
    before: {
      src: "/images/work/pricele-before.svg",
      alt: "PLACEHOLDER. A historical before screenshot of Pricele has not been supplied.",
    },
    after: {
      src: "/images/work/pricele-current.png",
      alt: "Pricele's current game screen, captured locally at 800 by 600. This is a reference screen, not a verified redesign after.",
    },
    annotationsFile: "data/annotations/pricele.ts",
    decisions: [
      {
        decision: "Make guessing the price the primary task.",
        why: "The existing product asks for a number. The screen should help someone start that task before introducing related games.",
      },
      {
        decision: "Keep country, item and currency context together.",
        why: "A price has little meaning without what is being sold and where. This is a proposed review criterion, not an observed usability result.",
      },
      {
        decision: "Keep feedback understandable without color.",
        why: "Higher or lower and distance from the answer should be communicated in words as well as visual treatment. This needs an interaction audit.",
      },
    ],
    codeChanges: [
      "Inspected the existing Next.js page and manifest read-only.",
      "Captured the current local production build at 800 × 600.",
      "Added this typed case-study entry and separate annotation data to the portfolio. No Pricele source was changed.",
    ],
    limitations: [
      "No historical before image is available.",
      "No redesign PR or measured usability result is claimed.",
      "The capture reflects the existing local production build, which may differ from the current Pricele source or deployed site.",
    ],
    problem:
      "Pricele is a daily game about what ordinary things cost in different countries. The design task is to make the price guess clear while keeping useful context and feedback close. This example records a review direction; it does not claim a completed product redesign.",
    changes:
      "The example separates the primary task, contextual information and feedback into three review decisions. These are proposed criteria for a future screen comparison. The current interface is shown as a reference, with an explicit placeholder for the missing historical before.",
    implementation:
      "The read-only source inspection found a statically generated Next.js homepage that renders the Game component and supporting explanations. The portfolio implementation uses a typed content collection, matched media dimensions and an editable annotation layer. No implementation change to Pricele was made in this refactor.",
    result:
      "The existing local production build returned HTTP 200 and a current screen was captured. No conversion, retention or usability measurements were taken. Real before/after assets and implementation highlights must be supplied before this becomes a completed redesign case study.",
  },
  ...["onboarding-concept", "dashboard-concept"].map((slug) => ({
    slug,
    title:
      slug === "onboarding-concept"
        ? "DRAFT: a clearer first step"
        : "DRAFT: a quieter dashboard",
    client: "concept" as const,
    ownership: "Unsolicited concept" as const,
    draft: true,
    stack: ["React", "Tailwind"],
    date: "2026-10-11",
    summary:
      "PLACEHOLDER concept. Real assets and implementation evidence pending.",
    before: {
      src: "/images/styleguide/before.svg",
      alt: "Placeholder before interface specimen.",
    },
    after: {
      src: "/images/styleguide/after.svg",
      alt: "Placeholder after interface specimen.",
      annotations: sampleAnnotations,
    },
    annotationsFile: "data/annotations/styleguide.ts",
    decisions: [
      {
        decision: "Prioritize the main task.",
        why: "A clear first action reduces competing hierarchy. Proposed direction only.",
      },
    ],
    codeChanges: ["No client implementation or PR exists."],
    limitations: ["Draft excluded from production routes and sitemap."],
    problem: "Placeholder problem statement. No client project is represented.",
    changes: "Proposed hierarchy changes shown by illustrative specimens only.",
    implementation: "No implementation claims.",
    result: "No measured or observed product result.",
  })),
];
export function visibleStudies() {
  return studies.filter(
    (study) => !study.draft || process.env.NODE_ENV !== "production",
  );
}
export function getStudy(slug: string) {
  return visibleStudies().find((study) => study.slug === slug);
}
