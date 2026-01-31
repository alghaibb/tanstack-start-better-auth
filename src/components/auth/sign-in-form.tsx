import { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form-start'
import { loginSchema } from '@/schemas/auth.schema'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export function SignInForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      try {
        await authClient.signIn.email({
          email: value.email,
          password: value.password,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Signed in successfully!')
              navigate({ to: '/' })
            },
            onError: (error) => {
              console.error('Sign in error:', error)
              toast.error(error.error.message || 'Something went wrong')
            },
          },
        })
      } catch (error) {
        console.error('Sign in error:', error)
        toast.error('Something went wrong')
      } finally {
        setLoading(false)
      }
    },
  })
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account
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
          <div className="space-y-4">
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
                      placeholder="m@example.com"
                      aria-invalid={isInvalid}
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
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-muted-foreground"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <PasswordInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your password"
                      aria-invalid={isInvalid}
                      autoComplete="current-password"
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
          </div>
          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              loadingText="Signing in..."
            >
              Sign in
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Link
              to="/magic-link"
              className={buttonVariants({ variant: 'outline', className: 'w-full' })}
            >
              Sign in with magic link
            </Link>

            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  to="/sign-up"
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
