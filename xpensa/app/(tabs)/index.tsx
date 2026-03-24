import { Pressable, Text, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGoogleStore } from '@/auth/google/store/useGoogleStore';
import { TodaysExpenses } from '@/features/todays-expenses';
import { VisualizationOfAllTime } from '@/features/visualization-of-all-time';

export default function TabHome() {
  const user = useGoogleStore((state) => state.user);
  const router = useRouter();

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className='flex-1 gap-y-[50px]'>
          <Pressable onPress={() => router.push('(setting)/setting')}>
            <View className='flex-row items-center gap-x-[10px] pt-[15px] w-[90%] mx-auto'>
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
          <VisualizationOfAllTime />
          <TodaysExpenses />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
