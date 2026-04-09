import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ExpenseItem } from '../types/expenses.interface';

export const calendarCycleExpenditureApi = {
  getCalenderCycleExpenditureApi: async (
    userId: string,
  ): Promise<ExpenseItem[]> => {
    try {
      const url = API_ENDPOINTS.EXPENSE.GET_CALENDER_CYCLE(userId);
      const response = await apiClient.get<ExpenseItem[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching calendar cycle expenses:', error);
      throw error;
    }
  },
};
