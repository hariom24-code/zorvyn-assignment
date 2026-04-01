const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'insights', label: 'Insights' }
]

function Sidebar({ activeSection, onNavigate }) {
  return (
    <aside className="h-fit rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 md:p-5 lg:sticky lg:top-4 lg:p-6">
      <div className="mb-4 lg:mb-6">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-500">Zorvy Finance</p>
        <h1 className="mt-2 font-display text-xl font-semibold text-slate-900 dark:text-slate-100 md:text-2xl">Control Center</h1>
      </div>

      <nav className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`shrink-0 rounded-2xl px-4 py-2 text-left text-sm transition lg:w-full ${
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
