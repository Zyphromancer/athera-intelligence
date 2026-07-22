import { TiltCard } from "@/components/site/TiltCard";
import { Link } from "@tanstack/react-router";
import sentinel from "@/assets/projects/sentinel.jpg";
import meridian from "@/assets/projects/meridian.jpg";
import orbit from "@/assets/projects/orbit.jpg";
import lumen from "@/assets/projects/lumen.jpg";
import trenfotballCover from "@/assets/case-studies/trenfotball-cover.png.asset.json";

const projects = [
  {
    title: "TrenFotball",
    category: "Client work · Sports platform",
    badge: "Client work",
    pitch: "A video-driven training platform for a Norwegian football coaching business. Custom video pipeline, structured session library, and a CMS the client manages themselves.",
    outcomes: ["Next.js and TypeScript throughout", "Vimeo-backed video delivery", "Client-managed content, no developer dependency"],
    tags: ["Next.js", "TypeScript", "Vimeo API", "Tailwind"],
    image: trenfotballCover.url,
    caseStudy: "trenfotball" as const,
  },
  {
    title: "Sentinel AI",
    category: "Studio project · In development",
    badge: "In development",
    pitch: "Real-time forensic engine that scores images, video frames and text for AI-generated content.",
    outcomes: ["96% precision on the internal benchmark", "Sub-300 ms inference per asset", "In active development"],
    tags: ["Python", "PyTorch", "FastAPI", "Chrome Extension"],
    image: sentinel,
  },
  {
    title: "Meridian",
    category: "Concept build · Financial services",
    badge: "Concept",
    pitch: "A refined marketing platform concept for a private wealth firm — editorial, fast, and CMS-driven.",
    outcomes: ["0.6 s median LCP on 4G", "+38% qualified leads in Q1", "9-language localisation"],
    tags: ["Next.js", "TypeScript", "Headless CMS", "Edge"],
    image: meridian,
  },
  {
    title: "Orbit",
    category: "Mobile app development",
    pitch: "Cross-platform fitness app with workout tracking, wearable sync and offline-first data.",
    outcomes: ["Shipped iOS + Android in 14 weeks", "4.9★ average across 2,400 reviews", "Apple Watch and HealthKit integration"],
    tags: ["React Native", "Expo", "Swift", "HealthKit"],
    image: orbit,
  },
  {
    title: "Lumen",
    category: "AI development",
    pitch: "A private RAG assistant for an in-house legal team — grounded answers with citations, on their own corpus.",
    outcomes: ["40k+ documents ingested and indexed", "Sub-2 s answers with source citations", "SOC 2-aligned, deployed in VPC"],
    tags: ["LLMs", "Vector DB", "RAG", "Streaming"],
    image: lumen,
  },
];

export function Projects({ limit, showMore = false }: { limit?: number; showMore?: boolean } = {}) {
  const items = typeof limit === "number" ? projects.slice(0, limit) : projects;
  return (
    <section id="projects" className="relative py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Selected work</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">Projects</h2>
          <p className="mt-4 text-muted-foreground">Recent engagements across AI, web, and native apps.</p>
        </div>
        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2">
          {items.map((p) => (
            <TiltCard key={p.title} intensity={7}>
              <article className="flex h-full flex-col">
                <div className="relative overflow-hidden">
                  <img src={p.image} alt={`${p.title} — ${p.category}`} width={1600} height={900} loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.012_80)] via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">{p.category}</p>
                    {"badge" in p && p.badge && (
                      <span className="rounded-full border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.82_0.14_86_/_0.05)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[oklch(0.9_0.15_90)]">{p.badge}</span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl text-foreground">{p.title}</h3>
                  <div className="mt-3 h-px w-16 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.pitch}</p>
                  <ul className="mt-6 space-y-2">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex gap-3 text-sm text-foreground/90">
                        <span aria-hidden className="mt-[0.55rem] inline-block h-px w-4 flex-none bg-[oklch(0.82_0.14_86)]" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.82_0.14_86_/_0.05)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[oklch(0.9_0.15_90)]">{t}</span>
                    ))}
                  </div>
                  {"caseStudy" in p && p.caseStudy && (
                    <div className="mt-6">
                      <Link
                        to="/case-studies/$slug"
                        params={{ slug: p.caseStudy }}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[oklch(0.9_0.15_90)] transition-colors hover:text-[oklch(0.95_0.15_90)]"
                      >
                        Read case study
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
        {showMore && (
          <div className="mt-14 flex justify-center">
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] px-7 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition-all hover:bg-[oklch(0.82_0.14_86_/_0.08)] hover:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.35)]"
            >
              See all work
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}