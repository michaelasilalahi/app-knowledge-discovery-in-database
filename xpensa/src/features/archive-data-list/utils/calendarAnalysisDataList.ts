import { useEffect, useMemo } from 'react';
import { useExpenseStore } from '@/features/expenses/store/expenseStore';
import { CalenderAnalysisItem } from '../types/calenderAnalysisDataList.interface';

const MONTHS_ID = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const useCalendarAnalysisDataList = (): {
  listData: CalenderAnalysisItem[];
  isLoading: boolean;
} => {
  const { expenses, fetchExpenses, isLoading } = useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const listData = useMemo(() => {
    const groupedData = expenses.reduce(
      (acc, curr) => {
        if (!curr.date) {
          return acc;
        }

        try {
          const parts = curr.date.split('-');
          if (parts.length !== 3) return acc;

          const year = parts[0];
          const monthIndex = parseInt(parts[1], 10) - 1;
          const monthName = MONTHS_ID[monthIndex];

          const monthYear = `${monthName} ${year}`;

          if (!acc[monthYear]) {
            acc[monthYear] = 0;
          }
          acc[monthYear] += curr.amount;
        } catch {
          console.warn('Gagal parsing tanggal:', curr.date);
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.keys(groupedData).map((key) => ({
      title: key,
      totalExpense: groupedData[key],
    }));
  }, [expenses]);

  return {
    listData,
    isLoading,
  };
};
