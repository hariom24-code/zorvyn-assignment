const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

export const formatCurrency = (value) => currencyFormatter.format(value || 0)

export const summarizeTransactions = (transactions) => {
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += Number(transaction.amount)
      } else {
        acc.expenses += Number(transaction.amount)
      }
      return acc
    },
    { income: 0, expenses: 0 }
  )

  return {
    totalIncome: totals.income,
    totalExpenses: totals.expenses,
    totalBalance: totals.income - totals.expenses
  }
}

export const buildMonthlyTrend = (transactions) => {
  const monthlyMap = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!acc[key]) {
      acc[key] = { month: date.toLocaleDateString('en-US', { month: 'short' }), income: 0, expenses: 0, balance: 0 }
    }

    if (transaction.type === 'income') {
      acc[key].income += Number(transaction.amount)
    } else {
      acc[key].expenses += Number(transaction.amount)
    }

    acc[key].balance = acc[key].income - acc[key].expenses
    return acc
  }, {})

  return Object.values(monthlyMap)
}

export const buildCategoryBreakdown = (transactions) => {
  const categoryMap = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + Number(transaction.amount)
      return acc
    }, {})

  return Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
}

export const getInsights = (transactions) => {
  const monthlyTrend = buildMonthlyTrend(transactions)
  const categoryBreakdown = buildCategoryBreakdown(transactions)

  const topCategory = categoryBreakdown.reduce(
    (max, category) => (category.value > max.value ? category : max),
    { name: 'N/A', value: 0 }
  )

  const latestMonth = monthlyTrend[monthlyTrend.length - 1]
  const previousMonth = monthlyTrend[monthlyTrend.length - 2]

  const monthDelta = previousMonth
    ? latestMonth.balance - previousMonth.balance
    : latestMonth?.balance || 0

  return {
    topCategory,
    latestMonth,
    previousMonth,
    monthDelta,
    observations: [
      topCategory.value
        ? `${topCategory.name} leads spending at ${formatCurrency(topCategory.value)}.`
        : 'Not enough expense data to determine top spending category.',
      previousMonth
        ? `Balance changed by ${formatCurrency(monthDelta)} compared to last month.`
        : 'Monthly comparison will appear once at least two months of data are available.',
      transactions.length
        ? `You have ${transactions.length} transactions in view.`
        : 'No transactions in view. Try changing filters or adding records.'
    ]
  }
}

export const filterAndSortTransactions = ({ transactions, searchTerm, typeFilter, sortBy, sortOrder }) => {
  const normalizedSearch = searchTerm.toLowerCase().trim()

  const filtered = transactions.filter((transaction) => {
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter
    const matchesSearch =
      !normalizedSearch ||
      transaction.category.toLowerCase().includes(normalizedSearch) ||
      transaction.date.includes(normalizedSearch)

    return matchesType && matchesSearch
  })

  return filtered.sort((a, b) => {
    const direction = sortOrder === 'asc' ? 1 : -1

    if (sortBy === 'amount') {
      return (Number(a.amount) - Number(b.amount)) * direction
    }

    return (new Date(a.date).getTime() - new Date(b.date).getTime()) * direction
  })
}
