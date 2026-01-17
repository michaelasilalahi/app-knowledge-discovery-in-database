import { useExpenseStore } from '../store/expenseStore';

export const useExpenseName = () => {
  // Ambil state 'name' dan function 'setName' dari store
  const expenseName = useExpenseStore((state) => state.name);
  const setName = useExpenseStore((state) => state.setName);

  const handleExpenseNameChange = (text: string) => {
    setName(text);
  };

  return {
    expenseName,
    handleExpenseNameChange,
  };
};
