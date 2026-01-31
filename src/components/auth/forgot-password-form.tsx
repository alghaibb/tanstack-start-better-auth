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
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form-start'
import { forgotPasswordSchema } from '@/schemas/auth.schema'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export function ForgotPasswordForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      try {
        await authClient.forgetPassword.emailOtp({
          email: value.email,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Reset code sent! Check your email.')
              navigate({
                to: '/reset-password',
                search: { email: value.email },
              })
            },
            onError: (error) => {
              console.error('Forgot password error:', error)
              toast.error(error.error.message || 'Something went wrong')
            },
          },
        })
      } catch (error) {
        console.error('Forgot password error:', error)
        toast.error('Something went wrong')
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Forgot your password?</CardTitle>
        <CardDescription className="text-sm">
          Enter your email and we&apos;ll send you a reset code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    aria-invalid={isInvalid}
                    placeholder="m@example.com"
                    autoComplete="email"
                    disabled={loading}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive mt-2 h-4 flex items-center">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                  {field.state.meta.errors.length === 0 && (
                    <div className="h-4"></div>
                  )}
                </Field>
              )
            }}
          />

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              loadingText="Sending..."
            >
              Send Reset Code
            </Button>
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link
                  to="/sign-in"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
