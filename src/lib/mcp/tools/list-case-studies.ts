import { defineTool } from "@lovable.dev/mcp-js";
import { caseStudies } from "@/lib/case-studies";

export default defineTool({
  name: "list_case_studies",
  title: "List case studies",
  description:
    "Return summaries of Athera Intelligence case studies (slug, title, category, summary, status).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = caseStudies.map((c) => ({
      slug: c.slug,
      title: c.title,
      client: c.client,
      category: c.category,
      summary: c.summary,
      status: c.status ?? "published",
      url: `https://www.athera-intelligence.com/case-studies/${c.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { caseStudies: items },
    };
  },
});