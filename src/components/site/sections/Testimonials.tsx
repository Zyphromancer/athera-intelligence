import { TiltCard } from "@/components/site/TiltCard";
import { Link } from "@tanstack/react-router";

const quotes = [
  { title: "Direct with the engineer", body: "You work with the person building your product. No account managers, no handoffs.", tag: "How we work" },
  { title: "Fixed price, agreed upfront", body: "Scope and cost settled before a line of code. No hourly surprises.", tag: "How we work" },
  { title: "Yours to keep", body: "Full source, full ownership, documented handover. No lock-in.", tag: "How we work" },
];

export function Testimonials({ limit, showMore = false }: { limit?: number; showMore?: boolean } = {}) {
  const items = typeof limit === "number" ? quotes.slice(0, limit) : quotes;
  return (
    <section id="testimonials" className="relative py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">How we work</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">Testimonials</h2>
        </div>
        <div className={`mt-12 sm:mt-16 grid gap-5 sm:gap-6 ${items.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {items.map((q) => (
            <TiltCard key={q.title}>
              <div className="flex h-full flex-col p-6 sm:p-8">
                <span aria-hidden className="font-display text-6xl leading-none text-gold-metallic">“</span>
                <p className="mt-2 flex-1 text-base leading-relaxed text-foreground/90">{q.body}</p>
                <div className="mt-8 border-t border-[oklch(0.82_0.14_86_/_0.15)] pt-4">
                  <p className="font-display text-lg text-foreground">{q.title}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-[oklch(0.82_0.14_86)]">{q.tag}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
        {showMore && (
          <div className="mt-14 flex justify-center">
            <Link
              to="/trust"
              className="group inline-flex items-center gap-3 rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] px-7 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition-all hover:bg-[oklch(0.82_0.14_86_/_0.08)] hover:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.35)]"
            >
              More on trust &amp; team
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}