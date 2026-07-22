import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "request_call_booking",
  title: "Request a call booking",
  description:
    "Request an intro call with Athera Intelligence — same fields as the website booking form. Delivered by email to contact@athera-intelligence.com.",
  inputSchema: {
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(200),
    company: z.string().trim().max(160).optional(),
    date: z.string().trim().max(40).optional().describe("Preferred date (free-form, e.g. 'Tue 28 Jul')."),
    time: z.string().trim().max(40).optional().describe("Preferred time window."),
    timezone: z.string().trim().max(80).optional(),
    topic: z.string().trim().max(5000).optional().describe("What the caller wants to discuss."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  handler: async (input) => {
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    try {
      await sendTemplateEmail("book-call-notification", "contact@athera-intelligence.com", {
        templateData: {
          name: input.name,
          email: input.email,
          company: input.company || undefined,
          date: input.date || undefined,
          time: input.time || undefined,
          timezone: input.timezone || undefined,
          topic: input.topic || undefined,
        },
        replyTo: input.email,
        idempotencyKey: `mcp-book-${input.email}-${Date.now()}`,
      });
    } catch (err) {
      return {
        content: [{ type: "text", text: `Failed to submit booking: ${(err as Error).message}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: "Booking request received. Athera Intelligence will confirm within one business day." }],
      structuredContent: { ok: true },
    };
  },
});