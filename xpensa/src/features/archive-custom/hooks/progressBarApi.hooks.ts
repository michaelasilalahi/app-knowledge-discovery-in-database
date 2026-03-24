import { useState, useEffect, useCallback } from 'react';
import { useGoogleStore } from '@/auth/google';
import { customProgressBarApi } from '../api/progressBar.api';
import { InsightProgressBar } from '@/features/archive-calender';

export const useCustomProgressBarApi = (month: number, year: number) => {
  const userId = useGoogleStore((state) => state.user?.id);
  const [progressBarData, setProgressBarData] =
    useState<InsightProgressBar | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProgressBar = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      const data = await customProgressBarApi.getProgress(userId, month, year);
      setProgressBarData(data);
    } catch (error) {
      console.error('Error fetching custom progress bar:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, month, year]);

  useEffect(() => {
    fetchProgressBar();
  }, [fetchProgressBar]);

  return {
    progressBarData,
    isLoading,
    refreshProgress: fetchProgressBar,
  };
};
