import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { useInView } from '@/hooks/use-in-view'

export function CTA() {
  const { ref, hasBeenInView } = useInView()

  return (
    <section className="border-t bg-muted/30 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          className="unique-card relative overflow-hidden unique-radius-2xl px-6 py-16 sm:px-16 sm:py-24"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={hasBeenInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Background Elements */}
          <motion.div
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm text-primary-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              Ready to get started?
            </motion.div>

            <motion.h2
              className="unique-heading text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Start building your app today
            </motion.h2>

            <motion.p
              className="mt-6 text-lg text-primary-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Clone the repository, configure your environment variables, and
              you&apos;re ready to go. Full authentication in minutes, not
              hours.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
              <Link
                to="/sign-up"
                className={buttonVariants({
                  size: 'lg',
                  className: 'unique-btn gap-2 px-8',
                })}
              >
                  Create Account
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/sign-in"
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                    className:
                      'gap-2 border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 px-8 transition-all',
                  })}
                >
                  Sign In
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
