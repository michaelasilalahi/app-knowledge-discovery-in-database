import { useEffect, useMemo } from 'react';
import { useExpenseStore } from '@/features/expenses/store/expenseStore';
import { CalenderAnalysisItem } from '../types/calenderAnalysisDataListType';

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

export const useCalendarAnalysisDataList = (): CalenderAnalysisItem[] => {
  const { expenses, fetchExpenses } = useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // logic grouping data
  const listData = useMemo(() => {
    const groupedData = expenses.reduce(
      (acc, curr) => {
        // 1. Validasi
        if (!curr.date) {
          return acc;
        }

        try {
          // 2. Parsing manual (yyy-mmm-dd) -> mencegah invalid date
          const parts = curr.date.split('-');
          if (parts.length !== 3) return acc;

          const year = parts[0];
          const monthIndex = parseInt(parts[1], 10) - 1;
          const monthName = MONTHS_ID[monthIndex];

          // Key grouping: Januari 2026
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

    // mapping ke format list
    return Object.keys(groupedData).map((key) => ({
      title: key,
      totalExpense: groupedData[key],
    }));
  }, [expenses]);

  return listData;
};
