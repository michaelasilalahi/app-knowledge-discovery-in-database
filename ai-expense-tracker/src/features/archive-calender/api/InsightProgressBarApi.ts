import { apiClient } from '@/config/apiClient';
import { InsightProgressBar } from '@/features/archive-calender/types/insightProgressBarTypes';

export const insightProgressBarApi = {
  getProgress: async (
    user_id: string,
    month: number,
    year: number,
  ): Promise<InsightProgressBar> => {
    try {
      const response = await apiClient.get(`/insight/progress/${user_id}`, {
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
