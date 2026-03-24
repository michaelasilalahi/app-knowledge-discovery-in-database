import { useEffect, useState, useCallback } from 'react';
import { customVisualizationApi } from '../api/visualization.api';
import { formatRupiah, BarChartData } from '@/features/archive-calender';

export const useCustomBarChart = (
  userId: string,
  startDate: string,
  endDate: string,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<BarChartData[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const fetchData = useCallback(async () => {
    if (!userId || !startDate || !endDate) return;
    setLoading(true);

    try {
      const data = await customVisualizationApi.getBarChartData(
        userId,
        startDate,
        endDate,
      );
      setTotalExpense(data.total_expense);

      const formattedData: BarChartData[] = [
        {
          value: data.count_needs,
          label: 'Kebutuhan',
          frontColor: '#22C55E',
          totalAmount: data.amount_needs,
          formattedAmount: formatRupiah(data.amount_needs),
        },
        {
          value: data.count_wants,
          label: 'Keinginan',
          frontColor: '#DC2626',
          totalAmount: data.amount_wants,
          formattedAmount: formatRupiah(data.amount_wants),
        },
      ];

      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching custom bar chart data:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, chartData, totalExpense };
};
