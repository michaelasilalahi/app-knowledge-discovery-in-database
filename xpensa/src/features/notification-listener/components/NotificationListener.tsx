import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AppState,
  AppStateStatus,
} from 'react-native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';

export const NotificationListener = () => {
  const [hasPermission, setHasPermission] = useState(false);

  // Fungsi untuk mengecek status izin
  const checkPermission = async () => {
    const status = await RNAndroidNotificationListener.getPermissionStatus();
    setHasPermission(status !== 'denied');
  };

  // Cek izin saat pertama kali render dan saat aplikasi kembali dibuka (aktif)
  useEffect(() => {
    checkPermission();

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active') {
          checkPermission();
        }
      },
    );

    return () => subscription.remove();
  }, []);

  // Fungsi untuk membuka pengaturan Android
  const requestPermission = () => {
    RNAndroidNotificationListener.requestPermission();
  };

  if (hasPermission) {
    return (
      <View className='p-4 bg-green-100 rounded-lg my-2'>
        <Text className='text-green-800 font-montserrat_semibold text-center'>
          ✅ Izin Notifikasi Aktif
        </Text>
      </View>
    );
  }

  return (
    <View className='p-4 bg-red-100 rounded-lg my-2 items-center'>
      <Text className='text-red-800 font-montserrat_medium mb-2 text-center'>
        Aplikasi butuh izin untuk membaca notifikasi pengeluaran.
      </Text>
      <TouchableOpacity
        className='bg-red-500 px-4 py-2 rounded-full'
        onPress={requestPermission}
      >
        <Text className='text-white font-montserrat_semibold'>
          Beri Izin Sekarang
        </Text>
      </TouchableOpacity>
    </View>
  );
};
