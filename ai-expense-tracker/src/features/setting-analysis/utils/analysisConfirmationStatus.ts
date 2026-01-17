/**
 * Fungsi untuk menentukan status konfirmasi analisis calender
 */
export const analysisConfirmationStatus = (
  isActive: boolean,
  monthIndex: number | null,
  isRecurring: boolean,
  monthList: string[],
): string => {
  // 1. jika analisis belum diaktifkan, kembalikan status "off"
  if (!isActive || monthIndex === null) return '';
  // 2. ambil nama bulan dari array (pastikan aman dari undefined)
  const monthName = monthList[monthIndex] || '';

  // 3. cek apakah mode berulang (recurring) aktif
  if (isRecurring) {
    return `Analisis AI dilakukan bulan ${monthName} dan seterusnya`;
  } else {
    return `Analisis AI hanya dilakukan pada bulan ${monthName}`;
  }
};

/**
 * Fungsi untuk menentukan status konfirmasi analisis custom
 */
export const daysArray = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString(),
);

export const generateCustomAnalysisFeedback = (
  activeConfig: { day: string; month: string; recurring: boolean } | null,
): string => {
  if (!activeConfig) return '';

  const { day, month, recurring } = activeConfig;

  if (recurring) {
    return `Analisis AI berjalan otomatis setiap tanggal ${day} mulai bulan ${month}`;
  } else {
    return `Analisis AI dijadwalkan khusus tanggal ${day} bulan ${month}`;
  }
};
