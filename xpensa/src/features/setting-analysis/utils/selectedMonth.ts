export const months: string[] = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

/**
 * Mendapatkan index bulan saat ini (0-11)
 * Digunakan untuk default value pada state
 */
export const getCurrentMonthIndex = (): number => {
  return new Date().getMonth();
};

// mendapatkan nama bulan berdasarkan index (0-11)
export const getMonthNameByIndex = (index: number): string => {
  return months[index] || '';
};
