import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react'

interface ProfileCardProps {
  user: {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date
  }
}

export function ProfileCard({ user }: ProfileCardProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar and name */}
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
              {initials}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">Member</p>
          </div>
        </div>

        {/* User details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Joined</p>
              <p className="text-sm font-medium">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-medium font-mono text-xs">
                {user.id}
              </p>
            </div>
          </div>
        </div>

        {/* Verification status */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Email verification
            </span>
            {user.emailVerified ? (
              <Badge className="gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0">
                <CheckCircle className="h-3 w-3" />
                Verified
              </Badge>
            ) : (
              <Badge className="gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">
                <XCircle className="h-3 w-3" />
                Not verified
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
