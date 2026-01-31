import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const signupSchema = z
  .object({
    fullName: z.string().min(5, { message: 'Full name is required' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupSchema = z.infer<typeof signupSchema>

export const verifyEmailSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  otp: z
    .string()
    .length(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
})

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>

export const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
  .object({
    email: z.email({ message: 'Invalid email address' }),
    otp: z
      .string()
      .length(6, { message: 'OTP must be 6 digits' })
      .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export const magicLinkSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
})

export type MagicLinkSchema = z.infer<typeof magicLinkSchema>
