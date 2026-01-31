import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { SignOutButton } from '@/components/auth/sign-out-button'

interface DesktopNavProps {
  session: { user: { name: string; email: string } } | null
  isPending: boolean
}

export function DesktopNav({ session, isPending }: DesktopNavProps) {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <ThemeToggle />
      {isPending ? (
        <div className="w-20 h-9 animate-pulse bg-muted rounded-md" />
      ) : session ? (
        <>
          <Link
            to="/dashboard"
            className={buttonVariants({ variant: 'outline' })}
          >
            Dashboard
          </Link>
          <SignOutButton />
        </>
      ) : (
        <>
          <Link
            to="/sign-in"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Sign In
          </Link>
          <Link to="/sign-up" className={buttonVariants()}>
            Get Started
          </Link>
        </>
      )}
    </div>
  )
}
