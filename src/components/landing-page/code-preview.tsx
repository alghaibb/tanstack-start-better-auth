import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { useInView } from '@/hooks/use-in-view'

const codeExamples = [
  {
    title: 'Sign In',
    language: 'typescript',
    code: `// Sign in with email/password
await authClient.signIn.email({
  email: "user@example.com",
  password: "securepassword",
})

// Sign in with magic link
await authClient.signIn.magicLink({
  email: "user@example.com",
  callbackURL: "/dashboard",
})`,
  },
  {
    title: 'Sign Up',
    language: 'typescript',
    code: `// Create a new account
await authClient.signUp.email({
  email: "user@example.com",
  password: "securepassword",
  name: "John Doe",
})

// User receives OTP for verification`,
  },
  {
    title: 'Protected Routes',
    language: 'typescript',
    code: `// TanStack Router guard
export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ context }) => {
    const session = await context.auth.getSession()
    if (!session) {
      throw redirect({ to: '/sign-in' })
    }
  },
})`,
  },
]

export function CodePreview() {
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
            Simple, intuitive API
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Clean, type-safe code that&apos;s easy to understand and extend
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 lg:grid-cols-3"
          initial="hidden"
          animate={hasBeenInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {codeExamples.map((example, index) => (
            <motion.div
              key={example.title}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="unique-card overflow-hidden bg-slate-950 dark:bg-slate-900 unique-radius-lg transition-all hover:scale-105">
                <motion.div
                  className="flex items-center justify-between border-b border-slate-800 px-4 py-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-slate-800 text-slate-300"
                  >
                    {example.title}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    {example.language}
                  </span>
                </motion.div>
                <motion.pre
                  className="overflow-x-auto p-4"
                  initial={{ opacity: 0 }}
                  animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                >
                  <code className="text-sm text-slate-300">{example.code}</code>
                </motion.pre>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
