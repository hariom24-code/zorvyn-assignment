function RoleSwitcher({ role, setRole }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 p-1 dark:border-slate-700 dark:bg-slate-900/70">
      {['viewer', 'admin'].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setRole(item)}
          className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${
            role === item
              ? 'bg-brand-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default RoleSwitcher
