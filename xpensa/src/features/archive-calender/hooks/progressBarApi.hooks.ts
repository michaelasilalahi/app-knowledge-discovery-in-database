import { useState, useEffect, useCallback } from 'react';
import { useGoogleStore } from '@/auth/google';
import { insightProgressBarApi } from '../api/InsightProgressBar.api';
import { InsightProgressBar } from '../types/progressBar.interface';

export const useProgressBarApi = (month: number, year: number) => {
  const userId = useGoogleStore((state) => state.user?.id);
  const [progressBarData, setProgressBarData] =
    useState<InsightProgressBar | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProgressBar = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      const data = await insightProgressBarApi.getProgress(userId, month, year);
      setProgressBarData(data);
    } catch (error) {
      console.error('Error fetching progress bar:', error);
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
