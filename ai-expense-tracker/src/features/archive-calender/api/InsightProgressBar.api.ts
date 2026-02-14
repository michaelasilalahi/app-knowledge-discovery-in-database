import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { InsightProgressBar } from '@/features/archive-calender/types/progressBar.interface';

export const insightProgressBarApi = {
  getProgress: async (
    user_id: string,
    month: number,
    year: number,
  ): Promise<InsightProgressBar> => {
    try {
      const url = API_ENDPOINTS.ARCHIVE_CALENDER.PROGRESS_BAR(user_id);
      const response = await apiClient.get(url, {
        params: {
          month: month,
          year: year,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching progress bar:', error);
      throw error;
    }
  },
};
