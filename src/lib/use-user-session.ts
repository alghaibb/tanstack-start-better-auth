import { useQuery, useQueryClient } from '@tanstack/react-query'
import { authClient } from './auth-client'

export const USER_SESSION_QUERY_KEY = ['user-session']

export function useUserSession() {
  return useQuery({
    queryKey: USER_SESSION_QUERY_KEY,
    queryFn: async () => {
      const session = await authClient.getSession()
      return session.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useOptimisticUserUpdate() {
  const queryClient = useQueryClient()

  const updateUserOptimistically = async (updates: { name?: string }) => {
    // Cancel any outgoing refetches
    await queryClient.cancelQueries({ queryKey: USER_SESSION_QUERY_KEY })

    // Snapshot the previous value
    const previousSession = queryClient.getQueryData(USER_SESSION_QUERY_KEY)

    // Optimistically update the cache
    queryClient.setQueryData(USER_SESSION_QUERY_KEY, (old: any) => {
      if (!old) return old
      return {
        ...old,
        user: {
          ...old.user,
          ...updates,
        },
      }
    })

    return previousSession
  }

  const revertUserUpdate = (previousSession: any) => {
    queryClient.setQueryData(USER_SESSION_QUERY_KEY, previousSession)
  }

  return { updateUserOptimistically, revertUserUpdate }
}