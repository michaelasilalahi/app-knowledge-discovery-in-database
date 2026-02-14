import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { LineChartResponse } from '@/features/visualization-of-all-time/types/visualizationOfAllTime.interface';

export const visualizationOfAllTimeApi = {
  getHistoricalData: async (
    userId: string,
    month: number,
    year: number,
  ): Promise<LineChartResponse> => {
    try {
      const url = API_ENDPOINTS.VISUALIZATION_OF_ALL_TIME.LINE_CHART(userId);
      const response = await apiClient.get<LineChartResponse>(url, {
        params: { month, year },
      });
      return response.data;
    } catch (error) {
      console.error('error fetching historical line chart data:', error);
      throw error;
    }
  },
};
