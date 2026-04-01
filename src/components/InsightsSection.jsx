import { formatCurrency } from '../utils/finance'

function InsightsSection({ insights }) {
  return (
    <section id="insights" className="reveal-item scroll-mt-8 rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/60 md:p-6">
      <h2 className="font-display text-2xl text-slate-900 dark:text-slate-100">Insights</h2>
      <p className="mt-1 text-sm text-slate-500">Quick observations generated from current transaction data.</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/70">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Top Spending Category</p>
          <p className="mt-2 font-display text-xl text-slate-900 dark:text-slate-100">{insights.topCategory.name}</p>
          <p className="mt-1 text-sm text-slate-500">{formatCurrency(insights.topCategory.value)}</p>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/70">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Latest Month Balance</p>
          <p className="mt-2 font-display text-xl text-slate-900 dark:text-slate-100">
            {insights.latestMonth ? formatCurrency(insights.latestMonth.balance) : '$0'}
          </p>
          <p className="mt-1 text-sm text-slate-500">{insights.latestMonth?.month || 'No month data'}</p>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/70">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Monthly Delta</p>
          <p
            className={`mt-2 font-display text-xl ${
              insights.monthDelta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {formatCurrency(insights.monthDelta)}
          </p>
          <p className="mt-1 text-sm text-slate-500">Compared with previous month</p>
        </article>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {insights.observations.map((observation) => (
          <li key={observation} className="rounded-xl bg-slate-100/80 px-4 py-3 dark:bg-slate-800/70">
            {observation}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default InsightsSection
