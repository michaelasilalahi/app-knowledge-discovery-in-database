export interface BarChartResponse {
  amount_needs: number;
  amount_wants: number;
  count_needs: number;
  count_wants: number;
  total_expense: number;
}

export interface CategoryChartData {
  value: number;
  label: string;
  frontColor: string;
  totalAmount: number;
  formattedAmount: string;
}
