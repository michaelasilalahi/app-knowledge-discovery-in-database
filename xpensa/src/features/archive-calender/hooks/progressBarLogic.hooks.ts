import { Dimensions } from 'react-native';
import { ProgressBarProps } from '../types/progressBar.interface';
import { getProgressBarColor } from '../utils/progressBar.helpers';

export const useProgressBarLogic = ({
  progressBarData,
  isLoading,
}: ProgressBarProps) => {
  const screenWidth = Dimensions.get('window').width;

  // Logic pengecekan tampilan
  const isHidden = !progressBarData || progressBarData.status === 'disabled';
  const showLoading = isLoading && !progressBarData;

  // Perhitungan nilai progress bar data
  const progressValue = progressBarData ? progressBarData.percentage / 100 : 0;

  const barColor = getProgressBarColor(
    progressBarData?.isReady ?? false,
    progressBarData?.status,
  );

  return {
    screenWidth,
    progressValue,
    barColor,
    isHidden,
    showLoading,
    data: progressBarData,
    status: progressBarData?.status,
  };
};
