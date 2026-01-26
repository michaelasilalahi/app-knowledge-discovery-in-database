import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { months, getCurrentMonthIndex } from '../utils/selectedMonth';
import { analysisConfirmationStatus } from '../utils/analysisConfirmationStatus';
import { settingAnalysisStore } from '../store/settingAnalysisStore';
import { useGoogleStore } from '@/auth/google';
import { settingAnalysisApi } from '../api/settingAnalysisApi';

export const useAnalysisCalender = () => {
  // ambil action dan data dari zustand
  const setCalendarConfig = settingAnalysisStore(
    (state) => state.setAnalysisCalenderConfig,
  );

  // source of truth sekarang (menggantikan state lokal)
  const activeConfig = settingAnalysisStore(
    (state) => state.analysisCalendarConfig,
  );

  // Ambil user_id dari google store
  const userId = useGoogleStore((state) => state.user?.id);

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

  // State baru untuk loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Menggabungkan index bulan dan status rutin ke dalam satu objek config
  useEffect(() => {
    setIsEnabled(isAnalysisActive);
  }, [isAnalysisActive]);

  const toggleSwitch = async (isOn: boolean) => {
    if (isOn) {
      // jika user menyalakan, nyalakan dulu toggle secara visual lalu buka modal
      setIsEnabled(true);
      setIsModalVisible(true);
      setSelectedMonthIndex(getCurrentMonthIndex());
      setIsRecurring(false);
    } else {
      // Matikan analysis dan kirim ke backend
      if (!userId || !activeConfig) return;

      setIsLoading(true);
      try {
        await settingAnalysisApi.save({
          user_id: userId,
          month_index: activeConfig.monthIndex,
          year: new Date().getFullYear(),
          is_active: false,
          is_recurring: activeConfig.recurring,
          analysis_type: 'calendar',
        });

        // Update UI lokal
        setIsEnabled(false);
        setCalendarConfig(null);
      } catch (error) {
        Alert.alert(`${error}: Gagal menyimpan pengaturan`);
        setIsEnabled(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const feedbackText = analysisConfirmationStatus(
    isAnalysisActive,
    activeConfig?.monthIndex ?? null,
    activeConfig?.recurring ?? false,
    months,
  );

  // Fungsi submit ke backend
  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID tidak ditemukan.');
      return;
    }

    setIsRecurring(true);
    try {
      // Kirim ke backend
      await settingAnalysisApi.save({
        user_id: userId,
        month_index: selectedMonthIndex,
        year: new Date().getFullYear(),
        is_active: true,
        is_recurring: isRecurring,
        analysis_type: 'calendar',
      });

      // Jika sukses, simpan ke store lokal Zustand
      setCalendarConfig({
        monthIndex: selectedMonthIndex,
        recurring: isRecurring,
      });

      setIsModalVisible(false);
    } catch (error) {
      Alert.alert(`${error}: Gagal menyimpan pengaturan`);
    } finally {
      setIsLoading(false);
    }
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
    isLoading,
  };
};
