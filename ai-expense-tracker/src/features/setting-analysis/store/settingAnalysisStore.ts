import { create } from 'zustand';
import { AnalysisState } from '../types/settingAnalysisTypes';

export const settingAnalysisStore = create<AnalysisState>((set, get) => ({
  analysisCalendarConfig: null,
  analysisCustomConfig: null,

  setAnalysisCalenderConfig: (config) =>
    set({ analysisCalendarConfig: config }),
  setAnalysisCustomConfig: (config) => set({ analysisCustomConfig: config }),

  isAnyAnalysisActive: () => {
    const { analysisCalendarConfig, analysisCustomConfig } = get();
    // analisis dianggap aktif jika salah satu konfigurasi tidak null
    return analysisCalendarConfig !== null || analysisCustomConfig !== null;
  },
}));
