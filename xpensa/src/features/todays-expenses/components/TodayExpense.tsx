import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { syncTodayExpenseStore } from '../middleware/todayExpense.persist';
import { useFocusEffect } from '@react-navigation/native';
import { useTodaysExpenses } from '../hooks/todayExpense.hooks';
import { formatRupiah, formatDate } from '../utils/todayExpense.helpers';

export const TodaysExpenses = () => {
  const { expenses, refetch } = useTodaysExpenses();
  const hasHydrated = syncTodayExpenseStore((state) => state.hasHydrated);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <View className='flex-1 bg-white'>
      <View className='flex-1 gap-y-[30px] w-[90%] mx-auto'>
        <View className='flex-row gap-x-[5px]'>
          <Text className='font-montserrat-semibold'>Pengeluaran</Text>
          <Text className='font-montserrat-semibold text-[#AAAAAA]'>
            Hari ini.
          </Text>
        </View>

        <View className='flex-1'>
          {!hasHydrated ? (
            <View className='flex-1items-center justify-center py-10 min-h-[100px]'>
              <ActivityIndicator size='small' color='#AAAAAA' />
            </View>
          ) : expenses.length > 0 ? (
            <FlatList
              data={expenses}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View className='flex-row justify-between items-center py-[10px] border-b-[0.3px] border-b-[#AAAAAA]'>
                  <View className='flex-1 gap-y-[5px]'>
                    <Text className='font-montserrat-semibold'>
                      {item.type_of_expenditure}
                    </Text>
                    <View className='flex gap-y-[5px]'>
                      <Text className='font-montserrat-medium text-[13px] text-[#AAAAAA]'>
                        {item.label} • {item.category}
                      </Text>
                      <Text className='font-montserrat-medium text-[13px] text-[#AAAAAA]'>
                        {formatDate(item.date)}
                      </Text>
                    </View>
                  </View>
                  <Text className='font-montserrat-medium'>
                    {formatRupiah(item.amount)}
                  </Text>
                </View>
              )}
            />
          ) : (
            <View className='flex-1 justify-center items-center opacity-60'>
              <Text className='font-montserrat-medium text-[#AAAAAA] text-center'>
                Belum ada pengeluaran hari ini.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
