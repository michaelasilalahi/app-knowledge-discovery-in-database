import { create } from 'zustand';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { expenseApi } from '../api/expense.api';
import { useGoogleStore } from '@/auth/google';
import { syncVisualizationOfAllTimeStore } from '@/features/visualization-of-all-time/middleware/visualizationOfAllTime.persist';
import { syncTodayExpenseStore } from '@/features/todays-expenses/middleware/todayExpense.persist';
import { formatDate, isSameDay } from '../utils/formatDate.helpers';
import { ExpenseState } from '../types/saveExpenseArchive.interface';

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  name: '',
  amount: null,
  date: null,
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
      date: null,
      category: '',
      label: '',
    }),

  submitExpense: async () => {
    const { name, amount, date, category, label } = get();

    const userStore = useGoogleStore.getState();
    const userId = userStore.user?.id;

    if (!userId) {
      Alert.alert('Error', 'Sesi login berakhir. Silakan login ulang.');
      return;
    }

    if (!name || !amount || !category || !date) {
      Alert.alert('Error', 'Mohon lengkapi Nama, Nominal, dan Kategori.');
      return;
    }

    set({ isLoading: true });

    try {
      const localDateString = formatDate(date);

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

      const syncTasks = [
        syncVisualizationOfAllTimeStore
          .getState()
          .syncHistoricalData(userId, targetMonth, targetYear),
      ];

      if (isSameDay(date, new Date())) {
        syncTasks.push(
          syncTodayExpenseStore.getState().syncTodayExpense(userId),
        );
      }

      await Promise.all(syncTasks);

      console.log(
        `Grafik bulan ${targetMonth}/${targetYear} berhasil diperbarui!`,
      );

      get().resetForm();
      get().fetchExpenses();

      router.back();
    } catch (error) {
      console.error('Submit Error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchExpenses: async () => {
    const userStore = useGoogleStore.getState();
    const userId = userStore.user?.id;

    if (!userId) return;

    set({ isLoading: true });

    try {
      const response = await expenseApi.getAll(userId);
      set({ expenses: response });
    } catch (error) {
      console.log('Fetch error', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
