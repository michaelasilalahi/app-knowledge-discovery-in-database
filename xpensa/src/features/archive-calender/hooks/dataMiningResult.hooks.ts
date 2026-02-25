import { useState, useEffect, useCallback } from 'react'; // Tambah useCallback
import { insightMiningApi } from '../api/dataMiningResult.api';
import { MiningResultItem } from '../types/dataMiningResult.interface';

export const useMining = (userId: string, month: number, year: number) => {
  const [data, setData] = useState<MiningResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await insightMiningApi.getMiningResults(
        userId,
        month,
        year,
      );
      setData(result.data);
    } catch (err) {
      setError(`Gagal mengambil data mining: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, [userId, month, year]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return { data, isLoading, error, refetch: fetchResults };
};
