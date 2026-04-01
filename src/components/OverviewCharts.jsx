import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { formatCurrency } from '../utils/finance'

const categoryColors = ['#0f766e', '#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#134e4a']

function OverviewCharts({ monthlyData, categoryData }) {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.chart-panel',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power2.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [monthlyData, categoryData])

  return (
    <div ref={containerRef} className="mt-6 grid gap-5 xl:grid-cols-2">
      <section className="chart-panel rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
        <h3 className="font-display text-lg text-slate-900 dark:text-slate-100">Balance Trend</h3>
        <p className="mt-1 text-sm text-slate-500">Monthly income, expenses, and net balance.</p>

        <div className="mt-5 h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" opacity={0.35} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} width={65} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              {!isMobile ? <Legend /> : null}
              <Line type="monotone" dataKey="income" stroke="#16a34a" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="expenses" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="balance" stroke="#0f766e" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="chart-panel rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
        <h3 className="font-display text-lg text-slate-900 dark:text-slate-100">Spending Categories</h3>
        <p className="mt-1 text-sm text-slate-500">Expense split by category.</p>

        <div className="mt-5 h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 36 : 42}
                outerRadius={isMobile ? 74 : 95}
                label={isMobile ? false : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={entry.name} fill={categoryColors[index % categoryColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}

export default OverviewCharts
