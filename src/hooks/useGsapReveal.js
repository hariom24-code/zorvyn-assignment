import { useLayoutEffect } from 'react'
import gsap from 'gsap'

export const useGsapReveal = (scopeRef, selector = '.reveal-item', delay = 0) => {
  useLayoutEffect(() => {
    if (!scopeRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          delay,
          ease: 'power2.out'
        }
      )
    }, scopeRef)

    return () => ctx.revert()
  }, [scopeRef, selector, delay])
}
