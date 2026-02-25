export interface SettingAnalysisPayload {
  user_id: string;
  month_index: number;
  year: number;
  is_active: boolean;
  is_recurring: boolean;
  analysis_type: string;
}
