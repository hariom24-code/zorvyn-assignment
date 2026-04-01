import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { formatCurrency } from '../utils/finance'

function SummaryCard({ title, value, accent = 'text-brand-500' }) {
  const numberRef = useRef(null)

  useLayoutEffect(() => {
    if (!numberRef.current) {
      return undefined
    }

    const proxy = { value: 0 }
    const tween = gsap.to(proxy, {
      value,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        numberRef.current.textContent = formatCurrency(Math.round(proxy.value))
      }
    })

    return () => tween.kill()
  }, [value])

  return (
    <article className="summary-card reveal-item rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-soft transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p ref={numberRef} className={`mt-3 font-display text-2xl font-semibold sm:text-3xl ${accent}`}>
        {formatCurrency(0)}
      </p>
    </article>
  )
}

export default SummaryCard
