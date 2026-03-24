import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { SettingAnalysisPayload } from '@/features/setting-analysis/types/settingAnalysisApiType';

export const settingAnalysisApi = {
  save: async (data: SettingAnalysisPayload) => {
    try {
      const url = API_ENDPOINTS.ANALYSIS_SETTING.SAVE;
      const response = await apiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Error saving setting analysis:', error);
      throw error;
    }
  },

  getActiveSetting: async (userId: string) => {
    try {
      const url = API_ENDPOINTS.ANALYSIS_SETTING.GET_ACTIVE(userId);
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching active setting analysis:', error);
      throw error;
    }
  },
};
