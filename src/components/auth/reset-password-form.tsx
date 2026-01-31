import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import { PasswordInput } from '@/components/ui/password-input'
import { Link, useNavigate } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

interface ResetPasswordFormProps {
  email: string
}

export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    otp?: string
    password?: string
    confirmPassword?: string
  }>({})

  const validate = () => {
    const newErrors: typeof errors = {}

    if (otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits'
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleReset = async () => {
    if (!validate()) return

    setLoading(true)
    try {
      await authClient.emailOtp.resetPassword({
        email,
        otp,
        password,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Password reset successfully!')
            navigate({ to: '/sign-in' })
          },
          onError: (error) => {
            console.error('Reset password error:', error)
            toast.error(error.error.message || 'Invalid or expired code')
          },
        },
      })
    } catch (error) {
      console.error('Reset password error:', error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    try {
      await authClient.forgetPassword.emailOtp({
        email,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Reset code sent!')
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
        <CardTitle className="text-lg">Reset your password</CardTitle>
        <CardDescription className="text-sm">
          Enter the code sent to{' '}
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <FieldLabel>Verification Code</FieldLabel>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value)
                  if (errors.otp) setErrors((e) => ({ ...e, otp: undefined }))
                }}
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
            {errors.otp && (
              <p className="text-sm text-destructive text-center h-4">
                {errors.otp}
              </p>
            )}
            {!errors.otp && <div className="h-4"></div>}
          </div>

          <Field data-invalid={!!errors.password}>
            <FieldLabel>New Password</FieldLabel>
            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password)
                  setErrors((e) => ({ ...e, password: undefined }))
              }}
              placeholder="Enter new password"
              autoComplete="new-password"
              disabled={loading}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-sm text-destructive mt-2 h-4 flex items-center">
                {errors.password}
              </p>
            )}
            {!errors.password && <div className="h-4"></div>}
          </Field>

          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel>Confirm New Password</FieldLabel>
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors.confirmPassword)
                  setErrors((e) => ({ ...e, confirmPassword: undefined }))
              }}
              placeholder="Confirm new password"
              autoComplete="new-password"
              disabled={loading}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive mt-2 h-4 flex items-center">
                {errors.confirmPassword}
              </p>
            )}
            {!errors.confirmPassword && <div className="h-4"></div>}
          </Field>
        </div>

        <div className="pt-2">
          <Button
            onClick={handleReset}
            className="w-full"
            loading={loading}
            loadingText="Resetting..."
            disabled={otp.length !== 6 || !password || !confirmPassword}
          >
            Reset Password
          </Button>

          <div className="text-center pt-4 space-y-2">
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
            <p className="text-sm text-muted-foreground">
              <Link
                to="/sign-in"
                className="text-primary hover:underline font-medium"
              >
                Back to sign in
              </Link>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
