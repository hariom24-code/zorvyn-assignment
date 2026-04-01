import { useMemo, useState } from 'react'
import { filterAndSortTransactions, formatCurrency } from '../utils/finance'
import TransactionModal from './TransactionModal'

function TransactionsSection({
  role,
  transactions,
  searchTerm,
  typeFilter,
  sortBy,
  sortOrder,
  setSearchTerm,
  setTypeFilter,
  setSortBy,
  setSortOrder,
  resetFilters,
  addTransaction,
  editTransaction
}) {
  const [modalState, setModalState] = useState({ open: false, mode: 'add', transaction: null })

  const visibleTransactions = useMemo(
    () =>
      filterAndSortTransactions({
        transactions,
        searchTerm,
        typeFilter,
        sortBy,
        sortOrder
      }),
    [transactions, searchTerm, typeFilter, sortBy, sortOrder]
  )

  const openAddModal = () => setModalState({ open: true, mode: 'add', transaction: null })
  const openEditModal = (transaction) => setModalState({ open: true, mode: 'edit', transaction })
  const closeModal = () => setModalState({ open: false, mode: 'add', transaction: null })

  const handleSubmit = (payload) => {
    if (modalState.mode === 'edit' && modalState.transaction) {
      editTransaction(modalState.transaction.id, payload)
    } else {
      addTransaction(payload)
    }

    closeModal()
  }

  return (
    <section id="transactions" className="reveal-item scroll-mt-8 rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/60 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-slate-900 dark:text-slate-100">Transactions</h2>
          <p className="text-sm text-slate-500">Search, filter, and sort your activity.</p>
        </div>

        {role === 'admin' ? (
          <button
            type="button"
            onClick={openAddModal}
            className="rounded-2xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Add Transaction
          </button>
        ) : (
          <p className="rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Switch to Admin to add or edit transactions.
          </p>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by category/date"
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 md:col-span-2"
        />

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>

        <div className="flex gap-2">
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700">
        {visibleTransactions.length ? (
          <>
            <div className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900/40 md:hidden">
              {visibleTransactions.map((transaction) => (
                <article key={transaction.id} className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{transaction.category}</p>
                      <p className="mt-1 text-xs text-slate-500">{transaction.date}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs capitalize ${
                        transaction.type === 'income'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">Amount</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500">{transaction.note || '--'}</p>

                  {role === 'admin' ? (
                    <button
                      type="button"
                      onClick={() => openEditModal(transaction)}
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      Edit
                    </button>
                  ) : null}
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-100/80 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Note</th>
                    {role === 'admin' ? <th className="px-4 py-3 font-medium">Action</th> : null}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900/40">
                  {visibleTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                      <td className="px-4 py-3">{transaction.date}</td>
                      <td className="px-4 py-3">{transaction.category}</td>
                      <td className="px-4 py-3 capitalize">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            transaction.type === 'income'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">{formatCurrency(transaction.amount)}</td>
                      <td className="px-4 py-3 text-slate-500">{transaction.note || '--'}</td>
                      {role === 'admin' ? (
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => openEditModal(transaction)}
                            className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            Edit
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-10 text-center">
            <p className="font-medium text-slate-700 dark:text-slate-200">No transactions found.</p>
            <p className="mt-1 text-sm text-slate-500">Adjust filters or add a new transaction.</p>
          </div>
        )}
      </div>

      <TransactionModal
        key={`${modalState.mode}-${modalState.transaction?.id || 'new'}-${modalState.open ? 'open' : 'closed'}`}
        open={modalState.open}
        mode={modalState.mode}
        transaction={modalState.transaction}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </section>
  )
}

export default TransactionsSection
