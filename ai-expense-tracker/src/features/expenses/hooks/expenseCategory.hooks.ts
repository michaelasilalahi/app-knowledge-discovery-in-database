import { useState, useEffect } from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { ExpenseCategoryEnum } from '../types/expenseCategory.enum';

const CATEGORY_OPTIONS = Object.values(ExpenseCategoryEnum);

export const useExpenseCategory = () => {
  const category = useExpenseStore((state) => state.category);
  const setCategory = useExpenseStore((state) => state.setCategory);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [tempCategory, setTempCategory] = useState<string>(category);

  useEffect(() => {
    if (isModalVisible) {
      setTempCategory(category);
    }
  }, [isModalVisible, category]);

  const openModal = () => setIsModalVisible(true);

  const closeModal = () => setIsModalVisible(false);

  const clearCategory = () => setCategory('');

  const handleSelectTempCategory = (item: string) => {
    setTempCategory(item);
  };

  const handleSubmitCategory = () => {
    setCategory(tempCategory);
    closeModal();
  };

  return {
    isModalVisible,
    category,
    tempCategory,
    categoryOptions: CATEGORY_OPTIONS,
    openModal,
    closeModal,
    clearCategory,
    handleSelectTempCategory,
    handleSubmitCategory,
  };
};
