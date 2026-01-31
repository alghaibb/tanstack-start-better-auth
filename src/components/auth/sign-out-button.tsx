import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export function SignOutButton({ children = 'Sign Out', ...props }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out successfully!')
            navigate({ to: '/' })
          },
          onError: (error) => {
            toast.error(error.error.message || 'Failed to sign out')
          }
        }
      })
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSignOut}
      loading={loading}
      loadingText="Signing out..."
      {...props}
    >
      {children}
    </Button>
  )
}