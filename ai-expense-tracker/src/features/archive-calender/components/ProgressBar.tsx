import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

// Utils
import { getProgressBarColor } from '../utils/insightProgressBarColorHelpers';

// Types
import { InsightProgressBar } from '../types/insightProgressBarTypes';

interface Props {
  progressBarData: InsightProgressBar | null;
  isLoading: boolean;
}

export const ProgressBar = ({ progressBarData, isLoading }: Props) => {
  const screenWidth = Dimensions.get('window').width;

  if (isLoading && !progressBarData) {
    return (
      <View className='py-10 items-center'>
        <Text className='font-montserrat-medium text-gray-400'>
          Memuat data analisis...
        </Text>
      </View>
    );
  }

  if (!progressBarData) return null;

  const { percentage, isReady, message, currentCount, threshold, status } =
    progressBarData;

  const progressValue = percentage / 100;
  const barColor = getProgressBarColor(isReady);

  if (status === 'disabled') return null;

  return (
    <View className='flex items-center justify-center px-5 py-[50px]'>
      <View className='flex gap-y-[30px] py-[30px] bg-gray-50 rounded-[15px] w-full border-[#AAAAAA] border-[0.5px] items-center'>
        <View className='flex gap-y-[10px]'>
          <Text className='font-montserrat-semibold text-center'>
            {status === 'ready_to_mine'
              ? 'Analisis Siap!'
              : 'AI Sedang Belajar'}
          </Text>

          <Text className='font-montserrat-medium text-center text-[12px] text-[#AAAAAA]'>
            {message}
          </Text>
        </View>

        <View className='flex-row gap-x-[15px] justify-center items-center'>
          <Text className='font-montserrat-medium'>{currentCount}</Text>
          <Progress.Bar
            progress={progressValue}
            width={screenWidth * 0.5}
            color={barColor}
            unfilledColor='#E5E7EB'
            borderWidth={0}
            height={10}
            borderRadius={10}
          />
          <Text className='font-montserrat-medium'>{threshold}</Text>
        </View>
      </View>
    </View>
  );
};
