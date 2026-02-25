import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnalysisState } from '../types/settingAnalysisTypes';

export const settingAnalysisStore = create<AnalysisState>()(
  persist(
    (set, get) => ({
      analysisCalendarConfig: null,
      analysisCustomConfig: null,

      setAnalysisCalenderConfig: (config) =>
        set({ analysisCalendarConfig: config }),

      setAnalysisCustomConfig: (config) =>
        set({ analysisCustomConfig: config }),

      isAnyAnalysisActive: () => {
        const { analysisCalendarConfig, analysisCustomConfig } = get();
        return analysisCalendarConfig !== null || analysisCustomConfig !== null;
      },
    }),
    {
      name: 'analysis-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
