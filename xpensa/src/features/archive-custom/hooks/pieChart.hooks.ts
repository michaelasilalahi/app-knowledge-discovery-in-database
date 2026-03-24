import { useState, useEffect, useCallback } from 'react';
import { customVisualizationApi } from '../api/visualization.api';
import {
  getPieColor,
  calculatePercentage,
} from '@/features/archive-calender/utils/pieChart.helpers';
import { PieChartData, PieChartResponse } from '@/features/archive-calender';

export const useCustomPieChart = (
  userId: string,
  startDate: string,
  endDate: string,
) => {
  const [loadingPie, setLoadingPie] = useState<boolean>(true);
  const [pieData, setPieData] = useState<PieChartData[]>([]);
  const [totalPieCount, setTotalPieCount] = useState<number>(0);

  const fetchPieData = useCallback(async () => {
    if (!userId || !startDate || !endDate) {
      setLoadingPie(false);
      return;
    }
    setLoadingPie(true);

    try {
      const response: PieChartResponse =
        await customVisualizationApi.getPieChartData(
          userId,
          startDate,
          endDate,
        );
      setTotalPieCount(response.total_count);
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
      console.error('Error fetching custom pie chart data:', error);
    } finally {
      setLoadingPie(false);
    }
  }, [userId, startDate, endDate]);

  useEffect(() => {
    fetchPieData();
  }, [fetchPieData]);

  return { loadingPie, pieData, totalPieCount };
};
