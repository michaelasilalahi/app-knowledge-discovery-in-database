import { create } from 'zustand';
import { Alert } from 'react-native';
import { expenseApi } from '../api/expenseApi';
import { router } from 'expo-router';
import { ExpenseState } from '../types/saveExpenseArchive';

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
    // Ambil data terbaru dari state menggunakan get()
    const { name, amount, date, category, label } = get();

    // validasi
    if (!name || !amount || !category) {
      Alert.alert('Gagal', 'Mohon lengkapi Nama, Nominal, dan Kategori.');
      return;
    }

    set({ isLoading: true });

    try {
      // kirim ke API
      await expenseApi.create({
        jenis_pengeluaran: name,
        nominal: amount,
        tanggal: date.toISOString().split('T')[0],
        kategori: category,
        label: label || 'Umum',
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
    try {
      const response = await expenseApi.getAll();
      set({ expenses: response });
    } catch (error) {
      console.log('Fetch error', error);
    }
  },
}));
