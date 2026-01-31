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
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form-start'
import { magicLinkSchema } from '@/schemas/auth.schema'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { Mail } from 'lucide-react'

export function MagicLinkForm() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: magicLinkSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      try {
        await authClient.signIn.magicLink({
          email: value.email,
          callbackURL: '/dashboard',
          fetchOptions: {
            onSuccess: () => {
              setEmail(value.email)
              setSent(true)
              toast.success('Magic link sent! Check your email.')
            },
            onError: (error) => {
              console.error('Magic link error:', error)
              toast.error(error.error.message || 'Something went wrong')
            },
          },
        })
      } catch (error) {
        console.error('Magic link error:', error)
        toast.error('Something went wrong')
      } finally {
        setLoading(false)
      }
    },
  })

  if (sent) {
    return (
      <Card className="max-w-md w-full">
        <CardHeader className="pb-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">Check your email</CardTitle>
          <CardDescription className="text-sm">
            We sent a magic link to{' '}
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Click the link in the email to sign in. The link will expire in 5
            minutes.
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSent(false)
                setEmail('')
                form.reset()
              }}
            >
              Use a different email
            </Button>
            <div className="text-center pt-4">
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

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Sign in with magic link</CardTitle>
        <CardDescription className="text-sm">
          Enter your email and we&apos;ll send you a link to sign in
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
              <Mail className="mr-2 h-4 w-4" />
              Send Magic Link
            </Button>
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Prefer a password?{' '}
                <Link
                  to="/sign-in"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in with password
                </Link>
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
