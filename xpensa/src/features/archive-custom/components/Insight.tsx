import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import { useGoogleStore } from '@/auth/google';
import {
  ProgressBar,
  AnalysisDisabled,
  DataMiningResult,
} from '@/features/archive-calender';
import { useInsightStatus } from '../hooks/insightStatus.hooks';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface InsightProps {
  month: number;
  year: number;
}

export const Insight = ({ month, year }: InsightProps) => {
  const user = useGoogleStore((state) => state.user);
  const userId = user?.id || '';

  const { loading, status, results, progressData } = useInsightStatus(
    userId,
    month,
    year,
  );

  // tampilan loading untuk saat cek status database
  if (status === 'checking' || loading) {
    return (
      <View className='flex-1 justify-center items-center bg-white'>
        <ActivityIndicator size='large' color='black' />
        <Text className='mt-4 font-montserrat-medium text-gray-500'>
          Memeriksa Data Siklus Kustom...
        </Text>
      </View>
    );
  }

  // tampilan disabled jika status disabled
  if (status === 'disabled' && progressData) {
    return (
      <View className='flex-1 bg-white px-4'>
        <AnalysisDisabled message={progressData.message} />
      </View>
    );
  }

  // tampilan progress bar
  if (status === 'insufficient' && progressData) {
    return (
      <View className='flex-1 bg-white pt-[30px] px-4'>
        <View className='mb-4'>
          <ProgressBar progressBarData={progressData} isLoading={loading} />
        </View>
      </View>
    );
  }

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
      <Text className='text-gray-500 font-montserrat-medium'>
        Tidak ada data yang ditampilkan.
      </Text>
    </View>
  );
};
