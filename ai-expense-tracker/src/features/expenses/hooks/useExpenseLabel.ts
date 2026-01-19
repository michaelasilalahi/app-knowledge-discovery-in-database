import { useState } from 'react';
import { UseExpenseLabelReturn } from '../types/saveExpenseType';
import { useExpenseStore } from '../store/expenseStore';

export const useExpenseLabel = (): UseExpenseLabelReturn => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const label = useExpenseStore((state) => state.label);
  const setLabel = useExpenseStore((state) => state.setLabel);

  // list label
  const labelOptions = ['Makanan', 'Minuman', 'Transportasi', 'Olahraga'];

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const clearLabel = () => {
    setLabel('');
  };

  const handleSelectLabel = (selectedLabel: string) => {
    setLabel(selectedLabel);
    closeModal();
  };

  return {
    isModalVisible,
    label,
    openModal,
    closeModal,
    clearLabel,
    handleSelectLabel,
    labelOptions,
  };
};
