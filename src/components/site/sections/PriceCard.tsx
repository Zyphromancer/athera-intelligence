import { Link } from "@tanstack/react-router";
import { TiltCard } from "@/components/site/TiltCard";

const included = [
  "Product architecture & design system",
  "Auth, dashboard, billing, admin",
  "Analytics + transactional email",
  "Staging + production infrastructure",
  "Full IP transfer & documentation",
];
const notIncluded = [
  "Native mobile apps (add-on)",
  "Third-party licence fees",
  "Post-launch retainer (separate)",
];

export function PriceCard() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] md:h-[500px] md:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.82_0.14_86)] opacity-[0.08] blur-[140px]" />
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Investment</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-gold-metallic md:text-5xl">A mid-range engagement</h2>
          <p className="mt-4 text-muted-foreground">Fixed scope, fixed price, honest schedule.</p>
        </div>

        <div className="mt-12 sm:mt-14">
          <TiltCard intensity={5}>
            <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1.1fr_1fr] md:gap-10 md:p-14">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Fixed-scope build</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display text-5xl leading-none text-gold-metallic sm:text-6xl md:text-7xl">€18k–€26k</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Six-week build for a single product surface — the fintech customer portal in this example.
                  Delivered by a lead engineer, a design lead, and one supporting engineer.
                </p>
                <div className="mt-8 rounded-xl border border-[oklch(0.82_0.14_86_/_0.2)] bg-[oklch(0.82_0.14_86_/_0.04)] p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Payment schedule</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-foreground/90">
                    <span className="font-display text-2xl text-foreground">30%</span>
                    <span className="text-muted-foreground">kickoff</span>
                    <span aria-hidden className="hidden sm:block h-px flex-1 bg-[oklch(0.82_0.14_86_/_0.25)]" />
                    <span className="font-display text-2xl text-foreground">40%</span>
                    <span className="text-muted-foreground">mid</span>
                    <span aria-hidden className="hidden sm:block h-px flex-1 bg-[oklch(0.82_0.14_86_/_0.25)]" />
                    <span className="font-display text-2xl text-foreground">30%</span>
                    <span className="text-muted-foreground">launch</span>
                  </div>
                </div>
                <p className="mt-6 text-xs italic text-muted-foreground">
                  Indicative range for a mid-range engagement. Final quote after a short paid discovery.
                </p>
                <div className="mt-8">
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[oklch(0.92_0.14_88)] to-[oklch(0.7_0.13_75)] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-black shadow-[0_10px_40px_-8px_oklch(0.82_0.14_86_/_0.6)] transition-transform hover:scale-[1.02]"
                  >
                    <span className="relative z-10">Book a discovery call</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">What's included</p>
                  <ul className="mt-4 space-y-2">
                    {included.map((i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground/90">
                        <span aria-hidden className="mt-[0.55rem] inline-block h-px w-4 flex-none bg-[oklch(0.82_0.14_86)]" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Not included</p>
                  <ul className="mt-4 space-y-2">
                    {notIncluded.map((i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <span aria-hidden className="mt-[0.55rem] inline-block h-px w-4 flex-none bg-[oklch(0.5_0.02_80)]" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
          <TiltCard intensity={4}>
            <div className="p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Retainer</p>
              <p className="mt-2 font-display text-2xl sm:text-3xl text-foreground">from €4.5k / month</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Ongoing iteration, maintenance, and on-call after launch. Predictable capacity, no context loss.
              </p>
            </div>
          </TiltCard>
          <TiltCard intensity={4}>
            <div className="p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Staff augmentation</p>
              <p className="mt-2 font-display text-2xl sm:text-3xl text-foreground">from €8k / month · engineer</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Senior engineers embedded into your team for a defined period. Your process, our craft.
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}