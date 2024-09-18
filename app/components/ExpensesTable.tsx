// app/components/ExpensesTable.tsx
'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Expense {
  id: number;
  amount: number;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
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
  const [sortField, setSortField] = useState<keyof Expense>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

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
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSort = (field: keyof Expense) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedExpenses = expenses
    ? [...expenses].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      })
    : [];

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (isError) return <div className="text-center py-4 text-red-600">Error fetching expenses</div>;

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {['Date', 'Time', 'Category', 'Amount', 'Location', 'Description', 'Actions'].map((header) => (
              <th 
                key={header} 
                scope="col" 
                className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort(header.toLowerCase() as keyof Expense)}
              >
                <div className="flex items-center">
                  {header}
                  {sortField === header.toLowerCase() && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.category}</td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                ${expense.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4">{expense.location}</td>
              <td className="px-6 py-4">
                <div className="max-w-xs truncate" title={expense.description}>
                  {expense.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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