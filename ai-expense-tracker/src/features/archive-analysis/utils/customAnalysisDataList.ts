import { useEffect } from 'react';
import {
  useExpenseStore,
  settingAnalysisDataList,
} from '../../expense/store/expenseStore';

export const useCustomAnalysisDataList = () => {
  // ambil data pengeluaran
  const { expense, fetchExpenses } = useExpenseStore();

  // ambil konfigurasi tanggal mulai dari setting store
  const customConfig = settingAnalysisDataList(
    (state) => state.customAnalysisConfig,
  );

  // default ke tanggal 1 jika user belum atur
  const startDay = customConfig ? parseInt(customConfig.startDay) : 1;

  // fetch data saat hook dipanggil
  useEffect(() => {
    fetchExpenses();
  }, []);

  // logic grouping: siklus kustom
  const groupedData = expense.reduce(
    (acc, curr) => {
      const date = new Date(curr.tanggal);
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
      // End date adalah start date + 1 bulan - 1 hari
      const endDate = new Date(
        cycleStartYear,
        cycleStartMonth + 1,
        startDay - 1,
      );

      // format label: 25 jan - 24 feb 2026
      const option;
    },
    {} as Record<string, Expense[]>,
  );
};
