import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';

export const useNotificationAccess = () => {
  // state untuk menyimpan status asli dari pengaturan HP
  const [isListenerEnabled, setIsListenerEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // fungsi untuk sinkronisasi state dengan pengaturan HP sesungguhnya
  const checkPermissions = async () => {
    const listenerStatus =
      await RNAndroidNotificationListener.getPermissionStatus();
    setIsListenerEnabled(listenerStatus !== 'denied');
  };
  // pantau kapan pengguna kembali ke aplikasi setelah dari Pengaturan HP
  useEffect(() => {
    checkPermissions();

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active') {
          checkPermissions();
        }
      },
    );

    return () => subscription.remove();
  }, []);

  const toggleListener = (isOn: boolean) => {
    if (isOn) {
      RNAndroidNotificationListener.requestPermission();
    } else {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => setIsModalVisible(false);
  const openSettingsFromModal = () => {
    setIsModalVisible(false);
    RNAndroidNotificationListener.requestPermission();
  };

  return {
    isListenerEnabled,
    toggleListener,
    isModalVisible,
    closeModal,
    openSettingsFromModal,
  };
};
