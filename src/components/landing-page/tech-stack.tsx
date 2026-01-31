import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { useInView } from '@/hooks/use-in-view'

const technologies = [
  {
    name: 'TanStack Start',
    description: 'Full-stack React framework with file-based routing',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
  {
    name: 'Better Auth',
    description: 'Modern, type-safe authentication library',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Prisma',
    description: 'Next-generation ORM for Node.js and TypeScript',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    name: 'TanStack Form',
    description: 'Powerful form state management with validation',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  },
  {
    name: 'Zod',
    description: 'TypeScript-first schema validation library',
    color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  },
  {
    name: 'React Email',
    description: 'Beautiful email templates with React components',
    color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  },
  {
    name: 'Resend',
    description: 'Modern email API for developers',
    color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  },
]

export function TechStack() {
  const { ref, hasBeenInView } = useInView()

  return (
    <section className="border-y bg-muted/30 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="unique-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Built with modern technologies
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A carefully selected stack for the best developer experience
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={hasBeenInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="unique-card group flex flex-col unique-radius p-6 transition-all hover:shadow-lg hover:shadow-primary/5 hover:scale-105"
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Badge className={`mb-4 w-fit ${tech.color} border-0`}>
                  {tech.name}
                </Badge>
              </motion.div>
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                {tech.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
