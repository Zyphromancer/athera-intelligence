import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  company?: string
  date?: string
  time?: string
  timezone?: string
  topic?: string
}

const BookCallNotificationEmail = ({
  name = 'Unknown',
  email = 'unknown@unknown',
  company,
  date,
  time,
  timezone,
  topic,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New discovery call request from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New discovery call request</Heading>
        <Text style={label}>From</Text>
        <Text style={value}>{name} &lt;{email}&gt;</Text>
        {company ? (
          <>
            <Text style={label}>Company</Text>
            <Text style={value}>{company}</Text>
          </>
        ) : null}
        <Hr style={hr} />
        <Text style={label}>Preferred slot</Text>
        <Text style={value}>
          {date || 'No date'} {time ? `at ${time}` : ''} {timezone ? `(${timezone})` : ''}
        </Text>
        {topic ? (
          <>
            <Hr style={hr} />
            <Text style={label}>Topic</Text>
            <Text style={{ ...value, whiteSpace: 'pre-wrap' }}>{topic}</Text>
          </>
        ) : null}
        <Hr style={hr} />
        <Text style={footer}>Athera Intelligence</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: BookCallNotificationEmail,
  subject: (data: Record<string, any>) =>
    `Call request — ${data.name ?? 'Unknown'}${data.date ? ` (${data.date}${data.time ? ' ' + data.time : ''})` : ''}`,
  displayName: 'Book a call notification',
  to: 'contact@athera-intelligence.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Example Ltd',
    date: '2026-08-01',
    time: '14:00',
    timezone: 'CET',
    topic: 'Discovery call about rebuilding our fintech dashboard.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#000000', margin: '0 0 20px' }
const label = { fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#8a8a8a', margin: '16px 0 4px' }
const value = { fontSize: '14px', color: '#111111', lineHeight: '1.5', margin: '0' }
const hr = { borderColor: '#eeeeee', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#8a8a8a', margin: '20px 0 0' }