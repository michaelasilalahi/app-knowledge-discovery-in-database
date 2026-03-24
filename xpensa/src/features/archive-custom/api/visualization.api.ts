import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import {
  BarChartResponse,
  PieChartResponse,
} from '@/features/archive-calender';

export const customVisualizationApi = {
  getBarChartData: async (
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<BarChartResponse> => {
    try {
      const url = API_ENDPOINTS.ARCHIVE_CUSTOM.BAR_CHART(userId);
      const response = await apiClient.get<BarChartResponse>(url, {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching custom bar chart data:', error);
      throw error;
    }
  },

  getPieChartData: async (
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<PieChartResponse> => {
    try {
      const url = API_ENDPOINTS.ARCHIVE_CUSTOM.PIE_CHART(userId);
      const response = await apiClient.get<PieChartResponse>(url, {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching custom pie chart data:', error);
      throw error;
    }
  },
};
