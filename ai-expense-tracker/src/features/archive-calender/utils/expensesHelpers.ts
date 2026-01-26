// mapping bulan ke angka
export const monthMap: { [key: string]: number } = {
  Januari: 0,
  Februari: 1,
  Maret: 2,
  April: 3,
  Mei: 4,
  Juni: 5,
  Juli: 6,
  Agustus: 7,
  September: 8,
  Oktober: 9,
  November: 10,
  Desember: 11,
};

// helpers format rupiah
export const formatRupiah = (number: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

// helpers tanggal
export const formatDate = (dateString: string): string => {
  if (!dateString) return '-';

  try {
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    const year = parseInt(parts[0]);
    const monthIndex = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);

    const dateObj = new Date(year, monthIndex, day);

    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
    }).format(dateObj);
  } catch (e) {
    return `${e}`;
  }
};

// parsing judul periode misal (Misal: "Januari 2026" -> { monthIndex: 0, year: 2026 })
export const parsePeriodTitle = (title: string) => {
  if (!title) return null;
  const parts = title.split(' ');
  if (parts.length !== 2) return null;

  return {
    monthIndex: monthMap[parts[0]], // -1 karena index array dimulai dari 0
    year: parseInt(parts[1]),
  };
};
