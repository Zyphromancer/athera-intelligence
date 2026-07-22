import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { publicProjects } from "../data";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description:
    "Return the list of Athera Intelligence projects shown on the site (client work, concept builds, and studio projects) with pitch, outcomes, and tech tags.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(publicProjects, null, 2) }],
    structuredContent: { projects: publicProjects },
  }),
});

// Silence unused-import in strict projects that require z somewhere.
void z;