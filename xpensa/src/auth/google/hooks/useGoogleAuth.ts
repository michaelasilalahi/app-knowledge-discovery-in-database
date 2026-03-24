import { useState } from 'react';
import { Alert } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useGoogleStore } from '../store/useGoogleStore';
import { apiClient } from '@/config/apiClient';

export const useGoogleAuth = () => {
  const login = useGoogleStore((state) => state.login);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data) {
        const user = userInfo.data.user;

        // 2. Persiapkan data untuk Backend
        // Kuncinya (key) harus sama persis dengan schemas.py di Python
        const backendPayload = {
          google_id: user.id,
          email: user.email,
          full_name: user.name,
          photo_url: user.photo,
        };

        // 3. Kirim ke Database
        try {
          console.log('Mengirim data ke backend...', backendPayload);
          // Panggil endpoint yang sudah kita buat di auth/router.py
          const response = await apiClient.post(
            '/authentication/google-login',
            backendPayload,
          );
          console.log('Sukses tersimpan di DB:', response.data);
        } catch (error) {
          console.error('Gagal simpan ke database:', error);
        }

        // 4. Simpan ke State HP (Zustand)
        login({
          id: user.id,
          name: user.name,
          email: user.email,
          photo: user.photo,
          idToken: userInfo.data.idToken,
        });
      }
    } catch (err) {
      const error = err as { code?: string; message?: string };
      if (error.code !== statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login Gagal', error.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Login sedang berlangsung');
      } else {
        console.log('Login dibatalkan user');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGoogleLogin, isLoading };
};
