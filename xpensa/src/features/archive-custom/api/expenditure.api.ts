import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';

export const expenditureApi = {
  getCustomCycleExpenses: async (
    userId: string,
    startDate: string,
    endDate: string,
  ) => {
    console.log(
      'StartDate Custom Cycle yang akan dikirim ke Backend:',
      startDate,
    );
    try {
      const url = API_ENDPOINTS.EXPENSE.GET_CUSTOM_CYCLE(userId);
      const response = await apiClient.get(url, {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching custom cycle expenses:', error);
      throw error;
    }
  },
  deleteExpenditure: async (expenseId: number): Promise<void> => {
    try {
      const url = API_ENDPOINTS.EXPENSE.DELETE(expenseId);
      await apiClient.delete(url);
    } catch (error) {
      console.error('Error deleting custom cycle expenditure:', error);
      throw error;
    }
  },
};
