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

interface VerificationOTPEmailProps {
  otp: string
  type: 'sign-in' | 'email-verification' | 'forget-password'
}

export function VerificationOTPEmail({ otp, type }: VerificationOTPEmailProps) {
  const getTitle = () => {
    switch (type) {
      case 'sign-in':
        return 'Sign in to your account'
      case 'email-verification':
        return 'Verify your email address'
      case 'forget-password':
        return 'Reset your password'
      default:
        return 'Your verification code'
    }
  }

  const getMessage = () => {
    switch (type) {
      case 'sign-in':
        return 'Use the following code to sign in to your account:'
      case 'email-verification':
        return 'Use the following code to verify your email address:'
      case 'forget-password':
        return 'Use the following code to reset your password:'
      default:
        return 'Your verification code is:'
    }
  }

  return (
    <Html>
      <Head />
      <Preview>{getTitle()}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>{getTitle()}</Heading>
            <Text style={text}>{getMessage()}</Text>
            <Section style={otpContainer}>
              <Text style={otpText}>{otp}</Text>
            </Section>
            <Text style={text}>
              This code will expire in 5 minutes.
            </Text>
            <Text style={footerText}>
              If you didn&apos;t request this code, you can safely ignore this email.
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

const footerText = {
  fontSize: '14px',
  color: '#8898aa',
  textAlign: 'center' as const,
  marginTop: '32px',
}

export default VerificationOTPEmail
