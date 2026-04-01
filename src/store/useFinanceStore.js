import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/mockTransactions'

const defaultFilters = {
  searchTerm: '',
  typeFilter: 'all',
  sortBy: 'date',
  sortOrder: 'desc'
}

export const useFinanceStore = create(
  persist(
    (set) => ({
      role: 'viewer',
      darkMode: false,
      transactions: mockTransactions,
      ...defaultFilters,
      setRole: (role) => set({ role }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setTypeFilter: (typeFilter) => set({ typeFilter }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      resetFilters: () => set(defaultFilters),
      addTransaction: (payload) =>
        set((state) => ({
          transactions: [
            {
              ...payload,
              id: crypto.randomUUID()
            },
            ...state.transactions
          ]
        })),
      editTransaction: (id, payload) =>
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === id ? { ...transaction, ...payload } : transaction
          )
        }))
    }),
    {
      name: 'finance-dashboard-store'
    }
  )
)
