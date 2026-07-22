import { createFileRoute, Link } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { TiltCard } from "@/components/site/TiltCard";
import { EngagementTimeline } from "@/components/site/sections/EngagementTimeline";
import { PriceCard } from "@/components/site/sections/PriceCard";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/example")({
  head: () => ({
    meta: [
      { title: "Example engagement — Athera Intelligence" },
      { name: "description", content: "A mid-range engagement, end to end — brief, scope, four-phase timeline, and an honest price example from €18k–€26k." },
      { property: "og:title", content: "Example engagement — Athera Intelligence" },
      { property: "og:description", content: "See what a mid-range Athera project looks like: scope, timeline, and price." },
    ],
  }),
  component: ExamplePage,
});

const scope = [
  "Design system in code (tokens, primitives, 8 core screens)",
  "Email + password + SSO authentication",
  "Customer dashboard with account, usage, and support",
  "Stripe subscriptions, invoices, and dunning",
  "Internal admin console with role-based access",
  "Product analytics and transactional email",
  "Staging + production infrastructure",
  "Full documentation and handover session",
];

function ExamplePage() {
  return (
    <PageChrome>
      <PageHeader
        crumb="Example"
        eyebrow="Example engagement"
        title="A mid-range engagement, end to end."
        intro="An indicative walkthrough of what a mid-range project looks like at Athera — 6 to 10 weeks, one product surface, one team. The client below is fictional; the shape is exactly how we work."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
            <TiltCard intensity={4}>
              <div className="p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">The brief</p>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl text-foreground">Series A fintech<br/>customer portal.</h2>
                <div className="mt-3 h-px w-16 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  A regulated fintech needs a production-ready customer portal — authentication, a usage
                  dashboard, self-serve billing on Stripe, and an internal admin surface — in one quarter.
                </p>
                <ul className="mt-6 space-y-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <li>· 8-week build</li>
                  <li>· 3-person team</li>
                  <li>· One product surface</li>
                </ul>
              </div>
            </TiltCard>
            <TiltCard intensity={4}>
              <div className="p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Scope</p>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl text-foreground">What we deliver.</h2>
                <div className="mt-3 h-px w-16 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {scope.map((s) => (
                    <li key={s} className="flex gap-3 text-sm text-foreground/90">
                      <span aria-hidden className="mt-[0.55rem] inline-block h-px w-4 flex-none bg-[oklch(0.82_0.14_86)]" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <EngagementTimeline />
      <PriceCard />

      <BookACallSection />
    </PageChrome>
  );
}

function BookACallSection() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    window.setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast.success("Call request received. We'll confirm a time within one business day.");
    }, 700);
  }

  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Book a call</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">Bring us your version.</h2>
          <p className="mt-4 text-muted-foreground">The example above is a shape, not a menu. Every real project starts with a discovery call.</p>
        </div>
        <div className="mt-12 sm:mt-16">
          <TiltCard intensity={4}>
            <form onSubmit={onSubmit} className="grid gap-6 p-6 sm:p-10 md:p-12">
              <div className="grid gap-6 sm:grid-cols-2">
                <BookField label="Name" name="name" required />
                <BookField label="Email" name="email" type="email" required />
              </div>
              <BookField label="Company" name="company" />
              <div className="grid gap-6 sm:grid-cols-2">
                <BookField label="Preferred date" name="date" type="date" />
                <BookField label="Preferred time" name="time" type="time" />
              </div>
              <BookField label="Timezone" name="timezone" placeholder="e.g. GMT, CET, EST" />
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">What would you like to discuss?</label>
                <textarea name="topic" rows={3}
                  className="w-full rounded-lg border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.14_0.012_80_/_0.6)] px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 outline-none transition focus:border-[oklch(0.82_0.14_86_/_0.7)] focus:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.25)]"
                  placeholder="A few lines on the product, timeline, and where you need help." />
              </div>
              <button type="submit" disabled={submitting}
                className="group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[oklch(0.92_0.14_88)] to-[oklch(0.7_0.13_75)] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-black shadow-[0_10px_40px_-8px_oklch(0.82_0.14_86_/_0.6)] transition-transform hover:scale-[1.01] disabled:opacity-70">
                <span className="relative z-10">{submitting ? "Sending…" : "Book a call"}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </form>
          </TiltCard>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Prefer to email?{" "}
            <Link to="/contact" className="text-[oklch(0.9_0.15_90)] underline-offset-4 hover:underline">
              Send us a message here
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function BookField({ label, name, type = "text", required = false, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">{label}</label>
      <input type={type} name={name} required={required} placeholder={placeholder}
        className="w-full rounded-lg border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.14_0.012_80_/_0.6)] px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 outline-none transition focus:border-[oklch(0.82_0.14_86_/_0.7)] focus:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.25)]" />
    </div>
  );
}