export interface PieChartItem {
  label: string;
  amount: number;
  count: number;
}

export interface PieChartResponse {
  data: PieChartItem[];
  total_amount: number;
  total_count: number;
}

export interface GiftedPieChartData {
  value: number;
  text?: string;
  color: string;
  label?: string;
  originalAmount: number;
  originalCount: number;
  percentage: string;
}
