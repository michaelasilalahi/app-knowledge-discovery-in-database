import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { MiningResultResponse } from '../types/miningResultApi.interface';

export const insightMiningApi = {
  executeMining: async (userId: string, month: number, year: number) => {
    try {
      const url = API_ENDPOINTS.ARCHIVE_CALENDER.DATA_MINING.EXECUTE(userId);
      const response = await apiClient.post(url, null, {
        params: {
          month: month,
          year: year,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API Error (executeMining):', error);
      throw error;
    }
  },

  getMiningResults: async (
    userId: string,
    month: number,
    year: number,
  ): Promise<MiningResultResponse> => {
    try {
      const url = API_ENDPOINTS.ARCHIVE_CALENDER.DATA_MINING.RESULT(userId);
      const response = await apiClient.get<MiningResultResponse>(url, {
        params: {
          month: month,
          year: year,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API Error (getMiningResults):', error);
      throw error;
    }
  },
};
