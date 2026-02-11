import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGoogleStore } from '@/auth/google/store/useGoogleStore';
import { TodaysExpenses } from '@/features/todays-expenses';
import { VisualizationOfAllTime } from '@/features/visualization-of-all-time';
import { Notifications } from '@/features/notifications';

export default function TabHome() {
  const user = useGoogleStore((state) => state.user);
  const router = useRouter();

  return (
    <SafeAreaView className='flex-1 bg-[#EEEEEE]'>
      <View className='flex-row w-[90%] mx-auto justify-between items-center my-[15px]'>
        <Pressable onPress={() => router.push('(setting)/setting')}>
          <View className='flex-row items-center gap-x-[5px]'>
            <Image
              source={user?.photo}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
              }}
              contentFit='contain'
            />
            <Text className='font-montserrat-semibold'>{user?.name}</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => router.push('(notification)/notification')}>
          <Notifications />
        </Pressable>
      </View>
      <View className='flex gap-y-[5px]'>
        <VisualizationOfAllTime />
        <TodaysExpenses />
      </View>
    </SafeAreaView>
  );
}
