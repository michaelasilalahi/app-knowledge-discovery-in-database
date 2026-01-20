import { useEffect } from 'react';
import { useExpenseStore } from '@/features/expenses/store/expenseStore';

export const useCalendarAnalysisDataList = () => {
  const { expenses, fetchExpenses } = useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, []);

  // logic grouping data
  const groupedData = expenses.reduce(
    (acc, curr) => {
      const dateObj = new Date(curr.tanggal);

      const monthYear = dateObj.toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      });

      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }

      acc[monthYear] += curr.nominal;

      return acc;
    },
    {} as Record<string, number>,
  );

  // mapping ke format list
  const listData = Object.keys(groupedData).map((key) => ({
    title: key,
    totalExpense: groupedData[key],
  }));

  return listData;
};
