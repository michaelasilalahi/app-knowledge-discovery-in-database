import { useState, useEffect, useCallback } from 'react';
import { insightProgressBarApi } from '../api/InsightProgressBar.api';
import { insightMiningApi } from '../api/dataMiningResult.api';
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
      // cek status data apakah sudah memenuhi threshold
      const progress = await insightProgressBarApi.getProgress(
        userId,
        month,
        year,
      );
      setProgressData(progress);

      // data cukup tapi belum mining (backend status: ready_to_mine)
      if (progress.status === 'ready_to_mine') {
        console.log('🚀 Data cukup! Memulai Auto-Mining...');
        setStatus('mining');

        // eksekusi mining
        await insightMiningApi.executeMining(userId, month, year);

        // setelah selesai mining, langsung ambil hasilnya
        setStatus('fetching');
        const miningRes = await insightMiningApi.getMiningResults(
          userId,
          month,
          year,
        );
        setResults(miningRes.data);
        setStatus('completed');
      }

      // data sudah pernah dimining sebelumnya (backend status: completed)
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

      // data belum cukup
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
