import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { MiningResultResponse } from '@/features/archive-calender';

export const customDataMiningApi = {
  executeMining: async (userId: string, month: number, year: number) => {
    const url = API_ENDPOINTS.ARCHIVE_CUSTOM.DATA_MINING.EXECUTE(userId);
    const response = await apiClient.post(url, null, {
      params: { month, year },
    });
    return response.data;
  },

  getMiningResults: async (
    userId: string,
    month: number,
    year: number,
  ): Promise<MiningResultResponse> => {
    const url = API_ENDPOINTS.ARCHIVE_CUSTOM.DATA_MINING.RESULT(userId);
    const response = await apiClient.get<MiningResultResponse>(url, {
      params: { month, year },
    });
    return response.data;
  },
};
