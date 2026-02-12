import { apiClient } from '@/config/apiClient';
import { Expense } from '@/features/todays-expenses/types/todayExpense.interface';

export const todaysExpensesApi = {
  getTodaysExpenses: async (userId: string): Promise<Expense[]> => {
    try {
      const response = await apiClient.get<Expense[]>(
        `/expenses/today/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching todays expenses:', error);
      throw error;
    }
  },
};
