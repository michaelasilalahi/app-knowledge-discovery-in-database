import { apiClient } from '@/config/apiClient';
import { InsightProgressBar } from '@/features/archive-calender/types/progressBarTypes';

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
      console.log('--- DEBUG BACKEND DATA ---');
      console.log('Raw JSON Response:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('Error fetching progress bar:', error);
      throw error;
    }
  },
};
