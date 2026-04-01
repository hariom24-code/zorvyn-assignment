import { useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import DashboardPage from './pages/DashboardPage'

const sectionIds = ['overview', 'transactions', 'insights']

function App() {
  const [activeSection, setActiveSection] = useState('overview')

  useLayoutEffect(() => {
    gsap.fromTo(
      '.reveal-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold: [0.35, 0.6],
        rootMargin: '-10% 0px -45% 0px'
      }
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const handleNavigate = (target) => {
    const section = document.getElementById(target)
    if (!section) {
      return
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(target)
  }

  return <DashboardPage activeSection={activeSection} onNavigate={handleNavigate} />
}

export default App
