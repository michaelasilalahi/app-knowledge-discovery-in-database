import { create } from 'zustand';
import { Alert } from 'react-native';
import { expenseApi } from '../api/expenseApi';
import { router } from 'expo-router';

interface ExpenseState {
  // State Data
  name: string;
  amount: number | null;
  date: Date;
  category: string;
  label: string;
  isLoading: boolean;

  // Actions (Setter untuk mengubah data)
  setName: (name: string) => void;
  setAmount: (amount: number | null) => void;
  setDate: (date: Date) => void;
  setCategory: (category: string) => void;
  setLabel: (label: string) => void;

  // Action Utama (Simpan ke Server)
  submitExpense: () => Promise<void>;
  resetForm: () => void;
}

// 2. Buat Store
export const useExpenseStore = create<ExpenseState>((set, get) => ({
  // Initial Values
  name: '',
  amount: null,
  date: new Date(),
  category: '',
  label: '',
  isLoading: false,

  // Setters implementation
  setName: (name) => set({ name }),
  setAmount: (amount) => set({ amount }),
  setDate: (date) => set({ date }),
  setCategory: (category) => set({ category }),
  setLabel: (label) => set({ label }),

  // Reset Form setelah simpan
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

    // Validasi
    if (!name || !amount || !category) {
      Alert.alert('Gagal', 'Mohon lengkapi Nama, Nominal, dan Kategori.');
      return;
    }

    set({ isLoading: true });

    try {
      // Kirim ke API yang sudah Anda buat sebelumnya
      await expenseApi.create({
        jenis_pengeluaran: name,
        nominal: amount,
        tanggal: date.toISOString().split('T')[0], // Format YYYY-MM-DD
        kategori: category,
        label: label || 'Umum',
      });

      Alert.alert('Sukses', 'Data berhasil disimpan!');
      get().resetForm(); // Bersihkan form
      router.back(); // Kembali ke halaman sebelumnya
    } catch (error) {
      console.error('Submit Error:', error);
      Alert.alert('Error', 'Gagal menyimpan data ke server.');
    } finally {
      set({ isLoading: false });
    }
  },
}));
