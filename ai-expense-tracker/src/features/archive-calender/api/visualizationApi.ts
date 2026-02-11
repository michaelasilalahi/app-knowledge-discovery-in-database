import { apiClient } from '@/config/apiClient';
import { BarChartResponse } from '@/features/archive-calender/types/barChartCategoryTypes';
import { PieChartResponse } from '@/features/archive-calender/types/pieChartTypes';

export const visualizationApi = {
  getBarChartData: async (
    userId: string,
    month: number,
    year: number,
  ): Promise<BarChartResponse> => {
    try {
      const response = await apiClient.get<BarChartResponse>(
        `/insight/visualisasi/bar-chart/${userId}`,
        {
          params: {
            month,
            year,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching category summary:', error);
      throw error;
    }
  },
  getPieChartData: async (
    userId: string,
    month: number,
    year: number,
  ): Promise<PieChartResponse> => {
    try {
      const response = await apiClient.get<PieChartResponse>(
        `/insight/visualisasi/pie-chart/${userId}`,
        {
          params: {
            month,
            year,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
      throw error;
    }
  },
};
