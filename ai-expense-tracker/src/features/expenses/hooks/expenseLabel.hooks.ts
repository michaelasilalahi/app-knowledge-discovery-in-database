import { useState, useEffect } from 'react';
import { UseExpenseLabelReturn } from '../types/saveExpense.interface';
import { useExpenseStore } from '../store/expenseStore';
import { ExpenseLabelEnum } from '../types/expenseLabel.enum';

const LABEL_OPTIONS = Object.values(ExpenseLabelEnum);

export const useExpenseLabel = (): UseExpenseLabelReturn => {
  const label = useExpenseStore((state) => state.label);
  const setLabel = useExpenseStore((state) => state.setLabel);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [tempSelected, setTempSelected] = useState<string>(
    label || LABEL_OPTIONS[0],
  );

  useEffect(() => {
    if (isModalVisible) {
      setTempSelected(label || LABEL_OPTIONS[0]);
    }
  }, [isModalVisible, label]);

  const openModal = () => setIsModalVisible(true);

  const closeModal = () => setIsModalVisible(false);

  const clearLabel = () => setLabel('');

  const handleWheelChange = (value: string) => {
    setTempSelected(value);
  };

  const confirmSelection = () => {
    setLabel(tempSelected);
    closeModal();
  };

  return {
    isModalVisible,
    label,
    labelOptions: LABEL_OPTIONS,
    tempSelected,
    openModal,
    closeModal,
    clearLabel,
    handleWheelChange,
    confirmSelection,
  };
};
