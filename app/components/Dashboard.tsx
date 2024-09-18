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

const Dashboard = () => {
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

  return (
    <div>
      <h1>Dashboard</h1>
      <p>This Week's Expenses: ${calculateTotal(expenses, 'week').toFixed(2)}</p>
      <p>This Month's Expenses: ${calculateTotal(expenses, 'month').toFixed(2)}</p>
    </div>
  );
};

export default Dashboard;