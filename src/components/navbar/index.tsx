import { Link } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { OptimizedImage } from '@/components/ui/image'
import { DesktopNav } from './desktop-nav'
import { MobileNav } from './mobile-nav'
import { motion } from 'motion/react'

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession()

  return (
    <nav className="unique-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-4">
        {/* Logo and brand */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <OptimizedImage
                src="/tanstack-circle-logo.png"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
            </motion.div>
          </Link>
          <motion.h1
            className="text-lg sm:text-2xl font-bold truncate"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            TanStack Start Better Auth
          </motion.h1>
        </motion.div>

        {/* Desktop navigation */}
        <DesktopNav session={session} isPending={isPending} />

        {/* Mobile navigation */}
        <MobileNav session={session} isPending={isPending} />
      </div>
    </nav>
  )
}
