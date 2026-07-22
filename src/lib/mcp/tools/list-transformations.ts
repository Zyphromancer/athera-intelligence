import { defineTool } from "@lovable.dev/mcp-js";
import { publicTransformations } from "../data";

export default defineTool({
  name: "list_transformations",
  title: "List before/after transformations",
  description:
    "Return the list of before/after transformation examples featured on the site (title, category, caption).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(publicTransformations, null, 2) }],
    structuredContent: { transformations: publicTransformations },
  }),
});