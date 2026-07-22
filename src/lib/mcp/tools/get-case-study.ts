import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getCaseStudy } from "@/lib/case-studies";

export default defineTool({
  name: "get_case_study",
  title: "Get case study",
  description: "Return the full contents of a single Athera Intelligence case study by slug.",
  inputSchema: {
    slug: z.string().min(1).describe("The case study slug, e.g. 'trenfotball'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const study = getCaseStudy(slug);
    if (!study) {
      return {
        content: [{ type: "text", text: `No case study found for slug '${slug}'.` }],
        isError: true,
      };
    }
    // Strip bundler-only image URLs from the payload; keep everything else.
    const { hero: _hero, gallery: _gallery, ...rest } = study;
    return {
      content: [{ type: "text", text: JSON.stringify(rest, null, 2) }],
      structuredContent: { caseStudy: rest },
    };
  },
});