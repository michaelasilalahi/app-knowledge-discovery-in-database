export const formatItemToMultiline = (text: string): string => {
  if (!text) return '-';
  const clean = text.replace(/[{}]/g, '');
  return clean.replace(/,\s*/g, '\n');
};
