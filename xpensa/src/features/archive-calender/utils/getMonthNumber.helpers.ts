export const getMonthNumber = (titleStr: string): number => {
  if (!titleStr) return 1;
  const lowerTitle = titleStr.toLowerCase();
  const months = [
    'januari',
    'februari',
    'maret',
    'april',
    'mei',
    'juni',
    'juli',
    'agustus',
    'september',
    'oktober',
    'november',
    'desember',
  ];
  const index = months.findIndex((m) => lowerTitle.includes(m));
  return index !== -1 ? index + 1 : 1;
};
