import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Profil } from '@/features/profil/components/Profil';
import {
  AnalysisHeader,
  AnalysisCalender,
  AnalysisCustom,
} from '@/features/setting-analysis';

export default function Setting() {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 gap-y-[130px]'>
        <View>
          <Profil />
        </View>

        <View className='w-[90%] mx-auto flex gap-y-[15px]'>
          <AnalysisHeader />
          <AnalysisCalender />
          <AnalysisCustom />
        </View>
      </View>
    </SafeAreaView>
  );
}
