import { useState, useEffect, useCallback } from 'react';
import { insightProgressBarApi } from '../api/InsightProgressBar.api';
import { insightMiningApi } from '../api/insightMining.api';
import { MiningResultItem } from '../types/miningResultApi.interface';
import { InsightProgressBar } from '../types/progressBar.interface';

export const useInsightMining = (
  userId: string,
  month: number,
  year: number,
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<
    'checking' | 'mining' | 'fetching' | 'completed' | 'insufficient'
  >('checking');
  const [results, setResults] = useState<MiningResultItem[]>([]);
  const [progressData, setProgressData] = useState<InsightProgressBar | null>(
    null,
  );

  const runAutoAnalysis = useCallback(async () => {
    setLoading(true);
    setStatus('checking');

    try {
      // 1. Cek Status Data (Apakah cukup > 20?)
      const progress = await insightProgressBarApi.getProgress(
        userId,
        month,
        year,
      );
      setProgressData(progress);

      // Skenario A: Data Cukup TAPI Belum Mining (Backend status: ready_to_mine)
      if (progress.status === 'ready_to_mine') {
        console.log('🚀 Data cukup! Memulai Auto-Mining...');
        setStatus('mining');

        // Eksekusi Mining
        await insightMiningApi.executeMining(userId, month, year);

        // Setelah selesai mining, langsung ambil hasilnya
        setStatus('fetching');
        const miningRes = await insightMiningApi.getMiningResults(
          userId,
          month,
          year,
        );
        setResults(miningRes.data);
        setStatus('completed');
      }

      // Skenario B: Data Sudah Pernah Dimining Sebelumnya (Backend status: completed)
      else if (progress.status === 'completed') {
        console.log('✅ Analisis sudah ada. Mengambil data...');
        setStatus('fetching');
        const miningRes = await insightMiningApi.getMiningResults(
          userId,
          month,
          year,
        );
        setResults(miningRes.data);
        setStatus('completed');
      }

      // Skenario C: Data Belum Cukup
      else {
        console.log('⏳ Data belum cukup.');
        setStatus('insufficient');
      }
    } catch (error) {
      console.error('Error in Auto-Mining logic:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, month, year]);

  // Jalankan otomatis saat hook dipanggil (saat layar dibuka)
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
