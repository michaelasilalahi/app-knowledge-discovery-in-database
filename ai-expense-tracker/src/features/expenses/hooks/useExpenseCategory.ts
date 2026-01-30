import { useState, useEffect } from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { ExpenseCategoryEnum } from '../types/expenseCategoryType';

const CATEGORY_OPTIONS = Object.values(ExpenseCategoryEnum);

export const useExpenseCategory = () => {
  // Global State
  const category = useExpenseStore((state) => state.category);
  const setCategory = useExpenseStore((state) => state.setCategory);

  // Local State UI
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Tempory State
  const [tempCategory, setTempCategory] = useState<string>(category);

  useEffect(() => {
    if (isModalVisible) {
      setTempCategory(category);
    }
  }, [isModalVisible, category]);

  const openModal = () => setIsModalVisible(true);

  const closeModal = () => setIsModalVisible(false);

  const clearCategory = () => setCategory('');

  // Handle Selected Category
  const handleSelectTempCategory = (item: string) => {
    setTempCategory(item);
  };

  // Handle Submit
  const handleSubmitCategory = () => {
    setCategory(tempCategory);
    closeModal();
  };

  return {
    // Data
    isModalVisible,
    category,
    tempCategory,
    categoryOptions: CATEGORY_OPTIONS,
    // Actions
    openModal,
    closeModal,
    clearCategory,
    handleSelectTempCategory,
    handleSubmitCategory,
  };
};
