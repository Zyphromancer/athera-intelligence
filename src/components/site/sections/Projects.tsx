import { TiltCard } from "@/components/site/TiltCard";
import sentinel from "@/assets/projects/sentinel.jpg";
import meridian from "@/assets/projects/meridian.jpg";
import orbit from "@/assets/projects/orbit.jpg";
import lumen from "@/assets/projects/lumen.jpg";

const projects = [
  {
    title: "Sentinel AI",
    category: "AI detection system",
    pitch: "Real-time forensic engine that scores images, video frames and text for AI-generated content.",
    outcomes: ["96% precision on the internal benchmark", "Sub-300 ms inference per asset", "12M assets scored in the first month"],
    tags: ["Python", "PyTorch", "FastAPI", "Chrome Extension"],
    image: sentinel,
  },
  {
    title: "Meridian Capital",
    category: "Website development",
    pitch: "A refined marketing platform for a private wealth firm — editorial, fast, and CMS-driven.",
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

export function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Selected work</p>
          <h2 className="mt-4 font-display text-5xl text-gold-metallic md:text-6xl">Projects</h2>
          <p className="mt-4 text-muted-foreground">Four recent engagements across AI, web, and native apps.</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <TiltCard key={p.title} intensity={7}>
              <article className="flex h-full flex-col">
                <div className="relative overflow-hidden">
                  <img src={p.image} alt={`${p.title} — ${p.category}`} width={1600} height={900} loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.012_80)] via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">{p.category}</p>
                  <h3 className="mt-2 font-display text-3xl text-foreground">{p.title}</h3>
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
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}