export interface BarChartResponse {
  amount_needs: number;
  amount_wants: number;
  count_needs: number;
  count_wants: number;
  total_expense: number;
}

export interface BarChartData {
  value: number;
  label: string;
  frontColor: string;
  totalAmount: number;
  formattedAmount: string;
}

export interface PieChartResponse {
  data: PieChartItem[];
  total_amount: number;
  total_count: number;
}

export interface PieChartItem {
  label: string;
  amount: number;
  count: number;
}

export interface PieChartData {
  value: number;
  text?: string;
  color: string;
  label?: string;
  originalAmount: number;
  originalCount: number;
  percentage: string;
}
