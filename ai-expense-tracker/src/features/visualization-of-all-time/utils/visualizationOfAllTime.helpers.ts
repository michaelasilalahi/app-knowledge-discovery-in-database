import {
  HistoricalDataPoint,
  GiftedLineChartItem,
} from '@/features/visualization-of-all-time/types/visualizationOfAllTime.interface';

export const formatCompactCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `Rp${(value / 1000000).toFixed(1)}jt`;
  } else if (value >= 1000) {
    return `Rp${(value / 1000).toFixed(0)}rb`;
  }
  return `Rp${value}`;
};

export const formatCurrency = (value: number): string => {
  return `Rp ${value.toLocaleString('id-ID')}`;
};

export const transformToLineData = (
  data: HistoricalDataPoint[],
  month: number,
  year: number,
) => {
  const needsData: GiftedLineChartItem[] = [];
  const wantsData: GiftedLineChartItem[] = [];

  const daysInMonth = new Date(year, month, 0).getDate();

  const dataMap = new Map<string, HistoricalDataPoint>();
  if (data && Array.isArray(data)) {
    data.forEach((item) => {
      dataMap.set(item.date_label, item);
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayLabel = i.toString();
    const existingData = dataMap.get(dayLabel);

    needsData.push({
      value: existingData ? existingData.amount_needs : 0,
      label: dayLabel,
      textColor: '#177AD5',
    });

    wantsData.push({
      value: existingData ? existingData.amount_wants : 0,
      label: dayLabel,
      textColor: '#ED6665',
    });
  }

  return { needsData, wantsData };
};
