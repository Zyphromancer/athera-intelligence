import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout-only route: see the identical comment in blog.tsx for why this is
// needed. /case-studies and /case-studies/$slug were meant to be fully
// independent pages, but without this <Outlet /> the $slug child route
// never rendered — visiting a case study showed the index list instead of
// the actual case study (title/meta were still correct, since those are
// resolved independently of component rendering).
export const Route = createFileRoute("/case-studies")({
  component: () => <Outlet />,
});
