import { useState, useEffect, useCallback } from 'react';
import { customProgressBarApi } from '../api/progressBar.api';
import {
  MiningResultItem,
  InsightProgressBar,
} from '@/features/archive-calender';

export type InsightStatus =
  | 'checking'
  | 'mining'
  | 'fetching'
  | 'completed'
  | 'insufficient'
  | 'disabled';

export const useInsightStatus = (
  userId: string,
  month: number,
  year: number,
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<InsightStatus>('checking');
  const [results, setResults] = useState<MiningResultItem[]>([]);
  const [progressData, setProgressData] = useState<InsightProgressBar | null>(
    null,
  );

  const runAutoAnalysis = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setStatus('checking');

    try {
      // 1. Ambil data Progress Bar Kustom dari API Backend
      const progress = await customProgressBarApi.getProgress(
        userId,
        month,
        year,
      );
      setProgressData(progress);

      // 2. Jika pengaturan dimatikan (is_recurring mati di bulan ini)
      if (progress.status === 'disabled') {
        console.log('🚫 Analisis Kustom Non-Aktif.');
        setStatus('disabled');
      }

      // 3. Data transaksi sudah cukup (Threshold terpenuhi)
      else if (progress.status === 'ready_to_mine') {
        console.log('🚀 Data siklus kustom cukup! (Siap Mining nanti)');

        // SEMENTARA kita set ke 'insufficient' agar komponen ProgressBar 100% tetap tampil di layar
        // Nanti saat backend Data Mining sudah siap, kita ganti bagian ini.
        setStatus('insufficient');

        /* --- KODE INI AKAN KITA PAKAI NANTI ---
        setStatus('mining');
        await customDataMiningApi.executeMining(userId, month, year);
        setStatus('fetching');
        const miningRes = await customDataMiningApi.getMiningResults(userId, month, year);
        setResults(miningRes.data || []);
        setStatus('completed');
        ---------------------------------------*/
      }

      // 4. Data sudah pernah dimining sebelumnya
      else if (progress.status === 'completed') {
        console.log('✅ Analisis Kustom sudah ada. (Menunggu UI Data Mining)');

        /* --- KODE INI JUGA AKAN KITA PAKAI NANTI ---
        setStatus('fetching');
        const miningRes = await customDataMiningApi.getMiningResults(userId, month, year);
        setResults(miningRes.data || []);
        -------------------------------------------*/
        setStatus('completed');
      }

      // 5. Data masih kurang (Progress Bar sedang berjalan)
      else {
        console.log('⏳ Data transaksi siklus kustom belum cukup.');
        setStatus('insufficient');
      }
    } catch (error) {
      console.error('Error in Custom Auto-Mining logic:', error);
      // Fallback: Agar layar tidak loading abadi jika terjadi error jaringan
      setStatus('insufficient');
    } finally {
      setLoading(false);
    }
  }, [userId, month, year]);

  useEffect(() => {
    runAutoAnalysis();
  }, [runAutoAnalysis]);

  return {
    loading,
    status,
    results,
    progressData,
  };
};
