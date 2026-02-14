import { useEffect, useMemo } from 'react';
import { useGoogleStore } from '@/auth/google';
import { useExpenseListPersistStore } from '../middleware/expenseList.persist';
import { parsePeriodTitle } from '../utils/expenses.helpers';
import { ExpenseItem } from '../types/expenses.interface';

export const useExpensesList = (periodTitle: string) => {
  // selective subscription
  const expenses = useExpenseListPersistStore((state) => state.expenses);
  const fetchExpenses = useExpenseListPersistStore(
    (state) => state.fetchExpenses,
  );
  const hasHydrated = useExpenseListPersistStore((state) => state.hasHydrated);
  const isLoading = useExpenseListPersistStore((state) => state.isLoading);

  const userId = useGoogleStore((state) => state.user?.id);

  useEffect(() => {
    if (userId) {
      fetchExpenses(userId);
    }
  }, [userId, fetchExpenses]);

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
    hasHydrated,
  };
};
