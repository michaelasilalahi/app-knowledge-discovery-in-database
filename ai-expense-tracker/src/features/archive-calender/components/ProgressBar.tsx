import React from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

// Hooks
import { useProgressBarLogic } from '../hooks/progressBarLogic.hooks';

// Types
import { ProgressBarProps } from '../types/progressBar.interface';

export const ProgressBar = (props: ProgressBarProps) => {
  const {
    screenWidth,
    progressValue,
    barColor,
    isHidden,
    showLoading,
    data,
    status,
  } = useProgressBarLogic(props);

  if (showLoading) {
    return (
      <View className='py-10 items-center'>
        <Text className='font-montserrat-medium text-gray-400'>
          Memuat data analisis...
        </Text>
      </View>
    );
  }

  if (isHidden || !data) return null;

  return (
    <View className='flex items-center justify-center px-5 py-[50px]'>
      <View className='flex gap-y-[30px] py-[30px] bg-gray-50 rounded-[15px] w-full border-[#AAAAAA] border-[0.5px] items-center'>
        <View className='flex gap-y-[10px]'>
          <Text className='font-montserrat-semibold text-center'>
            {status === 'ready_to_mine'
              ? 'Data Telah Terkumpul, Analisis Siap!'
              : 'Sedang Mengumpulkan Data '}
          </Text>

          <Text className='font-montserrat-medium text-center text-[#AAAAAA] px-[50px]'>
            {data.message}
          </Text>
        </View>

        <View className='flex-row gap-x-[15px] justify-center items-center'>
          <Text className='font-montserrat-medium'>{data.currentCount}</Text>
          <Progress.Bar
            progress={progressValue}
            width={screenWidth * 0.5}
            color={barColor}
            unfilledColor='#E5E7EB'
            borderWidth={0}
            height={10}
            borderRadius={10}
          />
          <Text className='font-montserrat-medium'>{data.threshold}</Text>
        </View>
      </View>
    </View>
  );
};
