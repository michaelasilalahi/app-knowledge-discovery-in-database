import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import { useGoogleStore } from '@/auth/google';
import { ProgressBar } from './ProgressBar';
import { AnalysisDisabled } from './AnalysisDisable';
import { DataMiningResult } from './DataMiningResult';
import { useInsightMining } from '../hooks/insightMining.hooks';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Insight = () => {
  const user = useGoogleStore((state) => state.user);
  const userId = user?.id || '';

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

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
        <View style={{ flex: 1 }}>
          <FlatList
            data={results}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
                <DataMiningResult {...item} />
              </View>
            )}
          />
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
