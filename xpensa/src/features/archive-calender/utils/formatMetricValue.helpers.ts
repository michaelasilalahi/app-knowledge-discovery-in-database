export const formatMetricValue = (value: number): string => {
  if (value === undefined || value === null) return '-';
  if (Number.isInteger(value)) return value.toString();
  return value.toString().length > 10 ? value.toFixed(8) : value.toString();
};
