import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginHeader, GoogleButton, useGoogleAuth } from '@/features/auth';

export default function LoginScreen() {
  const { handleGoogleLogin, isLoading } = useGoogleAuth();

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 w-[90%] mx-auto my-[50px]'>
        <LoginHeader />
        <View>
          <GoogleButton onPress={handleGoogleLogin} isLoading={isLoading} />
        </View>
      </View>
      <StatusBar style='dark' />
    </SafeAreaView>
  );
}
