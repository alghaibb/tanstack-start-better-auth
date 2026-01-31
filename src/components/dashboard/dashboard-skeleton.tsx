import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Welcome header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Profile card skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProfileCardSkeleton />
      </div>
    </div>
  )
}

export function ProfileCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-16" />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar and name */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* User details */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          ))}
        </div>

        {/* Verification status */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function QuickActionsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-28" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-9 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}

export function AccountSettingsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-9 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}
