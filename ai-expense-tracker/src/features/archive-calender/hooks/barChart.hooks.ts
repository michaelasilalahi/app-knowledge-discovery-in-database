import { useState, useEffect, useCallback } from 'react';
import { visualizationApi } from '@/features/archive-calender/api/visualization.api';
import { formatCurrency } from '@/features/archive-calender/utils/barChartCategory.helpers';
import { CategoryChartData } from '@/features/archive-calender/types/barChartCategory.interface';

export const useCategoryComparison = (
  userId: string,
  month: number,
  year: number,
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<CategoryChartData[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const data = await visualizationApi.getBarChartData(userId, month, year);
      setTotalExpense(data.total_expense);

      console.log('[DEBUG] RESPONSE API:', JSON.stringify(data, null, 2));

      const formattedData: CategoryChartData[] = [
        {
          value: data.count_needs,
          label: 'Kebutuhan',
          frontColor: '#22C55E',
          totalAmount: data.amount_needs,
          formattedAmount: formatCurrency(data.amount_needs),
        },
        {
          value: data.count_wants,
          label: 'Keinginan',
          frontColor: '#DC2626',
          totalAmount: data.amount_wants,
          formattedAmount: formatCurrency(data.amount_wants),
        },
      ];

      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, month, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, chartData, totalExpense };
};
