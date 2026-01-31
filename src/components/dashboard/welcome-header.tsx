interface WelcomeHeaderProps {
  name: string
}

export function WelcomeHeader({ name }: WelcomeHeaderProps) {
  const firstName = name.split(' ')[0]
  const hour = new Date().getHours()

  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {greeting}, {firstName}
      </h1>
      <p className="text-muted-foreground">
        Welcome to your dashboard. Here&apos;s an overview of your account.
      </p>
    </div>
  )
}
