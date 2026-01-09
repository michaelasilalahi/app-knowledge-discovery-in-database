import { Pressable, Text, View, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useAuthStore } from '../../store/useAuthStore';

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log('LoginScreen mounted');

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo, null, 2));
      if (userInfo.data) {
        // simpan data ke zustand
        login({
          id: userInfo.data.user.id,
          name: userInfo.data.user.name,
          email: userInfo.data.user.email,
          photo: userInfo.data.user.photo,
          idToken: userInfo.data.idToken,
        });
      }
    } catch (err) {
      const error = err as { code?: string; message?: string };
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('login dibatalkan user');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('login sedang berlangsung');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
            onPress={handleGoogleLogin}
            disabled={isLoading}
            className='w-full py-4 border border-gray-300 rounded-[12px] flex-row justify-center items-center gap-x-3 active:bg-gray-300'
          >
            {isLoading ? (
              <ActivityIndicator color='#000000' />
            ) : (
              <>
                <Image
                  source={require('../../assets/icons/google.svg')}
                  style={{ width: 20, height: 20 }}
                  contentFit='contain'
                />
                <Text className='font-neue-haas-grotesk-regular'>
                  Lanjutkan dengan Google
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </View>

      <StatusBar style='dark' />
    </SafeAreaView>
  );
}
