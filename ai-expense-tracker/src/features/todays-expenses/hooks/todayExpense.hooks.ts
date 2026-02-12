import { useEffect, useCallback } from 'react';
import { useGoogleStore } from '@/auth/google';
import { syncTodayExpenseStore } from '@/features/todays-expenses/middleware/todayExpense.persist';

export const useTodaysExpenses = () => {
  // selective subscription to expenses
  const expenses = syncTodayExpenseStore((state) => state.expenses);
  const syncTodayExpense = syncTodayExpenseStore(
    (state) => state.syncTodayExpense,
  );

  const user = useGoogleStore((state) => state.user);
  const userId = user?.id;

  const refetch = useCallback(async () => {
    if (userId) {
      await syncTodayExpense(userId);
    }
  }, [userId, syncTodayExpense]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    expenses,
    refetch,
  };
};
