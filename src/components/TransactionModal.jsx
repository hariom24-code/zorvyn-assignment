import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const initialForm = {
  date: '',
  amount: '',
  category: '',
  type: 'expense',
  note: ''
}

function TransactionModal({ open, mode, transaction, onClose, onSubmit }) {
  const [form, setForm] = useState(() => {
    if (!transaction) {
      return initialForm
    }

    return {
      date: transaction.date,
      amount: String(transaction.amount),
      category: transaction.category,
      type: transaction.type,
      note: transaction.note || ''
    }
  })
  const modalRef = useRef(null)

  useLayoutEffect(() => {
    if (!open || !modalRef.current) {
      return undefined
    }

    const tween = gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
    )

    return () => tween.kill()
  }, [open])

  if (!open) {
    return null
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((state) => ({ ...state, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      ...form,
      amount: Number(form.amount)
    })
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-slate-950/55 p-3 sm:p-4">
      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className="my-6 w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <h4 className="font-display text-lg text-slate-900 dark:text-slate-100 sm:text-xl">
            {mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'}
          </h4>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-600 dark:text-slate-300">
            Date
            <input
              required
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </label>

          <label className="text-sm text-slate-600 dark:text-slate-300">
            Amount
            <input
              required
              type="number"
              min="1"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </label>

          <label className="text-sm text-slate-600 dark:text-slate-300">
            Category
            <input
              required
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </label>

          <label className="text-sm text-slate-600 dark:text-slate-300">
            Type
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
        </div>

        <label className="mt-4 block text-sm text-slate-600 dark:text-slate-300">
          Note
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            rows={3}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </label>

        <button
          type="submit"
          className="mt-5 rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Save Transaction
        </button>
      </form>
    </div>
  )
}

export default TransactionModal
