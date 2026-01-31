import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface ForgotPasswordEmailProps {
  otp: string
}

export function ForgotPasswordEmail({ otp }: ForgotPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>Reset your password</Heading>
            <Text style={text}>
              We received a request to reset your password. Use the code below to complete the process:
            </Text>
            <Section style={otpContainer}>
              <Text style={otpText}>{otp}</Text>
            </Section>
            <Text style={text}>
              This code will expire in 5 minutes.
            </Text>
            <Text style={warningText}>
              If you didn&apos;t request a password reset, please ignore this email or contact support if you have concerns.
            </Text>
            <Text style={footerText}>
              For security reasons, never share this code with anyone.
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

const otpContainer = {
  backgroundColor: '#f4f4f5',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
}

const otpText = {
  fontSize: '32px',
  fontWeight: '700',
  letterSpacing: '8px',
  color: '#1a1a1a',
  textAlign: 'center' as const,
  margin: '0',
}

const warningText = {
  fontSize: '14px',
  color: '#ef4444',
  textAlign: 'center' as const,
  margin: '16px 0',
}

const footerText = {
  fontSize: '14px',
  color: '#8898aa',
  textAlign: 'center' as const,
  marginTop: '32px',
}

export default ForgotPasswordEmail
