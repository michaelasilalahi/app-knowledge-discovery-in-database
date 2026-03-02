// status konfirmasi analisis calender
export const analysisConfirmationStatus = (
  isActive: boolean,
  label_month: string | null,
  isRecurring: boolean,
): string => {
  if (!isActive || label_month === null) return '';

  if (isRecurring) {
    return `Analisis AI dilakukan bulan ${label_month} dan seterusnya`;
  } else {
    return `Analisis AI hanya dilakukan pada bulan ${label_month}`;
  }
};

// status konfirmasi analisis custom
export const daysArray = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString(),
);

export const generateCustomAnalysisFeedback = (
  activeConfig: { day: string; label_month: string; recurring: boolean } | null,
): string => {
  if (!activeConfig) return '';

  const { day, label_month, recurring } = activeConfig;

  if (recurring) {
    return `Analisis AI berjalan otomatis setiap tanggal ${day} mulai bulan ${label_month}`;
  } else {
    return `Analisis AI dijadwalkan khusus tanggal ${day} bulan ${label_month}`;
  }
};
