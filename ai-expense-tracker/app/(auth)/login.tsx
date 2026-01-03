import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 w-[90%] mx-auto my-[50px]'>

        <View className='flex-1 justify-center gap-y-2'>
          <View>
            <Text className='font-new-astro-bold text-4xl'>AI</Text>
            <Text className='font-new-astro-bold text-4xl'>
              Expense Tracker
            </Text>
          </View>

          <View>
            <Text className='font-neue-haas-grotesk-regular text-base text-gray-400'>
              Menemukan ritme dalam setiap pengeluaran demi memetakan langkah
              finansial yang lebih terukur dan bermakna.
            </Text>
          </View>
        </View>

        <View>
          <Pressable
            onPress={() => router.replace('/(tabs)')}
            className='w-full py-4 border-[1px] border-gray-200 rounded-[12px] flex-row justify-center items-center gap-x-3 active:bg-gray-300'
          >
            <Image
              source={require('../../assets/icons/google.svg')}
              style={{ width: 20, height: 20 }}
              contentFit='contain'
            />
            <Text className='font-neue-haas-grotesk-regular'>
              Lanjutkan dengan Google
            </Text>
          </Pressable>
        </View>
      </View>

      <StatusBar style='dark' />
    </SafeAreaView>
  );
}