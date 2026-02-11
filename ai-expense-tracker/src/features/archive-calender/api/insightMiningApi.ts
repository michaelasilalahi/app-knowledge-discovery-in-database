import { apiClient } from '@/config/apiClient';

// Types
import { MiningResultResponse } from '../types/miningResultApiTypes';

export const insightMiningApi = {
  executeMining: async (userId: string, month: number, year: number) => {
    try {
      const response = await apiClient.post(
        `/insight/mining/execute/${userId}`,
        null,
        {
          params: {
            month: month,
            year: year,
          },
        },
      );
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
      const response = await apiClient.get<MiningResultResponse>(
        `/insight/result/${userId}`,
        {
          params: {
            month: month,
            year: year,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('API Error (getMiningResults):', error);
      throw error;
    }
  },
};
