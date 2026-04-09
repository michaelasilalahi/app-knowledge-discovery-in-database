import { useState, useEffect, useCallback } from 'react';
import { insightProgressBarApi } from '../api/progressBar.api';
import { insightMiningApi } from '../api/dataMining.api';
import { MiningResultItem } from '../types/miningResultApi.interface';
import { InsightProgressBar } from '../types/progressBar.interface';

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
      const progress = await insightProgressBarApi.getProgress(
        userId,
        month,
        year,
      );
      setProgressData(progress);

      // jika pengaturan mati/diluar siklus
      if (progress.status === 'disabled') {
        setStatus('disabled');
      }

      // jika data sudah memenuhi threshold
      else if (progress.status === 'ready_to_mine') {
        console.log('🚀 Data cukup! Memulai Auto-Mining...');
        setStatus('mining');

        await insightMiningApi.executeMining(userId, month, year);

        setStatus('fetching');
        const miningRes = await insightMiningApi.getMiningResults(
          userId,
          month,
          year,
        );
        setResults(miningRes.data);
        setStatus('completed');
      }

      // jika sudah pernah di mine (tinggal tarik aja datanya)
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

      // jika threshold <= 20
      else {
        console.log('⏳ Data belum cukup.');
        setStatus('insufficient');
      }
    } catch (error) {
      console.error('error in calender auto mining logic:', error);
      setStatus('disabled');
      setProgressData({
        percentage: 0,
        isReady: false,
        message: 'siklus kustom tidak aktif untuk bulan ini',
        currentCount: 0,
        threshold: 20,
        status: 'disabled',
        result_id: null,
      });
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
