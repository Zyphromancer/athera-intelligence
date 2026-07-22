import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Link } from "@tanstack/react-router";
import bankBefore from "@/assets/before-after/bank-before.jpg";
import bankAfter from "@/assets/before-after/bank-after.jpg";
import dashBefore from "@/assets/before-after/dashboard-before.jpg";
import dashAfter from "@/assets/before-after/dashboard-after.jpg";
import mlBefore from "@/assets/before-after/ml-before.jpg";
import mlAfter from "@/assets/before-after/ml-after.jpg";
import aiChatBefore from "@/assets/before-after/ai-chat-before.jpg";
import aiChatAfter from "@/assets/before-after/ai-chat-after.jpg";
import healthBefore from "@/assets/before-after/health-before.jpg";
import healthAfter from "@/assets/before-after/health-after.jpg";
import ecomBefore from "@/assets/before-after/ecom-before.jpg";
import ecomAfter from "@/assets/before-after/ecom-after.jpg";
import fitnessBefore from "@/assets/before-after/fitness-before.jpg";
import fitnessAfter from "@/assets/before-after/fitness-after.jpg";
import annotationBefore from "@/assets/before-after/annotation-before.jpg";
import annotationAfter from "@/assets/before-after/annotation-after.jpg";
import aiopsBefore from "@/assets/before-after/aiops-before.jpg";
import aiopsAfter from "@/assets/before-after/aiops-after.jpg";

type Pair = {
  title: string;
  caption: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  category: string;
};

const pairs: Pair[] = [
  {
    title: "Financial services — homepage concept",
    caption: "A dated 2012 template reimagined as a refined editorial identity.",
    beforeSrc: bankBefore, afterSrc: bankAfter,
    beforeAlt: "Dated financial services website",
    afterAlt: "Refined editorial financial services website",
    category: "Web · Financial services",
  },
  {
    title: "SaaS — analytics dashboard",
    caption: "Cluttered light-mode admin panel rebuilt into a focused dark dashboard.",
    beforeSrc: dashBefore, afterSrc: dashAfter,
    beforeAlt: "Legacy admin panel dashboard",
    afterAlt: "Athera-style dark analytics dashboard",
    category: "SaaS · Analytics",
  },
  {
    title: "ML engineering — from notebook to platform",
    caption: "A tangle of Jupyter cells and matplotlib plots replaced with a monitored model-performance surface.",
    beforeSrc: mlBefore, afterSrc: mlAfter,
    beforeAlt: "Cluttered Jupyter notebook with matplotlib charts",
    afterAlt: "Model performance dashboard with latency and drift metrics",
    category: "ML engineering",
  },
  {
    title: "AI chat — bot to enterprise assistant",
    caption: "A generic 2020 chat widget rebuilt as a citation-aware assistant with real thread history.",
    beforeSrc: aiChatBefore, afterSrc: aiChatAfter,
    beforeAlt: "Dated 2020-era support chatbot interface",
    afterAlt: "Refined AI assistant interface with citations and threads",
    category: "AI · Chat & assistants",
  },
  {
    title: "Healthcare — patient portal",
    caption: "A dense hospital-table portal reframed around a single patient's morning.",
    beforeSrc: healthBefore, afterSrc: healthAfter,
    beforeAlt: "Cluttered 2010 hospital patient portal",
    afterAlt: "Modern calm patient portal with vitals",
    category: "Healthcare · Web app",
  },
  {
    title: "E-commerce — product page",
    caption: "A discount-heavy 2015 layout replaced with an editorial product page.",
    beforeSrc: ecomBefore, afterSrc: ecomAfter,
    beforeAlt: "Cluttered discount e-commerce product page",
    afterAlt: "Editorial premium product page for a leather bag",
    category: "E-commerce · Web",
  },
  {
    title: "Consumer — fitness app",
    caption: "A chaotic stats grid pared back to one number that matters.",
    beforeSrc: fitnessBefore, afterSrc: fitnessAfter,
    beforeAlt: "Cluttered fitness app screen with many metrics",
    afterAlt: "Minimal fitness app screen focused on step count",
    category: "Mobile · Consumer",
  },
  {
    title: "Data annotation — labeling tool",
    caption: "A spreadsheet-style labeler replaced with a keyboard-first ML annotation surface.",
    beforeSrc: annotationBefore, afterSrc: annotationAfter,
    beforeAlt: "Spreadsheet-style image annotation tool",
    afterAlt: "Keyboard-first image annotation interface with class list",
    category: "ML · Tooling",
  },
  {
    title: "AI ops — logs to insight",
    caption: "Raw server logs turned into a live model-operations overview.",
    beforeSrc: aiopsBefore, afterSrc: aiopsAfter,
    beforeAlt: "Terminal server log stream",
    afterAlt: "Live AI operations overview dashboard",
    category: "AI ops · Observability",
  },
];

export function BeforeAfterSection({ limit, showMore = false, full = false }:
  { limit?: number; showMore?: boolean; full?: boolean } = {}) {
  const items = full ? pairs : pairs.slice(0, limit ?? 2);

  return (
    <section id="before-after" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[240px] w-[240px] md:h-[400px] md:w-[400px] -translate-y-1/2 rounded-full bg-[oklch(0.82_0.14_86)] opacity-[0.08] blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">The difference</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">
            {full ? "Transformations" : "Before & After"}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {full
              ? "Across web, mobile, AI, ML tooling, and internal platforms — drag or use the toggle to compare."
              : "Drag the divider on each project to see what changed."}
          </p>
        </div>
        <div className={`mt-12 sm:mt-16 grid gap-10 sm:gap-12 ${items.length === 1 ? "mx-auto max-w-3xl" : "lg:grid-cols-2"}`}>
          {items.map((p) => (
            <div key={p.title} className="flex flex-col">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">{p.category}</p>
              <BeforeAfter
                title={p.title}
                caption={p.caption}
                beforeSrc={p.beforeSrc}
                afterSrc={p.afterSrc}
                beforeAlt={p.beforeAlt}
                afterAlt={p.afterAlt}
              />
            </div>
          ))}
        </div>
        {showMore && (
          <div className="mt-14 flex justify-center">
            <Link
              to="/work"
              hash="before-after"
              className="group inline-flex items-center gap-3 rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] px-7 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition-all hover:bg-[oklch(0.82_0.14_86_/_0.08)] hover:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.35)]"
            >
              More transformations
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}