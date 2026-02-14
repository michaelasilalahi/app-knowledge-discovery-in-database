import React from 'react';
import { View, Pressable, Text, ActivityIndicator } from 'react-native';
import { settingAnalysisStore } from '@/features/setting-analysis';
import { useExpenseStore } from '../store/expenseStore';

export const SaveExpense = () => {
  const isAnalysisActive = settingAnalysisStore((state) =>
    state.isAnyAnalysisActive(),
  );

  const submitExpense = useExpenseStore((state) => state.submitExpense);
  const isLoading = useExpenseStore((state) => state.isLoading);

  return (
    <View className='flex gap-y-[10px] mb-[50px]'>
      <Pressable
        onPress={submitExpense}
        disabled={!isAnalysisActive || isLoading}
        className='w-[70%] py-[10px] mx-auto bg-black rounded-full flex-row justify-center items-center active:bg-gray-300'
      >
        {isLoading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text className='font-montserrat-semibold text-white'>Simpan</Text>
        )}
      </Pressable>
      {!isAnalysisActive && (
        <Text className='w-[70%] mx-auto font-montserrat-medium text-[#AAAAAA] text-[12px] text-center'>
          Sebelum mengisi data pengeluaran, mohon aktifkan pengaturan analisis
          pengeluaran yang terdapat pada halaman Pengaturan
        </Text>
      )}
    </View>
  );
};
