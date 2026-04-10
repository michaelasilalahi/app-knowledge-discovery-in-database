import { NotificationDataExtract } from '@/features/notification-listener/types/notificationDataExtract.interface';

export const notificationDataExtract = (
  app: string,
  title: string,
  text: string,
): NotificationDataExtract => {
  // ekstrak tanggal
  const currentDate = new Date().toISOString();

  // ekstrak jumlah uang
  let extractedAmount: number | null = null;

  const fullText = `${title} ${text}`;
  const amountMatch = fullText.match(/Rp\s*([\d.]+)/i);

  if (amountMatch && amountMatch[1]) {
    const cleanNumber = amountMatch[1].replace(/\./g, '');
    extractedAmount = parseInt(cleanNumber, 10);
  }

  // ekstrak nama pengeluaran
  let extractedName = title;

  return {
    expenseName: extractedName,
    amount: extractedAmount,
    date: currentDate,
    sourceApp: app,
  };
};
