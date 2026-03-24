import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import { useGoogleStore } from '@/auth/google';
import { ProgressBar, AnalysisDisabled } from '@/features/archive-calender';
import { useInsightStatus } from '../hooks/insightStatus.hooks';

export const Insight = () => {
  const user = useGoogleStore((state) => state.user);
  const userId = user?.id || '';

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const { loading, status, progressData } = useInsightStatus(
    userId,
    currentMonth,
    currentYear,
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

  if (status === 'mining' || status === 'fetching' || status === 'completed') {
    return (
      <View className='flex-1 justify-center items-center bg-white px-5'>
        <Text className='font-montserrat-semibold text-center text-green-600 mb-2'>
          Progress Bar Penuh! 🎉
        </Text>
        <Text className='font-montserrat-medium text-gray-500 text-center'>
          Data transaksi siklus kustom Anda sudah cukup. Kita siap masuk ke
          tahap Data Mining (Association Rule Learning).
        </Text>
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
