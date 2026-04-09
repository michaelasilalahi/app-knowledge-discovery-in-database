export type ProgressStatus =
  | 'progress'
  | 'completed'
  | 'disabled'
  | 'ready_to_mine';

export type InsightStatus =
  | 'checking'
  | 'mining'
  | 'fetching'
  | 'completed'
  | 'insufficient'
  | 'disabled';

export interface InsightProgressBar {
  percentage: number;
  isReady: boolean;
  message: string;
  currentCount: number;
  threshold: number;
  status: ProgressStatus;
  result_id?: number | null;
}

export interface ProgressBarProps {
  progressBarData: InsightProgressBar | null;
  isLoading: boolean;
}
