import { useState } from 'react';
import { months, getCurrentMonthIndex } from '../utils/selectedMonth';
import { generateCustomAnalysisFeedback } from '../utils/analysisConfirmationStatus';

export const useAnalysisCustom = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // State Seleksi (Draft di dalam Modal)
  const [selectedDay, setSelectedDay] = useState<string>('1');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(
    getCurrentMonthIndex(),
  );

  // State terkonfirmasi (data final)
  const [activeConfig, setActiveConfig] = useState<{
    day: string;
    month: string;
    recurring: boolean;
  } | null>(null);

  const toggleSwitch = (isOn: boolean) => {
    if (isOn) {
      setIsEnabled(true);
      setIsModalVisible(true);
    } else {
      setIsEnabled(false);
      setActiveConfig(null);
      setIsRecurring(false);
    }
  };

  const handleSubmit = () => {
    setActiveConfig({
      day: selectedDay,
      month: months[selectedMonthIndex],
      recurring: isRecurring,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    if (!activeConfig) setIsEnabled(false);
    setIsModalVisible(false);
  };

  const feedbackText = generateCustomAnalysisFeedback(activeConfig);

  return {
    isEnabled,
    isModalVisible,
    selectedDay,
    setSelectedDay,
    selectedMonthIndex,
    setSelectedMonthIndex,
    isRecurring,
    setIsRecurring,
    toggleSwitch,
    handleSubmit,
    handleCancel,
    months,
    feedbackText,
  };
};
