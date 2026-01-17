import { useState } from 'react';
import { months, getCurrentMonthIndex } from '../utils/selectedMonth';
import { analysisConfirmationStatus } from '../utils/analysisConfirmationStatus';

export const useAnalysisCalender = () => {
  // state toggle utama (di luar modal)
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  // state visibility modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // state toggle didalam modal
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  // state untuk menyimpan apakah mode 'Increment Active' berhasil diaktifkan (database)
  // state untuk menyimpan tanggal yang dipilih
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(
    getCurrentMonthIndex(),
  );
  // State ini hanya berubah ketika tombol "Submit" ditekan
  const [confirmedMonthIndex, setConfirmedMonthIndex] = useState<number | null>(
    null,
  );
  // State ini hanya berubah ketika tombol "Submit" ditekan
  const [confirmedIsRecurring, setConfirmedIsRecurring] =
    useState<boolean>(false);
  // state penanda bahwa user sudah pernah melakukan submit setidaknya sekali
  const [isAnalysisActive, setIsAnalysisActive] = useState<boolean>(false);

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
      setIsAnalysisActive(false);
      setConfirmedMonthIndex(null);
    }
  };

  const handleSelectedMonth = (index: number) => {
    setSelectedMonthIndex(index);
  };

  const feedbackText = analysisConfirmationStatus(
    isAnalysisActive,
    confirmedMonthIndex,
    confirmedIsRecurring,
    months,
  );

  const handleSubmit = () => {
    // pindahkan data dari state sementara ke state "terkonfirmasi"
    setConfirmedMonthIndex(selectedMonthIndex);
    setConfirmedIsRecurring(isRecurring);
    // aktifkan status analisis
    setIsAnalysisActive(true);
    // tutup modal setelah submit
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // jika user membatalkan di modal, kembalikan toggle ke posisi off
    setIsModalVisible(false);
    setIsEnabled(false);
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
    handleSelectedMonth,
    handleSubmit,

    // Props UI
    isAnalysisActive,
    feedbackText,
  };
};
