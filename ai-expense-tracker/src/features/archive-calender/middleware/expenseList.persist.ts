import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { expenseApi } from '@/features/expenses';
import { ExpenseListPersistState } from '../types/expenses.interface';

export const useExpenseListPersistStore = create<ExpenseListPersistState>()(
  persist(
    (set) => ({
      expenses: [],
      isLoading: false,
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      fetchExpenses: async (userId: string) => {
        set({ isLoading: true });
        try {
          const response = await expenseApi.getAll(userId);
          set({ expenses: response });
        } catch (error) {
          console.error('Fetch persistence error:', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),

    {
      name: 'archive-expense-list-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
