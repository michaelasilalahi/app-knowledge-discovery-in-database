// components/AnalysisDisabled.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Props } from '../types/analysisDisable.interface';

export const AnalysisDisabled = ({ message }: Props) => {
  const router = useRouter();
  const handleEnableClick = () => {
    router.push('/setting');
  };
  return (
    <View className='px-5 py-[50px] items-center'>
      <View className='flex gap-y-[15px] py-[15px] px-[15px] items-center rounded-[15px] w-full border-[#AAAAAA] border-[0.5px]'>
        <Text className='font-montserrat-semibold text-center'>
          Analisis Non-Aktif
        </Text>
        <Text className='font-montserrat-medium text-center text-[12px] text-[#AAAAAA]'>
          {message}. Mohon aktifkan analisis pada halaman pengaturan.
        </Text>

        <TouchableOpacity
          onPress={handleEnableClick}
          className='w-[50%] flex justify-center items-center bg-black py-[10px] rounded-full'
        >
          <Text className='text-white font-montserrat-semibold text-[12px]'>
            Aktifkan Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
