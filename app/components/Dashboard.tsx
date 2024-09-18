// app/components/Dashboard.tsx
'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Expense {
  id: number;
  amount: number;
  category: string;
  date: string;
}

const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get('/api/expenses');
  return response.data;
};

const Dashboard: React.FC = () => {
  const { data: expenses } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses
  });

  const calculateTotal = (expenseList: Expense[] | undefined, period: 'week' | 'month'): number => {
    if (!expenseList) return 0;
    
    const now = new Date();
    const periodStart = period === 'week' 
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7) 
      : new Date(now.getFullYear(), now.getMonth(), 1);

    return expenseList.reduce((total, expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= periodStart && expenseDate <= now) {
        return total + expense.amount;
      }
      return total;
    }, 0);
  };

  const weeklyTotal = calculateTotal(expenses, 'week');
  const monthlyTotal = calculateTotal(expenses, 'month');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            This Week's Expenses
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            ${weeklyTotal.toFixed(2)}
          </dd>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            This Month's Expenses
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            ${monthlyTotal.toFixed(2)}
          </dd>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;