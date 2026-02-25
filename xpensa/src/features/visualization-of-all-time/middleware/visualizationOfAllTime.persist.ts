import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { visualizationOfAllTimeApi } from '@/features/visualization-of-all-time/api/visualizationOfAllTime.api';
import { transformToLineData } from '../utils/visualizationOfAllTime.helpers';
import { VisualizationState } from '../types/visualizationOfAllTime.interface';

export const syncVisualizationOfAllTimeStore = create<VisualizationState>()(
  persist(
    (set) => ({
      lineDataNeeds: [],
      lineDataWants: [],
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
      syncHistoricalData: async (
        userId: string,
        month: number,
        year: number,
      ) => {
        try {
          const response = await visualizationOfAllTimeApi.getHistoricalData(
            userId,
            month,
            year,
          );

          if (response && response.data) {
            const { needsData, wantsData } = transformToLineData(
              response.data,
              month,
              year,
            );

            set({
              lineDataNeeds: needsData,
              lineDataWants: wantsData,
            });
          }
        } catch (error) {
          console.error('Sync visualization error:', error);
        }
      },
      resetVisualization: () => set({ lineDataNeeds: [], lineDataWants: [] }),
    }),
    {
      name: 'visualization-all-time-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated?.(true);
        }
      },
    },
  ),
);
