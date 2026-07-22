import { createFileRoute } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { TiltCard } from "@/components/site/TiltCard";
import { Testimonials } from "@/components/site/sections/Testimonials";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust — Athera Intelligence" },
      { name: "description", content: "Security, compliance, and the client work behind Athera Intelligence — what we practise and how we protect your product." },
      { property: "og:title", content: "Trust — Athera Intelligence" },
      { property: "og:description", content: "Security, compliance, and client-facing practices at Athera Intelligence." },
    ],
  }),
  component: TrustPage,
});

const practices = [
  { t: "Least-privilege access", b: "SSO-backed identity for every environment. Production access is short-lived, logged, and reviewed quarterly." },
  { t: "Encryption in transit and at rest", b: "TLS everywhere and at-rest encryption on managed databases and storage buckets we operate." },
  { t: "Secrets management", b: "No secrets in code or chat. Values live in the provider's vault; access is scoped to the environment that needs them." },
  { t: "Dependency & code review", b: "Every change goes through review and automated checks; dependencies are scanned continuously and patched on a schedule." },
  { t: "Backups & recovery", b: "Automated daily backups with tested restore procedures for every production database we manage." },
  { t: "Incident response", b: "A written runbook, an on-call rotation for retainer clients, and a customer-notification SLA for confirmed incidents." },
];

function TrustPage() {
  return (
    <PageChrome>
      <PageHeader
        crumb="Trust"
        eyebrow="Trust"
        title="Security, plainly stated."
        intro="This page is maintained by Athera Intelligence to answer common security and privacy questions about how we work. It describes practices we apply on projects we build and operate — it is not an independent certification."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-6">
          <TiltCard intensity={3}>
            <div className="p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Shared responsibility</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Athera builds and can operate the application layer. The underlying cloud provider (for example
                Cloudflare, AWS, or GCP) is responsible for infrastructure security. You, as the client, remain
                responsible for the data you collect, the users you invite, and any regulatory obligations
                specific to your business.
              </p>
            </div>
          </TiltCard>
        </div>
      </section>

      <section className="relative py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[oklch(0.82_0.14_86)] text-center">Practices we apply</p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {practices.map((p) => (
              <TiltCard key={p.t} intensity={4}>
                <div className="p-8">
                  <h3 className="font-display text-xl text-foreground">{p.t}</h3>
                  <div className="mt-3 h-px w-12 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.b}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Formal compliance</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic md:text-5xl">On request.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Enterprise clients often need a DPA, subprocessor list, or vendor questionnaire. We handle those
            on a per-engagement basis rather than publishing generic claims. Reach out and we'll share the
            relevant documentation for your review.
          </p>
        </div>
      </section>

      <Testimonials />
    </PageChrome>
  );
}