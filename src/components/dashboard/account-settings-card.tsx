import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { useOptimisticUserUpdate, USER_SESSION_QUERY_KEY } from '@/lib/use-user-session'
import { toast } from 'sonner'
import { User, Loader2 } from 'lucide-react'

interface AccountSettingsCardProps {
  user: {
    name: string
    email: string
  }
}

export function AccountSettingsCard({ user }: AccountSettingsCardProps) {
  const [name, setName] = useState(user.name)
  const queryClient = useQueryClient()
  const { updateUserOptimistically, revertUserUpdate } = useOptimisticUserUpdate()

  const updateProfileMutation = useMutation({
    mutationFn: async (newName: string) => {
      await authClient.updateUser({
        name: newName.trim(),
        fetchOptions: {
          onSuccess: () => {
            toast.success('Profile updated successfully')
          },
          onError: (error: unknown) => {
            console.error('Profile update error:', error)
            const errorMessage = error && typeof error === 'object' && 'error' in error && error.error && typeof error.error === 'object' && 'message' in error.error
              ? (error.error as { message: string }).message
              : 'Failed to update profile'
            toast.error(errorMessage)
          },
        },
      })
    },
    onMutate: async (newName: string) => {
      // Optimistically update the UI
      const previousSession = await updateUserOptimistically({ name: newName.trim() })
      return { previousSession }
    },
    onSuccess: () => {
      // Invalidate and refetch the user session query to ensure cache consistency
      queryClient.invalidateQueries({ queryKey: USER_SESSION_QUERY_KEY })
    },
    onError: (_error, _newName, context) => {
      // Revert the optimistic update on error
      if (context?.previousSession) {
        revertUserUpdate(context.previousSession)
      }
    },
  })

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (trimmedName === user.name) return

    updateProfileMutation.mutate(trimmedName)
  }

  const hasChanges = name.trim() !== user.name

  return (
    <Card className="unique-card">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5" />
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your display name"
              className="unique-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed. Contact support if needed.
            </p>
          </div>

          <Button
            type="submit"
            disabled={!hasChanges || updateProfileMutation.isPending}
            className="w-full"
          >
            {updateProfileMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Profile'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
