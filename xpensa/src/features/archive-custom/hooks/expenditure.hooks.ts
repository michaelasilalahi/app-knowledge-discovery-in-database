import { useState, useEffect, useCallback } from 'react';
import { useGoogleStore } from '@/auth/google';
import { expenditureApi } from '../api/expenditure.api';
import { Expenditure } from '../types/expenditure.interface';

export const useCustomExpenditure = (startDate: string, endDate: string) => {
  const user = useGoogleStore((state) => state.user);
  const userId = user?.id;

  const [expenses, setExpenses] = useState<Expenditure[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const fetchExpenses = useCallback(async () => {
    if (!userId || !startDate || !endDate) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await expenditureApi.getCustomCycleExpenses(
        userId,
        startDate,
        endDate,
      );
      setExpenses(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Gagal mengambil data pengeluaran');
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, startDate, endDate]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleLongPress = useCallback((id: number) => {
    setIsSelectionMode((prevMode) => {
      if (!prevMode) {
        setSelectedIds([id]);
        return true;
      }
      return prevMode;
    });
  }, []);

  const handlePress = useCallback((id: number) => {
    setIsSelectionMode((currentMode) => {
      if (currentMode) {
        setSelectedIds((prevIds) => {
          if (prevIds.includes(id)) {
            return prevIds.filter((selectedId) => selectedId !== id);
          } else {
            return [...prevIds, id];
          }
        });
      }
      return currentMode;
    });
  }, []);

  useEffect(() => {
    if (isSelectionMode && selectedIds.length === 0) {
      setIsSelectionMode(false);
    }
  }, [selectedIds.length, isSelectionMode]);

  const cancelSelection = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedIds([]);
  }, []);

  const executeDelete = async () => {
    setIsDeleting(true);
    try {
      await Promise.all(
        selectedIds.map((id) => expenditureApi.deleteExpenditure(id)),
      );
      setIsSelectionMode(false);
      setSelectedIds([]);
      await fetchExpenses();
    } catch (err) {
      console.error('Gagal menghapus pengeluaran custom:', err);
      setError('Gagal menghapus data pengeluaran.');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    expenses,
    isLoading,
    error,
    refreshExpenses: fetchExpenses,
    isDeleting,
    isSelectionMode,
    selectedIds,
    handleLongPress,
    handlePress,
    cancelSelection,
    executeDelete,
  };
};
