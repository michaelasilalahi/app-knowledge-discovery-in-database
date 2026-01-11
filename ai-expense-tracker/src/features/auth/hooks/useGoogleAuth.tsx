import { useState } from 'react';
import { Alert } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useAuthStore } from '../store/useAuthStore';

export const useGoogleAuth = () => {
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
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
      if (error.code !== statusCodes.SIGN_IN_CANCELLED) {
        console.log('login dibatalkan user');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('login gagal sedang berlangsung');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGoogleLogin, isLoading };
};
