import { useState, useEffect, useMemo, useCallback } from 'react';
import { useGoogleStore } from '@/auth/google';
import { calendarCycleExpenditureApi } from '../api/expenditure.api';
import { parsePeriodTitle } from '../utils/expenses.helpers';
import { ExpenseItem } from '../types/expenses.interface';

export const useExpensesList = (periodTitle: string) => {
  const userId = useGoogleStore((state) => state.user?.id);

  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data =
        await calendarCycleExpenditureApi.getCalenderCycleExpenditureApi(
          userId,
        );
      setExpenses(data);
    } catch (err) {
      console.error('Gagal mengambil data riwayat pengeluaran:', err);
      setError('Gagal memuat data pengeluaran.');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

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
    refreshExpenses: fetchExpenses,
  };
};
