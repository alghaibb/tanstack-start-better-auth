import { useEffect, useRef, useState } from 'react'

export function useInView(options: IntersectionObserverInit = {}) {
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)
        if (inView && !hasBeenInView) {
          setHasBeenInView(true)
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options, hasBeenInView])

  return { ref, isInView, hasBeenInView }
}