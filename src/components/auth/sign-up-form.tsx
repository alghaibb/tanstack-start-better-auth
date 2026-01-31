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
import { PasswordInput } from '@/components/ui/password-input'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form-start'
import { signupSchema } from '@/schemas/auth.schema'
import { authClient } from '@/lib/auth-client'
import { toast } from "sonner"

export function SignupForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      try {
        await authClient.signUp.email({
          email: value.email,
          name: value.fullName,
          password: value.password,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Account created! Please check your email for verification.')
              navigate({ to: '/verify-email', search: { email: value.email } })
            },
            onError: (error) => {
              console.error('Sign up error:', error)
              toast.error(error.error.message || 'Something went wrong')
            },
          },
        })
      } catch (error) {
        console.error('Sign up error:', error)
        toast.error('Something went wrong')
      } finally {
        setLoading(false)
      }
    },
  })
  return (
    <Card className="max-w-md w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Sign up for an account</CardTitle>
        <CardDescription className="text-sm">
          Enter your information below to sign up for an account
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
            {/* <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" required />
            </Field> */}
            <form.Field
              name="fullName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="John Doe"
                      autoComplete="off"
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
                      autoComplete="off"
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
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <PasswordInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your password"
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
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
              name="confirmPassword"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <PasswordInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Confirm your password"
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
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
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full"
                loading={loading}
                loadingText="Creating account..."
              >
                Sign up
              </Button>
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
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
