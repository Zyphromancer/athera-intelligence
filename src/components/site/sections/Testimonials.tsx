import { TiltCard } from "@/components/site/TiltCard";

const quotes = [
  { quote: "They shipped in a quarter what our internal team failed to ship in a year. Zero drama, senior code, and a product our customers actually love.", name: "Elena Karras", role: "COO, Meridian Capital" },
  { quote: "The Athera team is the rare shop that treats AI as engineering, not a magic trick. Our detection pipeline is now core infrastructure.", name: "David Wu", role: "VP Engineering, Sentinel" },
  { quote: "Elegant, fast, and considered. Every touchpoint of our product feels sharper — down to the loading states.", name: "Marta Silva", role: "Founder, Orbit Fitness" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Kind words</p>
          <h2 className="mt-4 font-display text-5xl text-gold-metallic md:text-6xl">Testimonials</h2>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {quotes.map((q) => (
            <TiltCard key={q.name}>
              <div className="flex h-full flex-col p-8">
                <span aria-hidden className="font-display text-6xl leading-none text-gold-metallic">“</span>
                <p className="mt-2 flex-1 text-base leading-relaxed text-foreground/90">{q.quote}</p>
                <div className="mt-8 border-t border-[oklch(0.82_0.14_86_/_0.15)] pt-4">
                  <p className="font-display text-lg text-foreground">{q.name}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-[oklch(0.82_0.14_86)]">{q.role}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}