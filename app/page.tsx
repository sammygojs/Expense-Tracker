// app/page.tsx
'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './components/Dashboard';
import AddExpenseForm from './components/AddExpenseForm';
import ExpensesTable from './components/ExpensesTable';

const queryClient = new QueryClient();

export default function Home() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAllExpenses, setShowAllExpenses] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-4">
        <Dashboard />
        <button onClick={() => setShowAddExpense(!showAddExpense)}>
          {showAddExpense ? 'Close Add Expense' : 'Add Expense'}
        </button>
        {showAddExpense && <AddExpenseForm />}
        <button onClick={() => setShowAllExpenses(!showAllExpenses)}>
          {showAllExpenses ? 'Hide All Expenses' : 'Show All Expenses'}
        </button>
        {showAllExpenses && <ExpensesTable />}
      </div>
    </QueryClientProvider>
  );
}