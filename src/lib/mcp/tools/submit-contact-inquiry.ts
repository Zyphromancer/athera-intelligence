import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_contact_inquiry",
  title: "Submit contact inquiry",
  description:
    "Send a project inquiry to Athera Intelligence — same fields as the website contact form. Delivered by email to contact@athera-intelligence.com.",
  inputSchema: {
    name: z.string().trim().min(1).max(120).describe("Sender's name."),
    email: z.string().trim().email().max(200).describe("Sender's email address (used for reply)."),
    company: z.string().trim().max(160).optional().describe("Optional company name."),
    message: z.string().trim().min(1).max(5000).describe("Project brief or inquiry message."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  handler: async ({ name, email, company, message }) => {
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    try {
      await sendTemplateEmail("contact-notification", "contact@athera-intelligence.com", {
        templateData: { name, email, company: company || undefined, message },
        replyTo: email,
        idempotencyKey: `mcp-contact-${email}-${Date.now()}`,
      });
    } catch (err) {
      return {
        content: [{ type: "text", text: `Failed to send inquiry: ${(err as Error).message}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: "Inquiry sent. Athera Intelligence typically replies within one business day." }],
      structuredContent: { ok: true },
    };
  },
});