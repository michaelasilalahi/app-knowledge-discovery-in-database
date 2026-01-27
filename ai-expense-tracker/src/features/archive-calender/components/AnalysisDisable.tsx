// components/AnalysisDisabled.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  message: string;
}

export const AnalysisDisabled = ({ message }: Props) => {
  return (
    <View className='px-5 py-[50px] items-center'>
      <View className='w-full bg-gray-100 p-6 rounded-2xl border border-gray-200 items-center gap-y-4'>
        <Text className='font-montserrat-semibold text-gray-600 text-lg text-center'>
          Analisis Non-Aktif
        </Text>
        <Text className='font-montserrat-medium text-gray-500 text-center text-sm'>
          {message}
        </Text>

        {/* Tombol Simulasi untuk Mengaktifkan (Nanti dihubungkan ke API) */}
        <TouchableOpacity className='bg-black px-6 py-3 rounded-full mt-2'>
          <Text className='text-white font-montserrat-semibold text-sm'>
            Aktifkan Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
