import { useState } from 'react';
import { ExpenseNameInput } from '../types';

export const useExpenseName = () => {
  const [expenseName, setExpenseName] =
    useState<ExpenseNameInput['expenseName']>('');

  const handleExpenseNameChange = (text: string) => {
    setExpenseName(text);
  };

  return {
    expenseName,
    handleExpenseNameChange,
  };
};
