import { TextStyle } from 'react-native';

export interface HistoricalDataPoint {
  date_label: string;
  timestamp: string;
  amount_needs: number;
  amount_wants: number;
}

export interface LineChartResponse {
  data: HistoricalDataPoint[];
}

export interface GiftedLineChartItem {
  value: number;
  label: string;
  dataPointText?: string;
  labelTextStyle?: TextStyle;
  hideDataPoint?: boolean;
  textColor?: string;
  originalAmount?: number;
}

export interface VisualizationState {
  lineDataNeeds: GiftedLineChartItem[];
  lineDataWants: GiftedLineChartItem[];
  syncHistoricalData: (
    userId: string,
    month: number,
    year: number,
  ) => Promise<void>;
  resetVisualization: () => void;
}
