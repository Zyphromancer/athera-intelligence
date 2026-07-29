import { createFileRoute } from "@tanstack/react-router";
import { IntroAnimation } from "@/components/site/IntroAnimation";
import { PageChrome } from "@/components/site/PageChrome";
import { Hero } from "@/components/site/sections/Hero";
import { Research } from "@/components/site/sections/Research";
import { Products } from "@/components/site/sections/Products";
import { Services } from "@/components/site/sections/Services";
import { Projects } from "@/components/site/sections/Projects";
import { BeforeAfterSection } from "@/components/site/sections/BeforeAfterSection";
import { Signal } from "@/components/site/sections/Signal";
import { Testimonials } from "@/components/site/sections/Testimonials";
import { ExploreBand } from "@/components/site/sections/ExploreBand";
import { FAQ } from "@/components/site/sections/FAQ";
import { Contact } from "@/components/site/sections/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Athera Intelligence — Research-led technology lab" },
      { name: "description", content: "A research-led technology lab building software, AI, and hardware around people — across how they think, live, and heal." },
      { property: "og:title", content: "Athera Intelligence — Research-led technology lab" },
      { property: "og:description", content: "A research-led technology lab building software, AI, and hardware around people — across how they think, live, and heal." },
    ],
  }),
});

function Index() {
  return (
    <>
      <IntroAnimation />
      <PageChrome>
        <Hero />
        <Research />
        <Products />
        <Services />
        <Signal />
        <Projects limit={2} showMore />
        <BeforeAfterSection limit={1} showMore />
        <Testimonials limit={2} showMore />
        <ExploreBand />
        <FAQ limit={3} showMore />
        <Contact />
      </PageChrome>
    </>
  );
}
