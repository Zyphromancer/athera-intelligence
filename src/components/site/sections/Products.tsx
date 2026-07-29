import { TiltCard } from "@/components/site/TiltCard";
import sentinel from "@/assets/projects/sentinel.jpg";

const products = [
  {
    title: "Sentinel",
    form: "Software",
    badge: "In development",
    pitch: "A forensic engine that detects AI-generated content across text, images, and video. Our own research, shipped.",
    outcomes: ["96% precision on the internal benchmark", "Sub-300 ms inference per asset", "Text, image, and video detection"],
    image: sentinel,
  },
  {
    title: "NEO",
    form: "Hardware",
    badge: "In development",
    pitch: "An ambient AI device that brings intelligent assistance into everyday life. Hardware, engineered from the research up.",
    outcomes: ["Ambient, always-available assistance", "Built on our neuro-informed research", "Designed for everyday life, not a screen"],
    image: null,
  },
];

export function Products() {
  return (
    <section id="products" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[240px] w-[240px] md:h-[420px] md:w-[420px] rounded-full bg-[oklch(0.82_0.14_86)] opacity-[0.07] blur-[140px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">What we've built</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">Products</h2>
          <p className="mt-4 text-muted-foreground">
            Two products, two forms — software and hardware — built on the same research foundation. The proof of the lab's range.
          </p>
        </div>
        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2">
          {products.map((p) => (
            <TiltCard key={p.title} intensity={7}>
              <article className="flex h-full flex-col">
                {p.image && (
                  <div className="relative overflow-hidden">
                    <img src={p.image} alt={p.title} width={1600} height={900} loading="lazy"
                      className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.012_80)] via-transparent to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">{p.form}</p>
                    <span className="rounded-full border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.82_0.14_86_/_0.05)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[oklch(0.9_0.15_90)]">{p.badge}</span>
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
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
