import { createFileRoute, redirect } from '@tanstack/react-router'
import { VerifyEmailForm } from '@/components/auth/verify-email-form'
import { z } from 'zod'

const searchParamsSchema = z.object({
  email: z.string().email().catch(''),
})

export const Route = createFileRoute('/_auth/verify-email/')({
  validateSearch: searchParamsSchema,
  beforeLoad: ({ search }) => {
    if (!search.email) {
      throw redirect({ to: '/sign-up' })
    }
  },
  component: VerifyEmailPage,
})

function VerifyEmailPage() {
  const { email } = Route.useSearch()

  return <VerifyEmailForm email={email} />
}
