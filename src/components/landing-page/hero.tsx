import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Github } from 'lucide-react'
import { motion } from 'motion/react'

const floatingAnimation = {
  y: [-10, 10, -10],
  rotate: [0, 5, 0, -5, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute right-1/4 top-1/2 h-48 w-48 rounded-full bg-secondary/20 blur-2xl"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
        />
        <motion.div
          className="absolute left-1/2 bottom-1/4 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 4 },
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]" />

      <motion.div
        className="mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:py-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge variant="outline" className="unique-badge mb-6 px-4 py-1.5">
              <motion.span
                className="mr-2"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 1.5, delay: 1.5 }}
              >
                🚀
              </motion.span>
              Production-Ready Auth Starter
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="unique-heading max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-8"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              TanStack Start +{' '}
            </motion.span>
            <motion.span
              className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Better Auth
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            A modern, type-safe authentication starter kit with email/password,
            magic links, OTP verification, and more. Built with TanStack Start,
            Better Auth, Prisma, and Tailwind CSS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/sign-up"
                className={buttonVariants({
                  size: 'lg',
                  className: 'unique-btn gap-2 px-8',
                })}
              >
                Get Started
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className: 'gap-2 px-8 hover:bg-accent/50 transition-colors',
                })}
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
