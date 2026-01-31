export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TanStack Start Better Auth. All
            rights reserved.
          </p>
      </div>
    </footer>
  )
}
