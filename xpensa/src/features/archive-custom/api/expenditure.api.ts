import { apiClient } from '@/config/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';

export const expenditureApi = {
  /**
   * mengambil data pengeluaran berdasarkan rentang tanggal kustom
   * @param userId ID Google User
   * @param startDate tanggal mulai dengan format YYYY-MM-DD (contoh: '2026-01-03')
   * @param endDate tanggal akhir dengan format YYYY-MM-DD (contoh: '2026-02-02')
   */
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
};
