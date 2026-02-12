import { useState, useEffect, useCallback } from 'react';
import { syncVisualizationOfAllTimeStore } from '@/features/visualization-of-all-time/middleware/visualizationOfAllTime.persist';

export const useVisualizationOfAllTime = (userId: string) => {
  const lineDataNeeds = syncVisualizationOfAllTimeStore(
    (state) => state.lineDataNeeds,
  );
  const lineDataWants = syncVisualizationOfAllTimeStore(
    (state) => state.lineDataWants,
  );
  const syncHistoricalData = syncVisualizationOfAllTimeStore(
    (state) => state.syncHistoricalData,
  );

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const today = new Date();

  const isPrevDisabled =
    currentDate.getMonth() === 0 &&
    currentDate.getFullYear() === today.getFullYear();

  const isNextDisabled =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  const goToPreviousMonth = () => {
    if (isPrevDisabled) return;
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    if (isNextDisabled) return;
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const fetchData = useCallback(async () => {
    if (!userId) return;

    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    await syncHistoricalData(userId, month, year);
  }, [userId, currentDate, syncHistoricalData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    lineDataNeeds,
    lineDataWants,
    currentDate,
    goToPreviousMonth,
    goToNextMonth,
    isPrevDisabled,
    isNextDisabled,
  };
};
