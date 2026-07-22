export type CaseStudyMetric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  hero?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  metrics?: CaseStudyMetric[];
  stack?: string[];
  gallery?: string[];
  testimonial?: { quote: string; author: string; role: string };
  status?: "published" | "coming-soon";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "coming-soon",
    title: "Case studies land here soon",
    client: "Athera",
    category: "Placeholder",
    summary:
      "We're preparing long-form write-ups of recent engagements — the brief, the calls we made, the trade-offs, and the outcome. Check back shortly.",
    status: "coming-soon",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}