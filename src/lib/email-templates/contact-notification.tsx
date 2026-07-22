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
  message?: string
}

const ContactNotificationEmail = ({
  name = 'Unknown',
  email = 'unknown@unknown',
  company,
  message = '(no message)',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New project enquiry from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New project enquiry</Heading>
        <Text style={label}>From</Text>
        <Text style={value}>{name} &lt;{email}&gt;</Text>
        {company ? (
          <>
            <Text style={label}>Company</Text>
            <Text style={value}>{company}</Text>
          </>
        ) : null}
        <Hr style={hr} />
        <Text style={label}>Project brief</Text>
        <Text style={{ ...value, whiteSpace: 'pre-wrap' }}>{message}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New enquiry — ${data.name ?? 'Unknown'}${data.company ? ` (${data.company})` : ''}`,
  displayName: 'Contact form notification',
  to: 'contact@athera-intelligence.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Example Ltd',
    message: 'We need a marketing site and product dashboard rebuild.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#000000', margin: '0 0 20px' }
const label = { fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#8a8a8a', margin: '16px 0 4px' }
const value = { fontSize: '14px', color: '#111111', lineHeight: '1.5', margin: '0' }
const hr = { borderColor: '#eeeeee', margin: '20px 0' }