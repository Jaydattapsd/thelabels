import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { sendTemplateEmail } from '@/lib/email-templates/send-email'

const quoteSchema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(120).optional().default(''),
  mobile: z.string().trim().min(7).max(16).regex(/^[0-9+()\-\s]{7,16}$/),
  email: z.string().trim().email().max(255),
  product: z.string().trim().min(1).max(120),
  quantity: z.string().trim().max(50).optional().default(''),
  message: z.string().trim().min(1).max(1000),
})

const recent = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 60_000)
  hits.push(now)
  recent.set(ip, hits)
  return hits.length > 5
}

export const Route = createFileRoute('/api/quote')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get('cf-connecting-ip') ||
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
          'unknown'
        if (rateLimited(ip)) {
          return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 })
        }

        let parsed
        try {
          parsed = quoteSchema.parse(await request.json())
        } catch {
          return Response.json({ ok: false, error: 'invalid_input' }, { status: 400 })
        }

        const submittedAt = new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'short',
        })
        const submissionId = `${Date.now()}-${parsed.email.toLowerCase()}`
        const templateData = {
          name: parsed.name,
          company: parsed.company || '-',
          mobile: parsed.mobile,
          email: parsed.email,
          product: parsed.product,
          quantity: parsed.quantity || '-',
          message: parsed.message,
          submittedAt: `${submittedAt} IST`,
        }

        try {
          await sendTemplateEmail('quote-request', 'info@thelabels.in', {
            templateData,
            idempotencyKey: `quote-request-${submissionId}`,
            replyTo: parsed.email,
          })
        } catch (error) {
          console.error('quote notification failed', error)
          return Response.json({ ok: false, error: 'send_failed' }, { status: 502 })
        }

        try {
          await sendTemplateEmail('quote-acknowledgement', parsed.email, {
            templateData: { name: parsed.name, product: parsed.product },
            idempotencyKey: `quote-ack-${submissionId}`,
            replyTo: 'info@thelabels.in',
          })
        } catch (error) {
          console.error('quote acknowledgement failed', error)
        }

        return Response.json({ ok: true })
      },
    },
  },
})
