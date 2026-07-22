import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { sendTemplateEmail } from '@/lib/email-templates/send-email'

const BookSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  date: z.string().trim().max(40).optional().or(z.literal('')),
  time: z.string().trim().max(40).optional().or(z.literal('')),
  timezone: z.string().trim().max(80).optional().or(z.literal('')),
  topic: z.string().trim().max(5000).optional().or(z.literal('')),
})

export const Route = createFileRoute('/api/book-a-call')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }
        const parsed = BookSchema.safeParse(body)
        if (!parsed.success) {
          return Response.json({ error: 'Invalid input' }, { status: 400 })
        }
        const d = parsed.data
        try {
          await sendTemplateEmail('book-call-notification', 'contact@athera-intelligence.com', {
            templateData: {
              name: d.name,
              email: d.email,
              company: d.company || undefined,
              date: d.date || undefined,
              time: d.time || undefined,
              timezone: d.timezone || undefined,
              topic: d.topic || undefined,
            },
            replyTo: d.email,
            idempotencyKey: `book-${d.email}-${Date.now()}`,
          })
        } catch (err) {
          console.error('book-a-call send failed', err)
          return Response.json({ error: 'Send failed' }, { status: 502 })
        }
        return Response.json({ ok: true })
      },
    },
  },
})