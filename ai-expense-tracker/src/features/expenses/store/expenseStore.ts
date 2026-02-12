import { create } from 'zustand';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { expenseApi } from '../api/expenseApi';
import { ExpenseState } from '../types/saveExpenseArchive';
import { useGoogleStore } from '@/auth/google';
import { syncVisualizationOfAllTimeStore } from '@/features/visualization-of-all-time/middleware/visualizationOfAllTime.persist';
import { syncTodayExpenseStore } from '@/features/todays-expenses/middleware/todayExpense.persist';

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  name: '',
  amount: null,
  date: new Date(),
  category: '',
  label: '',
  isLoading: false,
  expenses: [],

  setName: (name) => set({ name }),
  setAmount: (amount) => set({ amount }),
  setDate: (date) => set({ date }),
  setCategory: (category) => set({ category }),
  setLabel: (label) => set({ label }),

  resetForm: () =>
    set({
      name: '',
      amount: null,
      date: new Date(),
      category: '',
      label: '',
    }),

  // Logika Submit ke FastAPI
  submitExpense: async () => {
    const { name, amount, date, category, label } = get();

    const userStore = useGoogleStore.getState();
    const userId = userStore.user?.id;

    if (!userId) {
      Alert.alert('Error', 'Sesi login berakhir. Silakan login ulang.');
      return;
    }

    if (!name || !amount || !category) {
      Alert.alert('Error', 'Mohon lengkapi Nama, Nominal, dan Kategori.');
      return;
    }

    set({ isLoading: true });

    try {
      // Kemungkinan terjadi bugsss
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const localDateString = `${year}-${month}-${day}`;

      await expenseApi.create({
        user_id: userId,
        type_of_expenditure: name,
        amount: Number(amount),
        date: localDateString,
        category: category,
        label: label || '-',
      });

      const targetMonth = date.getMonth() + 1;
      const targetYear = date.getFullYear();

      await syncVisualizationOfAllTimeStore
        .getState()
        .syncHistoricalData(userId, targetMonth, targetYear);

      const today = new Date();
      const isInputToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      if (isInputToday) {
        await syncTodayExpenseStore.getState().syncTodayExpense(userId);
        console.log('List pengeluaran hari ini berhasil diperbarui!');
      }

      console.log(
        `Grafik bulan ${targetMonth}/${targetYear} berhasil diperbarui!`,
      );

      Alert.alert('Sukses', 'Data berhasil disimpan!');

      get().resetForm();
      get().fetchExpenses();

      router.back();
    } catch (error) {
      console.error('Submit Error:', error);
      Alert.alert('Error', 'Gagal menyimpan data ke server.');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchExpenses: async () => {
    const userStore = useGoogleStore.getState();
    const userId = userStore.user?.id;

    if (!userId) return;

    try {
      const response = await expenseApi.getAll(userId);
      set({ expenses: response });
    } catch (error) {
      console.log('Fetch error', error);
    }
  },
}));
