import { apiClient } from '../../../config/apiClient';
import { API_ENDPOINTS } from '../../../constants/endpoints';
import { ExpenseCreate } from '../types/expenseApi.type';
import { Expense } from '../types/expenseApi.interface';

export const expenseApi = {
  getAll: async (userId: string): Promise<Expense[]> => {
    try {
      const url = API_ENDPOINTS.EXPENSE.GET(userId);
      const response = await apiClient.get<Expense[]>(url);
      return response.data;
    } catch (error) {
      console.error('API Error (getAll):', error);
      throw error;
    }
  },

  create: async (data: ExpenseCreate): Promise<Expense> => {
    try {
      const url = API_ENDPOINTS.EXPENSE.CREATE;
      const response = await apiClient.post<Expense>(url, data);
      return response.data;
    } catch (error) {
      console.error('API Error (create):', error);
      throw error;
    }
  },
};
