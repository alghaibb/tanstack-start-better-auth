import { Link } from '@tanstack/react-router'
import { Button, buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { SignOutButton } from '@/components/auth/sign-out-button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

interface MobileNavProps {
  session: { user: { name: string; email: string } } | null
  isPending: boolean
}

export function MobileNav({ session, isPending }: MobileNavProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger
          render={<Button variant="ghost" size="icon" aria-label="Open menu" />}
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>

        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-4 p-6">
            {isPending ? (
              <div className="space-y-3">
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
              </div>
            ) : session ? (
              <>
                <SheetClose
                  render={
                    <Link
                      to="/dashboard"
                      className={buttonVariants({
                        variant: 'outline',
                        className: 'w-full justify-center',
                      })}
                    />
                  }
                >
                  Dashboard
                </SheetClose>
                <SignOutButton />
              </>
            ) : (
              <>
                <SheetClose
                  render={
                    <Link
                      to="/sign-in"
                      className={buttonVariants({
                        variant: 'secondary',
                        className: 'w-full justify-center',
                      })}
                    />
                  }
                >
                  Sign In
                </SheetClose>
                <SheetClose
                  render={
                    <Link
                      to="/sign-up"
                      className={buttonVariants({
                        className: 'w-full justify-center',
                      })}
                    />
                  }
                >
                  Get Started
                </SheetClose>
              </>
            )}

            <div className="flex items-center justify-between border-t pt-4 mt-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
