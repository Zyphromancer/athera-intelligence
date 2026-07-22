import { createFileRoute } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { Projects } from "@/components/site/sections/Projects";
import { BeforeAfterSection } from "@/components/site/sections/BeforeAfterSection";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Athera Intelligence" },
      { name: "description", content: "Recent engagements across AI, web, and native apps — plus before/after transformations from real client projects." },
      { property: "og:title", content: "Work — Athera Intelligence" },
      { property: "og:description", content: "Recent engagements and before/after transformations from Athera Intelligence." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <PageChrome>
      <PageHeader
        crumb="Work"
        eyebrow="Selected work"
        title="What we've shipped."
        intro="A closer look at recent engagements — the brief, the outcomes, and the difference before and after."
      />
      <Projects />
      <BeforeAfterSection full />
    </PageChrome>
  );
}