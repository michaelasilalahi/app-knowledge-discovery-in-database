export interface InsightProgressBar {
  status: 'progress' | 'completed' | 'disabled' | 'ready_to_mine';
  result_id?: number | null;
  currentCount: number;
  threshold: number;
  percentage: number;
  isReady: boolean;
  message: string;
}
