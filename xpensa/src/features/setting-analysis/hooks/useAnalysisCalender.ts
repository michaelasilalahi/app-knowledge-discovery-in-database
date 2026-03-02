import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useGoogleStore } from '@/auth/google';
import { settingAnalysisStore } from '../store/settingAnalysisStore';
import { settingAnalysisApi } from '../api/settingAnalysisApi';
import { analysisConfirmationStatus } from '../utils/analysisConfirmationStatus.helpers';
import { selectedMonth, monthList } from '../utils/selectedMonth.helpers';
import { Month } from '../types/month.enum';

export const useAnalysisCalender = () => {
  const setCalendarConfig = settingAnalysisStore(
    (state) => state.setAnalysisCalenderConfig,
  );
  const setCustomConfig = settingAnalysisStore(
    (state) => state.setAnalysisCustomConfig,
  );
  const activeConfig = settingAnalysisStore(
    (state) => state.analysisCalendarConfig,
  );

  const userId = useGoogleStore((state) => state.user?.id);
  const isAnalysisActive = activeConfig !== null;

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [selectedMonthValue, setSelectedMonthValue] =
    useState<Month>(selectedMonth());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsEnabled(isAnalysisActive);
  }, [isAnalysisActive]);

  const toggleSwitch = async (isOn: boolean) => {
    if (isOn) {
      setIsEnabled(true);
      setIsModalVisible(true);
      setSelectedMonthValue(selectedMonth());
      setIsRecurring(false);
    } else {
      if (!userId || !activeConfig) return;
      setIsLoading(true);
      try {
        await settingAnalysisApi.save({
          user_id: userId,
          label_month: activeConfig.label_month,
          label_year: new Date().getFullYear(),
          is_active: false,
          is_recurring: false,
          analysis_type: 'non_active',
        });
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

  const handleSubmit = async () => {
    if (!userId) return Alert.alert('Error', 'User ID tidak ditemukan.');
    setIsLoading(true);
    try {
      await settingAnalysisApi.save({
        user_id: userId,
        label_month: selectedMonthValue,
        label_year: new Date().getFullYear(),
        is_active: true,
        is_recurring: isRecurring,
        analysis_type: 'calendar',
      });
      setCustomConfig(null);
      setCalendarConfig({
        label_month: selectedMonthValue,
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

  const feedbackText = analysisConfirmationStatus(
    isAnalysisActive,
    activeConfig?.label_month ?? null,
    activeConfig?.recurring ?? false,
  );

  return {
    isEnabled,
    isModalVisible,
    toggleSwitch,
    handleCancel,
    isRecurring,
    setIsRecurring,
    months: monthList,
    selectedMonthValue,
    handleSelectedMonth: setSelectedMonthValue,
    handleSubmit,
    isAnalysisActive,
    feedbackText,
    isLoading,
  };
};
