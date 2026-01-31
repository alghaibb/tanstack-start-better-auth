import { Resend } from 'resend'
import { env } from '@/env'

export const resend = new Resend(env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export const sendEmail = async (options: EmailOptions) => {
  const { to, subject, html } = options
  const { data, error } = await resend.emails.send({
    from: 'noreply@codewithmj.com',
    to,
    subject,
    html,
  })
  if (error) {
    throw new Error(error.message)
  }
  return data
}

