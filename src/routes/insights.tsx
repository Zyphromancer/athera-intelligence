import { createFileRoute, redirect } from "@tanstack/react-router";

// /insights was a static placeholder page (four fabricated "coming soon"
// articles, never wired to real content). Retired in favor of /blog, which
// is the real, working articles section. 301 so any existing bookmarks or
// external links land on /blog instead of a dead page.
export const Route = createFileRoute("/insights")({
  beforeLoad: () => {
    throw redirect({ to: "/blog", statusCode: 301 });
  },
});
