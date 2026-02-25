import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { Expense } from '@/features/todays-expenses/types/todayExpense.interface';

export const todaysExpensesApi = {
  getTodaysExpenses: async (userId: string): Promise<Expense[]> => {
    try {
      const url = API_ENDPOINTS.TODAY_EXPENSE.GET(userId);
      const response = await apiClient.get<Expense[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching todays expenses:', error);
      throw error;
    }
  },
};
