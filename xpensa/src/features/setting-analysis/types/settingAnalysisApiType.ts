export interface SettingAnalysisPayload {
  user_id: string;
  label_day?: string;
  label_month?: string;
  label_year?: number;
  is_active: boolean;
  is_recurring: boolean;
  analysis_type: string;
}
