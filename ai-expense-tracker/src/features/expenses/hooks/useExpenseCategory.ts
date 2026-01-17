import { useState } from 'react';
import { useExpenseStore } from '../store/expenseStore';

export const useExpenseCategory = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // State global untuk data terpilih
  const category = useExpenseStore((state) => state.category);
  const setCategory = useExpenseStore((state) => state.setCategory);

  const categoryOptions: string[] = ['Keinginan', 'Kebutuhan'];

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const clearCategory = () => {
    setCategory('');
  };

  const handleSelectCategory = (item: string) => {
    setCategory(item);
    closeModal();
  };

  return {
    isModalVisible,
    category,
    openModal,
    closeModal,
    clearCategory,
    handleSelectCategory,
    categoryOptions,
  };
};
