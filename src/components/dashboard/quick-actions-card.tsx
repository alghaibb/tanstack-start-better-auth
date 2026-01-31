import { KeyRound, Loader2, LogOut, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { authClient } from '@/lib/auth-client'

interface QuickActionsCardProps {
  email: string
  emailVerified: boolean
}

interface AuthError {
  error: {
    message: string
  }
}

export function QuickActionsCard({ email, emailVerified }: QuickActionsCardProps) {
  const [sendingPasswordReset, setSendingPasswordReset] = useState(false)
  const [sendingVerification, setSendingVerification] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const resetForm = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }

    setSendingPasswordReset(true)
    try {
      await authClient.changePassword({
        currentPassword,
        newPassword,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Password changed successfully')
            setChangePasswordOpen(false)
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
          },
          onError: (error: AuthError) => {
            console.error('Password change error:', error)
            toast.error(error.error.message || 'Failed to change password')
          },
        },
      })
    } catch (error) {
      console.error('Password change error:', error)
      toast.error('Something went wrong')
    } finally {
      setSendingPasswordReset(false)
    }
  }

  const handleResendVerification = async () => {
    setSendingVerification(true)
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'email-verification',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Verification code sent to your email')
          },
          onError: (error: AuthError) => {
            console.error('Verification error:', error)
            toast.error(error.error.message || 'Failed to send verification code')
          },
        },
      })
    } catch (error) {
      console.error('Verification error:', error)
      toast.error('Something went wrong')
    } finally {
      setSendingVerification(false)
    }
  }

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out successfully')
            window.location.href = '/'
          },
          onError: (error: AuthError) => {
            console.error('Sign out error:', error)
            toast.error(error.error.message || 'Failed to sign out')
          },
        },
      })
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Something went wrong')
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Change Password Dialog */}
        <Dialog
          open={changePasswordOpen}
          onOpenChange={(open) => {
            setChangePasswordOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger className="w-full">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <KeyRound className="h-4 w-4" />
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new one.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <PasswordInput
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <PasswordInput
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <PasswordInput
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <DialogClose>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={sendingPasswordReset}
                  className="flex-1"
                >
                  {sendingPasswordReset ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Changing...
                    </>
                  ) : (
                    'Change Password'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Verify Email (only show if not verified) */}
        {!emailVerified && (
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={handleResendVerification}
            disabled={sendingVerification}
          >
            {sendingVerification ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
            {sendingVerification ? 'Sending...' : 'Verify Email'}
          </Button>
        )}

        {/* Verified badge (show if verified) */}
        {emailVerified && (
          <div className="flex items-center gap-3 px-4 py-2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm font-medium">Email Verified</span>
          </div>
        )}

        {/* Sign Out */}
        <Button
          variant="outline"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
          disabled={signingOut}
        >
          {signingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          {signingOut ? 'Signing out...' : 'Sign Out'}
        </Button>
      </CardContent>
    </Card>
  )
}
