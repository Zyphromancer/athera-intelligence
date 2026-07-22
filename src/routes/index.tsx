import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { IntroAnimation } from "@/components/site/IntroAnimation";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/sections/Hero";
import { Services } from "@/components/site/sections/Services";
import { Projects } from "@/components/site/sections/Projects";
import { BeforeAfterSection } from "@/components/site/sections/BeforeAfterSection";
import { Signal } from "@/components/site/sections/Signal";
import { Testimonials } from "@/components/site/sections/Testimonials";
import { FAQ } from "@/components/site/sections/FAQ";
import { Contact } from "@/components/site/sections/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Athera Intelligence — AI, Apps & Software Engineering" },
      { name: "description", content: "Custom software, mobile apps, and AI systems for ambitious companies. Corporate craftsmanship, modern edge." },
      { property: "og:title", content: "Athera Intelligence — AI, Apps & Software Engineering" },
      { property: "og:description", content: "Custom software, mobile apps, and AI systems for ambitious companies." },
    ],
  }),
});

function Index() {
  return (
    <>
      <IntroAnimation />
      <div className="relative min-h-screen bg-background text-foreground selection:bg-[oklch(0.82_0.14_86)] selection:text-black">
        <SiteNav />
        <main>
          <Hero />
          <Services />
          <Projects />
          <BeforeAfterSection />
          <Signal />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <SiteFooter />
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </>
  );
}
