import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
// hooks
import { useExpensesList } from '../hooks/useExpensesList';
// utils
import { formatRupiah, formatDate } from '../utils/expensesHelpers';
// types
import { ExpensesProps } from '../types/expensesTypes';

export const Expenses = ({ periodTitle }: ExpensesProps) => {
  // panggil logic dari hooks
  const { filteredExpenses, isLoading, totalExpenses } =
    useExpensesList(periodTitle);

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center mt-10'>
        <ActivityIndicator size='large' color='black' />
        <Text className='font-montserrat-medium text-gray-400 mt-2'>
          Memuat data...
        </Text>
      </View>
    );
  }

  return (
    <View className='flex-1 w-[90%] mx-auto mt-[30px]'>
      <View className='flex-1 gap-y-[30px]'>
        <View className='flex gap-y-[15px]'>
          <View className='flex-row justify-between items-center'>
            <Text className='font-montserrat-semibold'>Total Transaksi</Text>
            <Text className='font-montserrat-medium'>
              {filteredExpenses.length}
            </Text>
          </View>
          <View className='flex-row justify-between items-center'>
            <Text className='font-montserrat-semibold'>Total Pengeluaran</Text>
            <Text className='font-montserrat-medium'>
              {formatRupiah(totalExpenses)}
            </Text>
          </View>
        </View>

        <FlatList
          data={filteredExpenses}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item }) => (
            <View className='flex-row justify-between items-center py-[10px] border-b-[0.5px] border-b-[#AAAAAA]'>
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
              <View>
                <Text className='font-montserrat-medium'>
                  {formatRupiah(item.amount)}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text className='font-montserrat-medium text-gray-400 mt-2'>
              Belum ada data pengeluaran{'\n'}di bulan {periodTitle}
            </Text>
          )}
        />
      </View>
    </View>
  );
};
