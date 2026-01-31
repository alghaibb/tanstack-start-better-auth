import { createFileRoute } from '@tanstack/react-router'
import { MagicLinkForm } from '@/components/auth/magic-link-form'

export const Route = createFileRoute('/_auth/magic-link/')({
  component: MagicLinkPage,
})

function MagicLinkPage() {
  return <MagicLinkForm />
}
