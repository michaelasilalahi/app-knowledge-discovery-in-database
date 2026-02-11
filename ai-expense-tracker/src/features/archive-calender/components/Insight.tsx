import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

// Components
import { ProgressBar } from './ProgressBar';
import { AnalysisDisabled } from './AnalysisDisable';
import { DataMiningResult } from './DataMiningResult';

// Hooks
import { useInsightMining } from '../hooks/useInsightMining';

// Store
import { useGoogleStore } from '@/auth/google';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Insight = () => {
  const user = useGoogleStore((state) => state.user);
  const userId = user?.id || '';

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // State untuk Indikator Halaman (1 / 10)
  const [currentIndex, setCurrentIndex] = useState(0);

  const { loading, status, results, progressData } = useInsightMining(
    userId,
    currentMonth,
    currentYear,
  );

  // State Loading/Checking
  if (status === 'checking' || status === 'mining' || status === 'fetching') {
    return (
      <View className='flex-1 justify-center items-center bg-white'>
        <ActivityIndicator size='large' color='black' />
        <Text className='mt-4 font-montserrat-medium text-gray-500'>
          {status === 'mining'
            ? 'Sedang Menganalisis Pola Belanja...'
            : 'Memeriksa Data...'}
        </Text>
      </View>
    );
  }

  // State Disabled
  if (progressData?.status === 'disabled') {
    return (
      <View className='flex-1 bg-white px-4'>
        <AnalysisDisabled message={progressData.message} />
      </View>
    );
  }

  // State Insufficient Data
  if (status === 'insufficient' && progressData) {
    return (
      <View className='flex-1 bg-white pt-[30px] px-4'>
        <View className='mb-4'>
          <ProgressBar progressBarData={progressData} isLoading={loading} />
        </View>
      </View>
    );
  }

  // State Carousel
  if (status === 'completed' && results.length > 0) {
    return (
      <View className='flex-1 bg-white'>
        <View>
          <Carousel
            loop={false}
            width={SCREEN_WIDTH}
            height={SCREEN_WIDTH * 1.5}
            autoPlay={false}
            data={results}
            scrollAnimationDuration={300}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <View>
                <DataMiningResult {...item} />
              </View>
            )}
          />
        </View>

        <View className='items-center'>
          <View className='bg-[#EAEAEA] px-6 rounded-full'>
            <Text className='font-montserrat-semibold'>
              {currentIndex + 1} / {results.length}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <Text className='text-gray-500'>Tidak ada pola ditemukan.</Text>
    </View>
  );
};
