export interface AnalysisCalenderConfig {
  monthIndex: number;
  recurring: boolean;
}

export interface AnalysisCustomConfig {
  day: string;
  month: string;
  recurring: boolean;
}

export interface AnalysisState {
  analysisCalendarConfig: AnalysisCalenderConfig | null;
  analysisCustomConfig: AnalysisCustomConfig | null;

  // actions
  setAnalysisCalenderConfig: (config: AnalysisCalenderConfig | null) => void;
  setAnalysisCustomConfig: (config: AnalysisCustomConfig | null) => void;

  // derived Logic
  // fungsi untuk mengecek apakah ada analisis yang aktif
  isAnyAnalysisActive: () => boolean;
}
