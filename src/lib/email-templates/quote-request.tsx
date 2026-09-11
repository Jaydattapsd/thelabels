import * as React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

export interface QuoteRequestProps {
  name?: string
  company?: string
  mobile?: string
  email?: string
  product?: string
  quantity?: string
  message?: string
  submittedAt?: string
}

const label: React.CSSProperties = { fontSize: '13px', color: '#5b6472', margin: '0 0 2px' }
const value: React.CSSProperties = { fontSize: '15px', color: '#0b1a33', margin: '0 0 14px', fontWeight: 600 }

function Row({ title, text }: { title: string; text: string }) {
  return (
    <Section>
      <Text style={label}>{title}</Text>
      <Text style={value}>{text}</Text>
    </Section>
  )
}

export function QuoteRequestEmail({
  name = '-',
  company = '-',
  mobile = '-',
  email = '-',
  product = '-',
  quantity = '-',
  message = '-',
  submittedAt = '-',
}: QuoteRequestProps) {
  return (
    <Html>
      <Head />
      <Preview>New quote request from {name}</Preview>
      <Body style={{ backgroundColor: '#f4f7fb', fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, padding: '24px' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '28px', maxWidth: '600px' }}>
          <Heading style={{ fontSize: '20px', color: '#0b1a33', margin: '0 0 6px' }}>NEW QUOTE REQUEST</Heading>
          <Text style={{ fontSize: '13px', color: '#2563eb', margin: '0 0 18px' }}>The Labels — Stick. Identify. Organize.</Text>
          <Hr />
          <Heading as="h2" style={{ fontSize: '15px', color: '#0b1a33', margin: '18px 0 12px' }}>Customer Details</Heading>
          <Row title="Name" text={name} />
          <Row title="Company" text={company} />
          <Row title="Mobile" text={mobile} />
          <Row title="Email" text={email} />
          <Hr />
          <Heading as="h2" style={{ fontSize: '15px', color: '#0b1a33', margin: '18px 0 12px' }}>Requirement</Heading>
          <Row title="Product / Service" text={product} />
          <Row title="Quantity" text={quantity} />
          <Row title="Message" text={message} />
          <Hr />
          <Row title="Submitted (Date & Time)" text={submittedAt} />
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: QuoteRequestEmail,
  subject: 'New Quote Request – The Labels',
  displayName: 'Quote request (business notification)',
  to: 'info@thelabels.in',
  previewData: {
    name: 'Rahul Sharma',
    company: 'Sharma Enterprises',
    mobile: '+91 98765 43210',
    email: 'rahul@example.com',
    product: 'Printed Barcode Labels',
    quantity: '10,000',
    message: 'Need 50mm x 25mm printed barcode labels on white polyester.',
    submittedAt: '12 September 2026, 3:20 AM IST',
  },
} satisfies TemplateEntry
