import { useEffect } from 'react';
import { useExpenseStore } from '@/features/expenses/store/expenseStore';
import { settingAnalysisStore } from '@/features/setting-analysis';

export const useCustomAnalysisDataList = () => {
  // ambil data pengeluaran
  const { expenses, fetchExpenses, isLoading } = useExpenseStore();

  // ambil konfigurasi tanggal mulai dari setting store
  const customConfig = settingAnalysisStore(
    (state) => state.analysisCustomConfig,
  );

  // default ke tanggal 1 jika user belum atur
  const startDay = customConfig ? parseInt(customConfig.day) : 1;

  // fetch data saat hook dipanggil
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // logic grouping: siklus kustom
  const groupedData = expenses.reduce(
    (acc, curr) => {
      const date = new Date(curr.date);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      let cycleStartYear = year;
      let cycleStartMonth = month;

      // jika tanggal transaksi lebih kecil dari tanggal mulai (misal tanggal 10 < tanggal 25)
      // maka transaksi ini masuk ke siklus sebelumnya
      if (day < startDay) {
        cycleStartMonth = month - 1;
      }

      // handle mundur tahun (januari -> desember tahun lalu)
      if (cycleStartMonth < 0) {
        cycleStartMonth = 11;
        cycleStartYear = year - 1;
      }

      // tentukan tanggal awal dan akhir untuk siklus label
      const startDate = new Date(cycleStartYear, cycleStartMonth, startDay);
      const endDate = new Date(
        cycleStartYear,
        cycleStartMonth + 1,
        startDay - 1,
      );

      // format label: 25 jan - 24 feb 2026
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
      };

      const startStr = startDate.toLocaleDateString('id-ID', options);

      const endStr = endDate.toLocaleDateString('id-ID', {
        ...options,
        month: 'short',
      });
      const label = `${startStr} - ${endStr}`;
      if (!acc[label]) {
        acc[label] = 0;
      }
      acc[label] += curr.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  // mapping ke format list ui
  const listData = Object.keys(groupedData).map((key) => ({
    title: key,
    total: groupedData[key],
  }));

  return {
    listData,
    startDay,
    isLoading,
  };
};
