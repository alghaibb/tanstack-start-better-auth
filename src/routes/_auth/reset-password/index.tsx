import { createFileRoute, redirect } from '@tanstack/react-router'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'
import { z } from 'zod'

const searchParamsSchema = z.object({
  email: z.string().email().catch(''),
})

export const Route = createFileRoute('/_auth/reset-password/')({
  validateSearch: searchParamsSchema,
  beforeLoad: ({ search }) => {
    if (!search.email) {
      throw redirect({ to: '/forgot-password' })
    }
  },
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const { email } = Route.useSearch()

  return <ResetPasswordForm email={email} />
}
