import { apiClient } from '../../../config/apiClient';
import { Expense, ExpenseCreate } from './types'; // Import tipe data

export const expenseApi = {
  getAll: async (userId: string): Promise<Expense[]> => {
    try {
      const response = await apiClient.get<Expense[]>(`/expenses/${userId}`);
      return response.data;
    } catch (error) {
      console.error('API Error (getAll):', error);
      throw error;
    }
  },

  create: async (data: ExpenseCreate): Promise<Expense> => {
    try {
      const response = await apiClient.post<Expense>('/expenses/', data);
      return response.data;
    } catch (error) {
      console.error('API Error (create):', error);
      throw error;
    }
  },
};
