import { useState, useEffect } from 'react';
import { months, getCurrentMonthIndex } from '../utils/selectedMonth';
import { generateCustomAnalysisFeedback } from '../utils/analysisConfirmationStatus';
import { settingAnalysisStore } from '../store/settingAnalysisStore';

export const useAnalysisCustom = () => {
  // ambil action dan data dari zustand
  const setCustomConfig = settingAnalysisStore(
    (state) => state.setAnalysisCustomConfig,
  );

  // source of truth sekarang (menggantikan state lokal)
  const activeConfig = settingAnalysisStore(
    (state) => state.analysisCustomConfig,
  );

  const isAnalysisActive = activeConfig !== null;

  // state toggle utama (di luar modal)
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  // state visibility modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // state toggle didalam modal
  const [isRecurring, setIsRecurring] = useState<boolean>(false);

  // state untuk menyimpan tanggal yang dipilih
  const [selectedDay, setSelectedDay] = useState<string>('1');

  // // state untuk menyimpan bulan yang dipilih
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(
    getCurrentMonthIndex(),
  );

  useEffect(() => {
    setIsEnabled(isAnalysisActive);
  }, [isAnalysisActive]);

  const toggleSwitch = (isOn: boolean) => {
    if (isOn) {
      setIsEnabled(true);
      setIsModalVisible(true);
      setSelectedDay('1');
      setSelectedMonthIndex(getCurrentMonthIndex());
    } else {
      setIsEnabled(false);
      setCustomConfig(null);
      setIsRecurring(false);
    }
  };

  const handleSubmit = () => {
    setCustomConfig({
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
    isAnalysisActive,
    feedbackText,
  };
};
