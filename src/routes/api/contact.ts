import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { sendTemplateEmail } from '@/lib/email-templates/send-email'

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().min(1).max(5000),
})

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }
        const parsed = ContactSchema.safeParse(body)
        if (!parsed.success) {
          return Response.json({ error: 'Invalid input' }, { status: 400 })
        }
        const data = parsed.data
        try {
          await sendTemplateEmail('contact-notification', 'contact@athera-intelligence.com', {
            templateData: {
              name: data.name,
              email: data.email,
              company: data.company || undefined,
              message: data.message,
            },
            replyTo: data.email,
            idempotencyKey: `contact-${data.email}-${Date.now()}`,
          })
        } catch (err) {
          console.error('contact send failed', err)
          return Response.json({ error: 'Send failed' }, { status: 502 })
        }
        return Response.json({ ok: true })
      },
    },
  },
})