import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Link } from "@tanstack/react-router";
import bankBefore from "@/assets/before-after/bank-before.jpg";
import bankAfter from "@/assets/before-after/bank-after.jpg";
import dashBefore from "@/assets/before-after/dashboard-before.jpg";
import dashAfter from "@/assets/before-after/dashboard-after.jpg";

export function BeforeAfterSection({ limit, showMore = false }: { limit?: number; showMore?: boolean } = {}) {
  return (
    <section id="before-after" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[240px] w-[240px] md:h-[400px] md:w-[400px] -translate-y-1/2 rounded-full bg-[oklch(0.82_0.14_86)] opacity-[0.08] blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">The difference</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">Before &amp; After</h2>
          <p className="mt-4 text-muted-foreground">Drag the divider on each project to see what changed.</p>
        </div>
        <div className={`mt-12 sm:mt-16 grid gap-10 sm:gap-12 ${limit === 1 ? "mx-auto max-w-3xl" : "lg:grid-cols-2"}`}>
          <BeforeAfter title="Financial services — homepage concept" caption="A dated 2012 template reimagined as a refined editorial identity."
            beforeSrc={bankBefore} afterSrc={bankAfter} beforeAlt="Dated financial services website" afterAlt="Refined editorial financial services website" />
          {limit !== 1 && (
            <BeforeAfter title="SaaS — analytics dashboard" caption="Cluttered light-mode admin panel rebuilt into a focused dark dashboard."
              beforeSrc={dashBefore} afterSrc={dashAfter} beforeAlt="Legacy Admin Panel dashboard" afterAlt="Athera-style dark analytics dashboard" />
          )}
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