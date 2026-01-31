import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import { useNavigate } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

interface VerifyEmailFormProps {
  email: string
}

export function VerifyEmailForm({ email }: VerifyEmailFormProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [otp, setOtp] = useState('')

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit code')
      return
    }

    setLoading(true)
    try {
      await authClient.emailOtp.verifyEmail({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Email verified successfully!')
            navigate({ to: '/sign-in' })
          },
          onError: (error) => {
            console.error('Verify email error:', error)
            toast.error(error.error.message || 'Invalid or expired code')
          },
        },
      })
    } catch (error) {
      console.error('Verify email error:', error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'email-verification',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Verification code sent!')
          },
          onError: (error) => {
            console.error('Resend OTP error:', error)
            toast.error(error.error.message || 'Failed to resend code')
          },
        },
      })
    } catch (error) {
      console.error('Resend OTP error:', error)
      toast.error('Something went wrong')
    } finally {
      setResending(false)
    }
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-lg">Verify your email</CardTitle>
        <CardDescription className="text-sm">
          We sent a verification code to{' '}
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            disabled={loading}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleVerify}
          className="w-full"
          loading={loading}
          loadingText="Verifying..."
          disabled={otp.length !== 6}
        >
          Verify Email
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-primary hover:underline font-medium disabled:opacity-50"
            >
              {resending ? 'Sending...' : 'Resend'}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
