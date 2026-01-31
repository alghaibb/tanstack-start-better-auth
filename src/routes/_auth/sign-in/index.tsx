import { SignInForm } from '@/components/auth/sign-in-form'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { useEffect } from 'react'
import { toast } from 'sonner'

const searchParamsSchema = z.object({
  error: z.string().optional(),
})

export const Route = createFileRoute('/_auth/sign-in/')({
  validateSearch: searchParamsSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { error } = Route.useSearch()

  useEffect(() => {
    if (error) {
      toast.error(decodeURIComponent(error))
    }
  }, [error])

  return <SignInForm />
}
