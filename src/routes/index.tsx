import { createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/navbar'
import {
  Hero,
  Features,
  TechStack,
  CodePreview,
  CTA,
  Footer,
} from '@/components/landing-page'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TechStack />
        <CodePreview />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
