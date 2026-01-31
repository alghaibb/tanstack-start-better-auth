import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP, magicLink } from 'better-auth/plugins'
import { prisma } from '@/db'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { sendEmail } from '@/lib/email'
import { render } from '@react-email/render'
import VerificationOTPEmail from '@/components/emails/verification-otp'
import ForgotPasswordEmail from '@/components/emails/forgot-password'
import MagicLinkEmail from '@/components/emails/magic-link'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  plugins: [
    tanstackStartCookies(),
    emailOTP({
      otpLength: 6,
      expiresIn: 300, // 5 minutes
      sendVerificationOnSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        const subject =
          type === 'sign-in'
            ? 'Sign in to your account'
            : type === 'email-verification'
              ? 'Verify your email address'
              : 'Reset your password'

        const html =
          type === 'forget-password'
            ? await render(ForgotPasswordEmail({ otp }))
            : await render(VerificationOTPEmail({ otp, type }))

        await sendEmail({
          to: email,
          subject,
          html,
        })
      },
    }),
    magicLink({
      expiresIn: 300, // 5 minutes
      async sendMagicLink({ email, url }) {
        const html = await render(MagicLinkEmail({ url }))

        await sendEmail({
          to: email,
          subject: 'Sign in to your account',
          html,
        })
      },
    }),
  ],
})
