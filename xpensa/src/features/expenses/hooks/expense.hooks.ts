import { useExpenseStore } from '../store/expenseStore';

export const useExpenseInput = () => {
  const amount = useExpenseStore((state) => state.amount);
  const setAmount = useExpenseStore((state) => state.setAmount);

  const handleAmountChange = (value: number | null) => {
    setAmount(value);
  };

  return {
    amount,
    handleAmountChange,
  };
};
