import { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useUserSession } from '@/lib/use-user-session'
import Navbar from '@/components/navbar'
import {
  WelcomeHeader,
  ProfileCard,
  ProfileCardSkeleton,
  QuickActionsCard,
  QuickActionsCardSkeleton,
  AccountSettingsCard,
  AccountSettingsCardSkeleton,
} from '@/components/dashboard'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const navigate = useNavigate()
  const { data: session, isPending } = useUserSession()

  // Client-side redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      navigate({ to: '/sign-in' })
    }
  }, [session, isPending, navigate])

  // Show loading while checking auth
  if (isPending) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8">
          <div className="space-y-8">
            <WelcomeHeader name="there" />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <ProfileCardSkeleton />
              <QuickActionsCardSkeleton />
              <AccountSettingsCardSkeleton />
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Redirect will happen, show nothing
  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-8">
          <WelcomeHeader name={session.user.name} />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <ProfileCard
              user={{
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                emailVerified: session.user.emailVerified,
                image: session.user.image,
                createdAt: new Date(session.user.createdAt),
              }}
            />
            <QuickActionsCard
              email={session.user.email}
              emailVerified={session.user.emailVerified}
            />
            <AccountSettingsCard
              user={{
                name: session.user.name,
                email: session.user.email,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
