import { useCallback, useState } from 'react';
import { ExpenseInput } from '../types';

export const useExpenseInput = () => {
  // mengelola jumlah pengeluaran
  const [amount, setAmount] = useState<ExpenseInput['amount']>(null);

  // fungsi untuk menangani perubahan text
  const handleAmountChange = useCallback((value: number | null) => {
    setAmount(value);
  }, []);

  return {
    amount,
    handleAmountChange,
  };
};
