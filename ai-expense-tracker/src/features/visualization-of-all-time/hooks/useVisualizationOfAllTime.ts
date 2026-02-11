import { useState, useEffect, useCallback } from 'react';
import { visualizationOfAllTimeApi } from '@/features/visualization-of-all-time/api/visualizationOfAllTimeApi';
import { transformToLineData } from '@/features/visualization-of-all-time/utils/visualizationOfAllTimeHelpers';
import { GiftedLineChartItem } from '@/features/visualization-of-all-time/types/visualizationOfAllTimeType';

export const useVisualizationOfAllTime = (userId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [lineDataNeeds, setLineDataNeeds] = useState<GiftedLineChartItem[]>([]);
  const [lineDataWants, setLineDataWants] = useState<GiftedLineChartItem[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const fetchData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const response = await visualizationOfAllTimeApi.getHistoricalData(
        userId,
        month,
        year,
      );
      if (response && response.data) {
        const { needsData, wantsData } = transformToLineData(
          response.data,
          month,
          year,
        );
        setLineDataNeeds(needsData);
        setLineDataWants(wantsData);
      }
    } catch (error) {
      console.error('error fetching historical data:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, currentDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    lineDataNeeds,
    lineDataWants,
    currentDate,
    goToPreviousMonth,
    goToNextMonth,
  };
};
