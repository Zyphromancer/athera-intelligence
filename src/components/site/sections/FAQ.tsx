import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";

const faqs = [
  { q: "How do engagements typically start?", a: "A 30-minute intro call, then a short paid discovery — usually 1–2 weeks — where we produce a technical brief, timeline, and fixed price for the build." },
  { q: "What does pricing look like?", a: "Fixed price per milestone for most projects, or a weekly retainer for ongoing work. We share the estimate before you commit, and never surprise-invoice." },
  { q: "How long do projects usually take?", a: "A production-ready MVP typically ships in 8–14 weeks. AI systems and larger platforms range from 3 to 9 months." },
  { q: "Which stack do you use?", a: "TypeScript, React, Next.js/TanStack, Python, PyTorch, Postgres, and modern cloud (Cloudflare, AWS, GCP). We match the tool to the problem, not the résumé." },
  { q: "Who owns the code?", a: "You do. Full IP transfer, clean repositories, documentation, and a proper handover — from day one it's yours." },
  { q: "Do you support the product after launch?", a: "Yes. We offer ongoing retainers for maintenance, iteration, and on-call — or a clean handover to your internal team if you prefer." },
];

export function FAQ({ limit, showMore = false }: { limit?: number; showMore?: boolean } = {}) {
  const items = typeof limit === "number" ? faqs.slice(0, limit) : faqs;
  return (
    <section id="faq" className="relative py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Questions</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">FAQ</h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 sm:mt-16 w-full">
          {items.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-[oklch(0.82_0.14_86_/_0.15)]">
              <AccordionTrigger className="py-5 sm:py-6 text-left font-display text-lg sm:text-xl text-foreground hover:text-[oklch(0.9_0.15_90)] hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {showMore && (
          <div className="mt-10 flex justify-center">
            <Link
              to="/contact"
              hash="faq"
              className="group inline-flex items-center gap-3 rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] px-7 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition-all hover:bg-[oklch(0.82_0.14_86_/_0.08)] hover:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.35)]"
            >
              See all FAQs
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}