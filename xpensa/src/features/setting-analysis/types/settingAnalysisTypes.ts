export interface AnalysisCalenderConfig {
  label_month: string;
  recurring: boolean;
}

export interface AnalysisCustomConfig {
  day: string;
  label_month: string;
  recurring: boolean;
}

export interface AnalysisState {
  analysisCalendarConfig: AnalysisCalenderConfig | null;
  analysisCustomConfig: AnalysisCustomConfig | null;
  setAnalysisCalenderConfig: (config: AnalysisCalenderConfig | null) => void;
  setAnalysisCustomConfig: (config: AnalysisCustomConfig | null) => void;
  isAnyAnalysisActive: () => boolean;
}
