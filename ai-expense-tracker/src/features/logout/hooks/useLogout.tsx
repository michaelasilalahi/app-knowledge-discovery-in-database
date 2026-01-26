import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useGoogleStore } from '@/auth/google';

export const useLogout = () => {
  const logout = useGoogleStore((state) => state.logout);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fungsi untuk membuka modal
  const showLogoutModal = () => setIsModalVisible(true);

  // Fungsi untuk menutup modal
  const hideLogoutModal = () => setIsModalVisible(false);

  // Fungsi eksekusi logout
  const handleConfirmLogout = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.signOut();
      logout();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Logout Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isModalVisible,
    showLogoutModal,
    hideLogoutModal,
    handleConfirmLogout,
    isLoading,
  };
};
