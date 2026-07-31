import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout-only route: /blog and /blog/$slug are meant to be fully independent
// pages (list vs. detail), not a nested layout+content pair, but TanStack
// Router's flat file convention still makes blog.$slug a child of blog — so
// this needs an <Outlet /> for that child to ever render. The actual list
// page content lives in blog.index.tsx (matched only at the exact /blog
// path); this file has no visual content of its own.
export const Route = createFileRoute("/blog")({
  component: () => <Outlet />,
});
