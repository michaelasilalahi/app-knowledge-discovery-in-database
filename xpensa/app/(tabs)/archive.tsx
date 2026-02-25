import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArchiveScreen } from '@/features/archive-data-list/components/ArchiveScreen';

export default function TabArchive() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 w-[90%] mx-auto'>
        <ArchiveScreen />
      </View>
    </SafeAreaView>
  );
}
