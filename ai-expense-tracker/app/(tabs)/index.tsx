import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGoogleStore } from '@/auth/google/store/useGoogleStore';
import { useRouter } from 'expo-router';

export default function TabHome() {
  const user = useGoogleStore((state) => state.user);
  const router = useRouter();

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 w-[90%] mx-auto'>
        <Pressable
          className='flex flex-row items-center gap-x-3'
          onPress={() => router.push('(setting)/setting')}
        >
          <View>
            <Image
              source={user?.photo}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
              }}
              contentFit='contain'
            />
          </View>

          <View>
            <Text className='font-neue-haas-grotesk-regular text-base'>
              {user?.name}
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
