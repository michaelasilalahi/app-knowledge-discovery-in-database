import React from 'react';
import { View, Text, Modal, SafeAreaView } from 'react-native';

interface OfflineModalProps {
  isVisible: boolean;
}

export const OfflineScreen = ({ isVisible }: OfflineModalProps) => {
  return (
    <Modal
      visible={isVisible}
      animationType='fade'
      transparent={true}
      statusBarTranslucent
    >
      <View className='flex-1 justify-center items-center bg-black/50'>
        <SafeAreaView className='w-[85%] bg-white rounded-3xl p-5 items-center shadow-2xl'>
          <View className='flex gap-y-[10px]'>
            <Text className='font-montserrat-semibold text-center'>
              Koneksi Terputus
            </Text>
            <Text className='font-montserrat-medium text-[#AAAAAA] text-center leading-5'>
              Xpensa membutuhkan internet untuk sinkronisasi data. Silakan cek
              WiFi atau Data Seluler anda.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};
