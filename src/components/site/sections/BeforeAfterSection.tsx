import { BeforeAfter } from "@/components/site/BeforeAfter";
import bankBefore from "@/assets/before-after/bank-before.jpg";
import bankAfter from "@/assets/before-after/bank-after.jpg";
import dashBefore from "@/assets/before-after/dashboard-before.jpg";
import dashAfter from "@/assets/before-after/dashboard-after.jpg";
import restBefore from "@/assets/before-after/restaurant-before.jpg";
import restAfter from "@/assets/before-after/restaurant-after.jpg";

export function BeforeAfterSection() {
  return (
    <section id="before-after" className="relative py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[oklch(0.82_0.14_86)] opacity-[0.08] blur-[140px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[oklch(0.82_0.14_86)]">The difference</p>
          <h2 className="mt-4 font-display text-5xl text-gold-metallic md:text-6xl">Before &amp; After</h2>
          <p className="mt-4 text-muted-foreground">Drag the divider on each project to see what changed.</p>
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <BeforeAfter title="Regional bank — landing page" caption="From dated 2010s corporate template to refined dark editorial."
            beforeSrc={bankBefore} afterSrc={bankAfter} beforeAlt="Dated bank website" afterAlt="Redesigned bank website" />
          <BeforeAfter title="SaaS — admin dashboard" caption="Cluttered light-mode tables → focused dark dashboard with clear hierarchy."
            beforeSrc={dashBefore} afterSrc={dashAfter} beforeAlt="Old cluttered dashboard" afterAlt="Modernized dashboard" />
          <div className="lg:col-span-2 lg:mx-auto lg:w-2/3">
            <BeforeAfter title="Restaurant — mobile app" caption="Playful pastel screens replaced with a premium, editorial dark UI."
              beforeSrc={restBefore} afterSrc={restAfter} beforeAlt="Old cartoonish restaurant app" afterAlt="Premium restaurant app" aspect="3 / 4" />
          </div>
        </div>
      </div>
    </section>
  );
}