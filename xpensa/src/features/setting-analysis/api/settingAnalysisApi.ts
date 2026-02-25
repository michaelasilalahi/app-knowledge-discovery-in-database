import { apiClient } from '@/config/apiClient';
import { SettingAnalysisPayload } from '@/features/setting-analysis/types/settingAnalysisApiType';

export const settingAnalysisApi = {
  save: async (data: SettingAnalysisPayload) => {
    try {
      const response = await apiClient.post('/setting_analysis', data);
      return response.data;
    } catch (error) {
      console.error('Error saving setting analysis:', error);
      throw error;
    }
  },
};
