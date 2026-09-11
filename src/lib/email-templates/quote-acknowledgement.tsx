import * as React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

export interface QuoteAcknowledgementProps {
  name?: string
  product?: string
}

export function QuoteAcknowledgementEmail({ name = 'there', product }: QuoteAcknowledgementProps) {
  return (
    <Html>
      <Head />
      <Preview>We have received your quote request – The Labels</Preview>
      <Body style={{ backgroundColor: '#f4f7fb', fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, padding: '24px' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '28px', maxWidth: '600px' }}>
          <Heading style={{ fontSize: '20px', color: '#0b1a33', margin: '0 0 16px' }}>Thank you for contacting The Labels</Heading>
          <Text style={{ fontSize: '15px', color: '#28313f', lineHeight: '24px' }}>
            Hello {name},
          </Text>
          <Text style={{ fontSize: '15px', color: '#28313f', lineHeight: '24px' }}>
            We have received your quote request{product ? ` for ${product}` : ''} and our team will review your requirement and get back to you shortly.
          </Text>
          <Text style={{ fontSize: '15px', color: '#28313f', lineHeight: '24px' }}>
            For urgent assistance: <strong>+91 97256 62466</strong>
          </Text>
          <Hr />
          <Text style={{ fontSize: '14px', color: '#0b1a33', margin: '16px 0 0', fontWeight: 700 }}>The Labels</Text>
          <Text style={{ fontSize: '12px', color: '#2563eb', margin: '2px 0 0', letterSpacing: '0.08em' }}>STICK. IDENTIFY. ORGANIZE.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: QuoteAcknowledgementEmail,
  subject: 'Your Quote Request – The Labels',
  displayName: 'Quote request acknowledgement (customer)',
  previewData: { name: 'Rahul', product: 'Printed Barcode Labels' },
} satisfies TemplateEntry
