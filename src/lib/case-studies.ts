export type CaseStudyMetric = { value: string; label: string };

export type CaseStudySection = { heading: string; body: string };

export type CaseStudyMeta = {
  role?: string;
  platform?: string;
  status?: string;
  stack?: string[];
};

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
  meta?: CaseStudyMeta;
  sections?: CaseStudySection[];
  pullQuote?: string;
};

import trenfotballCover from "@/assets/case-studies/trenfotball-cover.png.asset.json";

export const caseStudies: CaseStudy[] = [
  {
    slug: "trenfotball",
    title: "TrenFotball",
    client: "TrenFotball",
    category: "Client work · Sports platform",
    summary:
      "A video-driven training platform built to an exact client vision — precision over interpretation.",
    hero: trenfotballCover.url,
    status: "published",
    meta: {
      role: "Design & development",
      platform: "Web, responsive",
      status: "In development",
      stack: ["Next.js", "TypeScript", "Vimeo API", "Tailwind"],
    },
    sections: [
      {
        heading: "The Brief",
        body: "The client came in with a fully-formed vision — not a rough idea, but exact colors, layout, copy, and behavior already in his head. The brief wasn't \"make something good,\" it was \"build precisely this.\" That's a different job than most projects: the measure of success wasn't creative interpretation, it was fidelity.",
      },
      {
        heading: "The Challenge",
        body: "Translating a client's mental image into pixels with zero drift is harder than starting from a blank canvas. Every spacing choice, hover state, and micro-interaction had to match a picture we couldn't see directly. On top of that, the platform had to actually work under load — a video-heavy training library serving coaches on the sideline, not just a marketing site.",
      },
      {
        heading: "The Approach",
        body: "We treated the client's vision as spec, not suggestion. Tight feedback loops, side-by-side comparisons, and a component system built to hit his exact tokens — colors, radii, type scale — the first time. Where his instinct diverged from a technical constraint (video pipeline, mobile performance), we surfaced the trade-off rather than silently overriding it.",
      },
      {
        heading: "The Product",
        body: "The result is a focused platform for structuring football drills by age and skill level. A homepage that states the value in one glance, an exercise library organized for coaches under time pressure, and a component system consistent enough that new drill categories slot in without redesign.",
      },
      {
        heading: "The Outcome",
        body: "The client got exactly what he asked for — every inch of it. No creative liberties, no \"trust me\" substitutions. That's the service: when a client already knows what they want, the job is precision, not opinion.",
      },
    ],
    pullQuote:
      "When a client already knows what they want, the job is precision, not opinion.",
  },
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