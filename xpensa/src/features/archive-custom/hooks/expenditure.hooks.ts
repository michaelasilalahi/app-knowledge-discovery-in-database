import { useState, useEffect } from 'react';
import { useGoogleStore } from '@/auth/google';
// import { settingAnalysisStore } from '@/features/setting-analysis';
import { expenditureApi } from '../api/expenditure.api';
import { Expenditure } from '../types/expenditure.interface';

export const useCustomExpenditure = (startDate: string, endDate: string) => {
  const [expenses, setExpenses] = useState<Expenditure[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user = useGoogleStore((state) => state.user);
  const userId = user?.id;

  useEffect(() => {
    const fetchExpenses = async () => {
      // Jika data di Zustand belum siap (user belum login atau belum ada setting), batalkan API
      if (!userId || !startDate || !endDate) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await expenditureApi.getCustomCycleExpenses(
          userId,
          startDate,
          endDate,
        );
        setExpenses(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Gagal mengambil data pengeluaran');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, [userId, startDate, endDate]);

  return { expenses, isLoading, error };
};
