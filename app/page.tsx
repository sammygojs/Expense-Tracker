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

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-800">Expense Tracker</h1>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 bg-white">
              <Dashboard />
              
              <div className="mt-8">
                <button
                  onClick={() => setShowAddExpense(!showAddExpense)}
                  className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {showAddExpense ? 'Hide Add Expense Form' : 'Show Add Expense Form'}
                </button>
                {showAddExpense && <AddExpenseForm />}
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
                <ExpensesTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}