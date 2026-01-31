import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Mail,
  KeyRound,
  Wand2,
  ShieldCheck,
  Smartphone,
  Lock,
  UserCheck,
  RefreshCw,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useInView } from '@/hooks/use-in-view'

const features = [
  {
    icon: Mail,
    title: 'Email & Password',
    description:
      'Traditional authentication with secure password hashing and email verification.',
  },
  {
    icon: Wand2,
    title: 'Magic Links',
    description:
      'Passwordless authentication with secure, time-limited magic links sent via email.',
  },
  {
    icon: Smartphone,
    title: 'OTP Verification',
    description:
      '6-digit one-time passwords for email verification and secure sign-in.',
  },
  {
    icon: RefreshCw,
    title: 'Password Reset',
    description:
      'Secure password reset flow with OTP verification and email notifications.',
  },
  {
    icon: ShieldCheck,
    title: 'Email Verification',
    description:
      'Ensure users verify their email before accessing protected resources.',
  },
  {
    icon: Lock,
    title: 'Secure Sessions',
    description:
      'HTTP-only cookies with automatic refresh and secure session management.',
  },
  {
    icon: UserCheck,
    title: 'Protected Routes',
    description:
      'Built-in route guards and middleware for protecting authenticated routes.',
  },
  {
    icon: KeyRound,
    title: 'Type-Safe APIs',
    description:
      'Full TypeScript support with inferred types for all auth operations.',
  },
]

const iconHoverAnimation = {
  rotate: [0, -10, 10, -10, 0],
  scale: [1, 1.1, 1],
  transition: { duration: 0.5 },
}

export function Features() {
  const { ref, hasBeenInView } = useInView()

  return (
    <section className="py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="unique-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for authentication
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete auth solution with all the features you&apos;d expect,
            and more.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={hasBeenInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{
                duration: 0.6,
                delay: hasBeenInView ? index * 0.15 + 0.3 : 0,
                ease: "easeOut" as const,
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="unique-card group relative h-full unique-radius-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:scale-105">
                <motion.div
                  className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <CardHeader className="relative">
                  <motion.div
                    className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20"
                    whileHover={iconHoverAnimation}
                  >
                    <feature.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary/80" />
                  </motion.div>
                  <CardTitle className="text-lg transition-colors group-hover:text-primary">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-sm text-muted-foreground transition-colors group-hover:text-muted-foreground/80">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
