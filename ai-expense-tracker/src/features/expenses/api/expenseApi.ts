import { apiClient } from '../../../config/apiClient';
import { Expense, ExpenseCreate } from './types'; // Import tipe data

export const expenseApi = {
  // 1. Ambil Semua Data
  // Kita memberitahu TS bahwa balikan fungsinya adalah Promise berisi Array of Expense
  getAll: async (): Promise<Expense[]> => {
    try {
      // <Expense[]> memberitahu axios bahwa data yang datang bentuknya Array Expense
      const response = await apiClient.get<Expense[]>('/expense/');
      return response.data;
    } catch (error) {
      console.error('API Error (getAll):', error);
      throw error;
    }
  },

  // 2. Tambah Data Baru
  create: async (data: ExpenseCreate): Promise<Expense> => {
    try {
      const response = await apiClient.post<Expense>('/expense/', data);
      return response.data;
    } catch (error) {
      console.error('API Error (create):', error);
      throw error;
    }
  },
};
