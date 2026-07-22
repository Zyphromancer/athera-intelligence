import { createFileRoute } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { Contact } from "@/components/site/sections/Contact";
import { FAQ } from "@/components/site/sections/FAQ";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Athera Intelligence" },
      { name: "description", content: "Tell us what you're building. We reply within one business day and start every engagement with a short discovery call." },
      { property: "og:title", content: "Contact — Athera Intelligence" },
      { property: "og:description", content: "Get in touch with Athera Intelligence — replies within one business day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageChrome>
      <PageHeader
        crumb="Contact"
        eyebrow="Let's talk"
        title="Start a project."
        intro="Tell us what you're building. We reply within one business day."
      />
      <Contact />
      <FAQ />
    </PageChrome>
  );
}