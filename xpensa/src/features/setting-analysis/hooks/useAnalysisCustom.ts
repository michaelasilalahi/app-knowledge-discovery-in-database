import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useGoogleStore } from '@/auth/google';
import { settingAnalysisStore } from '../store/settingAnalysisStore';
import { settingAnalysisApi } from '../api/settingAnalysisApi';
import { generateCustomAnalysisFeedback } from '../utils/analysisConfirmationStatus.helpers';
import { selectedMonth, monthList } from '../utils/selectedMonth.helpers';
import { Month } from '../types/month.enum';

export const useAnalysisCustom = () => {
  const setCustomConfig = settingAnalysisStore(
    (state) => state.setAnalysisCustomConfig,
  );
  const setCalendarConfig = settingAnalysisStore(
    (state) => state.setAnalysisCalenderConfig,
  );
  const activeConfig = settingAnalysisStore(
    (state) => state.analysisCustomConfig,
  );

  const userId = useGoogleStore((state) => state.user?.id);
  const isAnalysisActive = activeConfig !== null;

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string>('1');
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
      setSelectedDay('1');
      setSelectedMonthValue(selectedMonth());
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
        setCustomConfig(null);
      } catch (error) {
        Alert.alert(`${error}: gagal mematikan pengaturan`);
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
        label_day: selectedDay,
        label_month: selectedMonthValue,
        label_year: new Date().getFullYear(),
        is_active: true,
        is_recurring: isRecurring,
        analysis_type: 'custom',
      });
      setCalendarConfig(null);
      setCustomConfig({
        day: selectedDay,
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
    if (!activeConfig) setIsEnabled(false);
    setIsModalVisible(false);
  };

  const feedbackText = generateCustomAnalysisFeedback(activeConfig);

  return {
    isEnabled,
    isModalVisible,
    selectedDay,
    setSelectedDay,
    selectedMonthValue,
    handleSelectedMonth: setSelectedMonthValue,
    isRecurring,
    setIsRecurring,
    toggleSwitch,
    handleSubmit,
    handleCancel,
    months: monthList,
    isAnalysisActive,
    feedbackText,
    isLoading,
  };
};
