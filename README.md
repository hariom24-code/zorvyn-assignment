# Finance Dashboard UI

A modern, responsive finance dashboard built with React, Tailwind CSS, GSAP, Recharts, and Zustand.

## What It Demonstrates

This project is a frontend-only dashboard that uses static/mock data to simulate a simple financial workspace. It is designed to be clean, readable, and easy to evaluate.

## Features

- Dashboard overview with summary cards for total balance, income, and expenses
- Time-based visualization for monthly balance trend
- Categorical visualization for spending breakdown
- Transactions table with:
  - date, amount, category, and type
  - search by category or date
  - filter by income/expense
  - sorting by date or amount
- Frontend role-based UI simulation:
  - Viewer can only view data
  - Admin can add and edit transactions
- Insights section with dynamic observations from the mock data
- Dark mode toggle
- LocalStorage persistence for data and UI state
- GSAP animations for page load, cards, charts, and modal transitions
- Responsive layout for mobile, tablet, and desktop
- Graceful empty-state handling

## Tech Stack

- React
- Tailwind CSS
- GSAP
- Recharts
- Zustand

## Project Structure

- `src/components` - reusable UI pieces
- `src/pages` - page-level composition
- `src/hooks` - animation hooks
- `src/store` - app state management
- `src/utils` - formatting and data helpers
- `src/data` - static mock transactions

## How It Maps to the Assignment

1. Dashboard Overview
- Summary cards are shown at the top.
- Monthly trend and category breakdown charts are included.

2. Transactions Section
- Transactions are displayed in a table.
- Search, filter, and sorting controls are included.

3. Basic Role Based UI
- A role switcher toggles between Viewer and Admin.
- Admin can open add/edit transaction forms.

4. Insights Section
- Shows highest spending category, monthly comparison, and data-driven notes.

5. State Management
- Zustand manages transactions, filters, role, and dark mode.
- Data persists locally so the UI keeps state between refreshes.

6. UI and UX Expectations
- The layout is responsive.
- Empty states are handled in the transactions list.
- Navigation is smooth and section-based.

## Running Locally

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

## Notes

- This is intentionally frontend-only and uses mock data.
- The UI is meant to show approach, clarity, and interaction quality rather than backend integration.
