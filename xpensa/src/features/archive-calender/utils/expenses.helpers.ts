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

// parsing judul periode menjadi 1 januari 2026
export const parsePeriodTitle = (title: string) => {
  if (!title) return null;

  const parts = title.split(' ');

  if (parts.length !== 2) return null;

  return {
    monthIndex: monthMap[parts[0]],
    year: parseInt(parts[1]),
  };
};
