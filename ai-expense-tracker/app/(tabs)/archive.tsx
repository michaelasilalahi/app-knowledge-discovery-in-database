import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArchiveAnalysisCalender,
  ArchiveAnalysisCustom,
} from '@/features/archive-analysis';
import { useArchiveView } from '@/features/archive-analysis/hooks/useArchiveView';

export default function TabArchive() {
  const { viewMode, handleSwitchView } = useArchiveView();

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 w-[90%] mx-auto'>
        {viewMode === 'SCREEN_ARCHIVE_ANALYSIS_CALENDER' ? (
          <ArchiveAnalysisCalender onSwitch={handleSwitchView} />
        ) : (
          <ArchiveAnalysisCustom onSwitch={handleSwitchView} />
        )}
      </View>
    </SafeAreaView>
  );
}
