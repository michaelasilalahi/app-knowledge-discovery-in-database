import { useState, useEffect, useCallback } from 'react';
import { visualizationApi } from '@/features/archive-calender/api/visualization.api';
import {
  getPieColor,
  calculatePercentage,
} from '@/features/archive-calender/utils/pieChart.helpers';
import {
  PieChartData,
  PieChartResponse,
} from '@/features/archive-calender/types/visualization.interface';

export const usePieChart = (userId: string, month: number, year: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pieData, setPieData] = useState<PieChartData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const response: PieChartResponse = await visualizationApi.getPieChartData(
        userId,
        month,
        year,
      );
      setTotalCount(response.total_count);
      const formattedData: PieChartData[] = response.data.map((item, index) => {
        return {
          value: item.count,
          text: `${item.count}`,
          color: getPieColor(index),
          label: item.label,
          originalAmount: item.amount,
          originalCount: item.count,
          percentage: calculatePercentage(item.count, response.total_count),
        };
      });
      setPieData(formattedData);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, month, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, pieData, totalCount };
};
