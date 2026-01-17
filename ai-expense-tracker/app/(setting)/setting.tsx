import { View } from 'react-native';
import { Profil } from '@/features/profil/components/Profil';
import {
  AnalysisHeader,
  AnalysisCalender,
  AnalysisCustom,
} from '@/features/setting-analysis';

export default function Setting() {
  return (
    <View className='flex-1'>
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
    </View>
  );
}
