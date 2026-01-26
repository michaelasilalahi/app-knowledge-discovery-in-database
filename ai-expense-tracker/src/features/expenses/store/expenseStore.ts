import { create } from 'zustand';
import { Alert } from 'react-native';
import { expenseApi } from '../api/expenseApi';
import { router } from 'expo-router';
import { ExpenseState } from '../types/saveExpenseArchive';
import { useGoogleStore } from '@/auth/google';

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  // initial Values
  name: '',
  amount: null,
  date: new Date(),
  category: '',
  label: '',
  isLoading: false,
  expenses: [],

  // setters implementation
  setName: (name) => set({ name }),
  setAmount: (amount) => set({ amount }),
  setDate: (date) => set({ date }),
  setCategory: (category) => set({ category }),
  setLabel: (label) => set({ label }),

  // reset form setelah simpan
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
    // 1. Ambil data terbaru dari state menggunakan get()
    const { name, amount, date, category, label } = get();

    // 2. Ambil User ID dari Google Store (Zustand)
    const userStore = useGoogleStore.getState();
    const userId = userStore.user?.id;

    if (!userId) {
      Alert.alert('Error', 'Sesi login berakhir. Silakan login ulang.');
      return;
    }

    // 3. Validasi form
    if (!name || !amount || !category) {
      Alert.alert('Error', 'Mohon lengkapi Nama, Nominal, dan Kategori.');
      return;
    }

    set({ isLoading: true });

    try {
      // kirim ke API
      await expenseApi.create({
        user_id: userId,
        type_of_expenditure: name,
        amount: Number(amount),
        date: date.toISOString().split('T')[0],
        category: category,
        label: label || '-',
      });

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
