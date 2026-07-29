import { TiltCard } from "@/components/site/TiltCard";

const domains = [
  { title: "Think", desc: "Cognition and neurodivergence — how people process, focus, and understand.", icon: "M12 3a4 4 0 100 8 4 4 0 000-8zM4 21a8 8 0 0116 0" },
  { title: "Live", desc: "Accessibility and everyday life — how people move through the world day to day.", icon: "M4 4h16v6H4zM4 14h10v6H4zM17 14h3v6h-3z" },
  { title: "Heal", desc: "Health and wellbeing — how people recover, manage, and stay well.", icon: "M12 21s-7-4.35-9.5-8.5C1 8.5 3 5 6.5 5c2 0 3.5 1.5 5.5 4 2-2.5 3.5-4 5.5-4C21 5 23 8.5 21.5 12.5 19 16.65 12 21 12 21z" },
];

export function Research() {
  return (
    <section id="research" className="relative py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Foundation</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">Research</h2>
          <p className="mt-4 text-muted-foreground">
            Everything we build starts as a question. We investigate hard problems from first principles — in applied AI, multimodal detection, ambient computing, and neuro-informed systems — then engineer what we find into products people can actually use.
          </p>
        </div>
        <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-3">
          {domains.map((d) => (
            <TiltCard key={d.title} className="h-full">
              <div className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] bg-[oklch(0.82_0.14_86_/_0.08)] text-[oklch(0.9_0.15_90)] shadow-[inset_0_0_20px_oklch(0.82_0.14_86_/_0.15)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d.icon} /></svg>
                </div>
                <h3 className="mt-6 font-display text-2xl text-foreground">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
