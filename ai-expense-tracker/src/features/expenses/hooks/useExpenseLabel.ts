import { useState, useEffect } from 'react';
import { UseExpenseLabelReturn } from '../types/saveExpenseType';
import { useExpenseStore } from '../store/expenseStore';
import { ExpenseLabelEnum } from '../types/expenseLabelType';

const LABEL_OPTIONS = Object.values(ExpenseLabelEnum);

export const useExpenseLabel = (): UseExpenseLabelReturn => {
  // Global State
  const label = useExpenseStore((state) => state.label);
  const setLabel = useExpenseStore((state) => state.setLabel);

  // Local State UI
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // 3. Temporary State (Nilai sementara saat wheel diputar)
  const [tempSelected, setTempSelected] = useState<string>(
    label || LABEL_OPTIONS[0],
  );

  // Reset tempSelected ke nilai label asli saat modal dibuka
  useEffect(() => {
    if (isModalVisible) {
      setTempSelected(label || LABEL_OPTIONS[0]);
    }
  }, [isModalVisible, label]);

  const openModal = () => setIsModalVisible(true);

  const closeModal = () => setIsModalVisible(false);

  const clearLabel = () => setLabel('');

  // Handler saat user memutar wheel
  const handleWheelChange = (value: string) => {
    setTempSelected(value);
  };

  // Handler saat tombol "Pilih" ditekan
  const confirmSelection = () => {
    setLabel(tempSelected);
    closeModal();
  };

  return {
    // Data
    isModalVisible,
    label,
    labelOptions: LABEL_OPTIONS,
    tempSelected,

    // Actions
    openModal,
    closeModal,
    clearLabel,
    handleWheelChange,
    confirmSelection,
  };
};
