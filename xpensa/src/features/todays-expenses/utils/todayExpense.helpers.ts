export const formatRupiah = (number: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

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
      year: 'numeric',
      month: 'long',
      weekday: 'long',
      day: 'numeric',
    }).format(dateObj);
  } catch (e) {
    return `${e}`;
  }
};
