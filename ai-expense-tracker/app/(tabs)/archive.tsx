import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CalendarAnalysisExpenditureList,
  CustomAnalysisExpenditureList,
} from '@/features/archive-data-list';
import { useArchiveView } from '@/features/archive-data-list/hooks/useArchiveView';

export default function TabArchive() {
  const { viewMode, handleSwitchView } = useArchiveView();

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 w-[90%] mx-auto'>
        {viewMode === 'SCREEN_ARCHIVE_ANALYSIS_CALENDER' ? (
          <CalendarAnalysisExpenditureList onSwitch={handleSwitchView} />
        ) : (
          <CustomAnalysisExpenditureList onSwitch={handleSwitchView} />
        )}
      </View>
    </SafeAreaView>
  );
}
