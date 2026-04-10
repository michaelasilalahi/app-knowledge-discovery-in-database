import { useState, useEffect } from 'react';
import { AppState, AppStateStatus, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const useLocalNotification = () => {
  const [isPopupEnabled, setIsPopupEnabled] = useState(false);
  const [isPopupModalVisible, setIsPopupModalVisible] = useState(false);

  const checkPopupPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setIsPopupEnabled(status === 'granted');
  };

  useEffect(() => {
    checkPopupPermission();

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active') {
          checkPopupPermission();
        }
      },
    );

    return () => subscription.remove();
  }, []);

  const togglePopup = async (isOn: boolean) => {
    if (isOn) {
      const { status, canAskAgain } = await Notifications.getPermissionsAsync();

      if (status !== 'granted') {
        if (canAskAgain) {
          const { status: newStatus } =
            await Notifications.requestPermissionsAsync();
          setIsPopupEnabled(newStatus === 'granted');
          if (newStatus !== 'granted') {
            setIsPopupModalVisible(true);
          }
        } else {
          setIsPopupModalVisible(true);
        }
      }
    } else {
      setIsPopupModalVisible(true);
    }
  };

  const closePopupModal = () => setIsPopupModalVisible(false);

  const openSettingsFromPopupModal = () => {
    setIsPopupModalVisible(false);
    Linking.openSettings();
  };

  return {
    isPopupEnabled,
    togglePopup,
    isPopupModalVisible,
    closePopupModal,
    openSettingsFromPopupModal,
  };
};
