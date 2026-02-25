const CHART_COLORS = [
  '#177AD5', // Royal Blue
  '#FFB200', // Vivid Amber
  '#ED6665', // Soft Red
  '#22C55E', // Emerald Green
  '#7B61FF', // Electric Violet
  '#FB923C', // Bright Orange
  '#44D7B6', // Medium Teal
  '#D946EF', // Fuchsia Pink
  '#79D2DE', // Sky Blue
  '#84CC16', // Lime Green
  '#E11D48', // Deep Crimson
  '#0EA5E9', // Ocean Cyan
  '#8B5CF6', // Deep Purple
  '#FACC15', // Lemon Yellow
  '#78350F', // Coffee Brown
  '#64748B', // Slate Grey
];

export const getPieColor = (index: number): string => {
  return CHART_COLORS[index % CHART_COLORS.length];
};

export const calculatePercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  const percent = (value / total) * 100;
  return `${percent.toFixed(1)}%`;
};

export const formatCurrency = (value: number): string => {
  return `Rp ${value.toLocaleString('id-ID')}`;
};
