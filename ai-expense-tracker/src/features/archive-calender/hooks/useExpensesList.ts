import { useEffect, useMemo } from 'react';
import { useExpenseStore } from '@/features/expenses/store/expenseStore';
import { parsePeriodTitle } from '../utils/expensesHelpers';
import { ExpenseItem } from '../types/expensesTypes';

export const useExpensesList = (periodTitle: string) => {
  // 1. ambil state dari zustand
  const { expenses, fetchExpenses, isLoading } = useExpenseStore();

  // fetch data pengeluaran saat hook dipanggil
  useEffect(() => {
    fetchExpenses();
  }, []);

  // logic filter data berdasarkan bulan dan tahun
  const filteredExpenses = useMemo(() => {
    const period = parsePeriodTitle(periodTitle);
    if (!period) return [];

    return expenses
      .filter((item: ExpenseItem) => {
        if (!item.date) return false;

        const parts = item.date.split('-');
        if (parts.length !== 3) return false;

        const itemYear = parseInt(parts[0]);
        const itemMonthIndex = parseInt(parts[1]) - 1;

        return itemMonthIndex === period.monthIndex && itemYear === period.year;
      })
      .sort((a, b) => {
        return b.date.localeCompare(a.date);
      });
  }, [expenses, periodTitle]);

  // logic total pengeluaran
  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((total, item) => {
      const nominal = Number(item.amount) || 0;
      return total + nominal;
    }, 0);
  }, [filteredExpenses]);

  return {
    filteredExpenses,
    totalExpenses,
    isLoading,
  };
};
