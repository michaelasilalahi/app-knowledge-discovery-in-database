import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Guidebook } from '@/features/archive-calender/components/Guidebook';

export default function DataMiningBook() {
  return (
    <SafeAreaView className='flex-1 bg-white' edges={['bottom']}>
      <Guidebook />
      <StatusBar style='dark' />
    </SafeAreaView>
  );
}
