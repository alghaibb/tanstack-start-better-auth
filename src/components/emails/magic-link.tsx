import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface MagicLinkEmailProps {
  url: string
}

export function MagicLinkEmail({ url }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Sign in to your account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>Sign in to your account</Heading>
            <Text style={text}>
              Click the button below to sign in to your account. This link will
              expire in 5 minutes.
            </Text>
            <Section style={buttonContainer}>
              <Button style={button} href={url}>
                Sign in
              </Button>
            </Section>
            <Text style={text}>
              Or copy and paste this URL into your browser:
            </Text>
            <Text style={linkText}>{url}</Text>
            <Text style={footerText}>
              If you didn&apos;t request this link, you can safely ignore this
              email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
}

const section = {
  padding: '0 48px',
}

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#1a1a1a',
  textAlign: 'center' as const,
  margin: '30px 0',
}

const text = {
  fontSize: '16px',
  color: '#525f7f',
  textAlign: 'center' as const,
  margin: '16px 0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#0f172a',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const linkText = {
  fontSize: '14px',
  color: '#0066cc',
  textAlign: 'center' as const,
  margin: '16px 0',
  wordBreak: 'break-all' as const,
}

const footerText = {
  fontSize: '14px',
  color: '#8898aa',
  textAlign: 'center' as const,
  marginTop: '32px',
}

export default MagicLinkEmail
