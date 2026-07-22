import { TiltCard } from "@/components/site/TiltCard";

const services = [
  { title: "Custom Coding", desc: "Bespoke software written with the care of a specialist workshop. From API layers to internal tools.", icon: "M8 6l-6 6 6 6M16 6l6 6-6 6" },
  { title: "Product Development", desc: "From napkin sketch to shipped product. Strategy, design, engineering — under one roof.", icon: "M4 4h16v6H4zM4 14h10v6H4zM17 14h3v6h-3z" },
  { title: "Web & Mobile Apps", desc: "Fast, elegant, brand-defining web and native apps. Built to scale and to be maintained.", icon: "M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM11 18h2" },
  { title: "AI Development", desc: "Practical AI products: assistants, retrieval, detection, agentic workflows. Deployed, not demoed.", icon: "M12 3a4 4 0 100 8 4 4 0 000-8zM4 21a8 8 0 0116 0" },
  { title: "Cloud & DevOps", desc: "Serverless, edge, containers — matched to what the product actually needs, not a résumé.", icon: "M4 15a4 4 0 014-4 6 6 0 0111.7 1.5A3.5 3.5 0 0119 19H8a4 4 0 01-4-4z" },
  { title: "Consulting", desc: "Second-opinion architecture reviews, hiring advice, and roadmaps for founders and CTOs.", icon: "M12 4v16M4 12h16" },
];

export function Services() {
  return (
    <section id="services" className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">What we do</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">Services</h2>
          <p className="mt-4 text-muted-foreground">A compact, senior team that ships. We cover the whole spectrum — from a first technical spike to a production system your team can own.</p>
        </div>
        <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <TiltCard key={s.title} className="h-full">
              <div className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] bg-[oklch(0.82_0.14_86_/_0.08)] text-[oklch(0.9_0.15_90)] shadow-[inset_0_0_20px_oklch(0.82_0.14_86_/_0.15)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                </div>
                <h3 className="mt-6 font-display text-2xl text-foreground">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}