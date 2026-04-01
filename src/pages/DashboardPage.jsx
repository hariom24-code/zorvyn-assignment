import { useEffect, useMemo, useRef } from 'react'
import SummaryCard from '../components/SummaryCard'
import OverviewCharts from '../components/OverviewCharts'
import TransactionsSection from '../components/TransactionsSection'
import InsightsSection from '../components/InsightsSection'
import RoleSwitcher from '../components/RoleSwitcher'
import ThemeToggle from '../components/ThemeToggle'
import Sidebar from '../components/Sidebar'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { useFinanceStore } from '../store/useFinanceStore'
import { buildCategoryBreakdown, buildMonthlyTrend, getInsights, summarizeTransactions } from '../utils/finance'

function DashboardPage({ activeSection, onNavigate }) {
  const scopeRef = useRef(null)

  const {
    role,
    darkMode,
    transactions,
    searchTerm,
    typeFilter,
    sortBy,
    sortOrder,
    setRole,
    toggleDarkMode,
    setSearchTerm,
    setTypeFilter,
    setSortBy,
    setSortOrder,
    resetFilters,
    addTransaction,
    editTransaction
  } = useFinanceStore()

  useGsapReveal(scopeRef)

  const summary = useMemo(() => summarizeTransactions(transactions), [transactions])
  const monthlyData = useMemo(() => buildMonthlyTrend(transactions), [transactions])
  const categoryData = useMemo(() => buildCategoryBreakdown(transactions), [transactions])
  const insights = useMemo(() => getInsights(transactions), [transactions])

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
    return () => document.body.classList.remove('dark')
  }, [darkMode])

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="mx-auto grid max-w-[1360px] gap-4 px-4 py-4 lg:grid-cols-[260px_1fr] lg:px-6 lg:py-6">
        <Sidebar activeSection={activeSection} onNavigate={onNavigate} />

        <main ref={scopeRef} className="space-y-5 rounded-3xl border border-slate-200/80 bg-white/40 p-4 shadow-soft backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/40 md:p-6">
          <section id="overview" className="scroll-mt-8">
            <div className="reveal-item flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-500">Financial Workspace</p>
                <h2 className="mt-2 font-display text-3xl text-slate-900 dark:text-slate-100">Dashboard Overview</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <RoleSwitcher role={role} setRole={setRole} />
                <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <SummaryCard title="Total Balance" value={summary.totalBalance} accent="text-brand-500" />
              <SummaryCard title="Total Income" value={summary.totalIncome} accent="text-green-600 dark:text-green-400" />
              <SummaryCard title="Total Expenses" value={summary.totalExpenses} accent="text-rose-600 dark:text-rose-400" />
            </div>

            <OverviewCharts monthlyData={monthlyData} categoryData={categoryData} />
          </section>

          <TransactionsSection
            role={role}
            transactions={transactions}
            searchTerm={searchTerm}
            typeFilter={typeFilter}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setSearchTerm={setSearchTerm}
            setTypeFilter={setTypeFilter}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            resetFilters={resetFilters}
            addTransaction={addTransaction}
            editTransaction={editTransaction}
          />

          <InsightsSection insights={insights} />
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
