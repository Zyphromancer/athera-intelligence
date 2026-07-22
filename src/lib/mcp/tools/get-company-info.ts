import { defineTool } from "@lovable.dev/mcp-js";
import { companyInfo } from "../data";

export default defineTool({
  name: "get_company_info",
  title: "Get company info",
  description:
    "Return Athera Intelligence's public overview: services, locations, contact email, engagement model, and mid-range price band.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(companyInfo, null, 2) }],
    structuredContent: { company: companyInfo },
  }),
});