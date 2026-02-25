import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import {
  BarChartResponse,
  PieChartResponse,
} from '@/features/archive-calender/types/visualization.interface';

export const visualizationApi = {
  getBarChartData: async (
    userId: string,
    month: number,
    year: number,
  ): Promise<BarChartResponse> => {
    try {
      const url = API_ENDPOINTS.ARCHIVE_CALENDER.BAR_CHART(userId);
      const response = await apiClient.get<BarChartResponse>(url, {
        params: {
          month,
          year,
        },
      });
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
      const url = API_ENDPOINTS.ARCHIVE_CALENDER.PIE_CHART(userId);
      const response = await apiClient.get<PieChartResponse>(url, {
        params: {
          month,
          year,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
      throw error;
    }
  },
};
