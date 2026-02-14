import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todaysExpensesApi } from '@/features/todays-expenses/api/todayExpense.api';
import { TodaysExpensesState } from '@/features/todays-expenses/types/todayExpense.interface';

export const syncTodayExpenseStore = create<TodaysExpensesState>()(
  persist(
    (set) => ({
      expenses: [],
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      setExpenses: (expenses) => set({ expenses }),
      syncTodayExpense: async (userId: string) => {
        try {
          const data = await todaysExpensesApi.getTodaysExpenses(userId);
          set({ expenses: data });
        } catch (error) {
          console.error('Persist store fetch error:', error);
        }
      },
      clearStorage: () => set({ expenses: [] }),
    }),
    {
      name: 'todays-expenses-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated?.(true);
        }
      },
    },
  ),
);
