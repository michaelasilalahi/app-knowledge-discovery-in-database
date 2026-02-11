import { apiClient } from '@/config/apiClient';
import { LineChartResponse } from '@/features/visualization-of-all-time/types/visualizationOfAllTimeType';

export const visualizationOfAllTimeApi = {
  getHistoricalData: async (
    userId: string,
    month: number,
    year: number,
  ): Promise<LineChartResponse> => {
    try {
      const response = await apiClient.get<LineChartResponse>(
        `/insight/visualization/line-chart-history/${userId}`,
        { params: { month, year } },
      );
      return response.data;
    } catch (error) {
      console.error('error fetching historical line chart data:', error);
      throw error;
    }
  },
};
