const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'insights', label: 'Insights' }
]

function Sidebar({ activeSection, onNavigate }) {
  return (
    <aside className="sticky top-4 h-fit rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 md:p-6">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-500">Zorvy Finance</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">Control Center</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`w-full rounded-2xl px-4 py-2 text-left text-sm transition ${
                isActive
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
