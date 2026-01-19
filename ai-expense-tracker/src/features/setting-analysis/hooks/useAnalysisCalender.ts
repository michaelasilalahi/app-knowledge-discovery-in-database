import { useEffect, useState } from 'react';
import { months, getCurrentMonthIndex } from '../utils/selectedMonth';
import { analysisConfirmationStatus } from '../utils/analysisConfirmationStatus';
import { settingAnalysisStore } from '../store/settingAnalysisStore';

export const useAnalysisCalender = () => {
  // ambil action dan data dari zustand
  const setCalendarConfig = settingAnalysisStore(
    (state) => state.setAnalysisCalenderConfig,
  );

  // source of truth sekarang (menggantikan state lokal)
  const activeConfig = settingAnalysisStore(
    (state) => state.analysisCalendarConfig,
  );

  const isAnalysisActive = activeConfig !== null;

  // state toggle utama (di luar modal)
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  // state visibility modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // state toggle didalam modal
  const [isRecurring, setIsRecurring] = useState<boolean>(false);

  // state untuk menyimpan bulan yang dipilih
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(
    getCurrentMonthIndex(),
  );
  // Menggabungkan index bulan dan status rutin ke dalam satu objek config
  useEffect(() => {
    setIsEnabled(isAnalysisActive);
  }, [isAnalysisActive]);

  const toggleSwitch = (isOn: boolean) => {
    if (isOn) {
      // jika user menyalakan, nyalakan dulu toggle secara visual lalu buka modal
      setIsEnabled(true);
      setIsModalVisible(true);
      setSelectedMonthIndex(getCurrentMonthIndex());
      setIsRecurring(false);
    } else {
      // jika user mematikan, reset semua state
      setIsEnabled(false);
      setCalendarConfig(null);
    }
  };

  const feedbackText = analysisConfirmationStatus(
    isAnalysisActive,
    activeConfig?.monthIndex ?? null,
    activeConfig?.recurring ?? false,
    months,
  );

  const handleSubmit = () => {
    // pindahkan data dari state sementara ke state "terkonfirmasi"
    setCalendarConfig({
      monthIndex: selectedMonthIndex,
      recurring: isRecurring,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    if (!isAnalysisActive) setIsEnabled(false);
  };

  return {
    isEnabled,
    isModalVisible,
    toggleSwitch,
    handleCancel,

    // Props Modal
    isRecurring,
    setIsRecurring,
    months: months,
    selectedMonthIndex,
    handleSelectedMonth: setSelectedMonthIndex,
    handleSubmit,

    // Props UI
    isAnalysisActive,
    feedbackText,
  };
};
