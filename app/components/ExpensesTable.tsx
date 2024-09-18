// app/components/ExpensesTable.tsx
'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

const deleteExpense = async (id: number): Promise<void> => {
  await axios.delete(`/api/expenses/${id}`);
};

const ExpensesTable: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: expenses, isLoading, isError } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching expenses</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses?.map((expense) => (
            <tr key={expense.id}>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(expense.date).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">${expense.amount.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button 
                  onClick={() => handleDelete(expense.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;