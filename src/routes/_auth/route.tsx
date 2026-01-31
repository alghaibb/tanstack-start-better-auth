import { buttonVariants } from '@/components/ui/button'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="min-h-screen relative">
      <div className="absolute top-6 right-8">
        <Link to="/" className={buttonVariants({ variant: 'secondary' })}>
          <ArrowLeft className="size-4 mr-2" />
          Back to Home
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Outlet />
      </div>
    </main>
  )
}
