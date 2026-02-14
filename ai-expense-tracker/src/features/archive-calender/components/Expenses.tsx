import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useExpensesList } from '../hooks/expensesList.hooks';
import { formatRupiah, formatDate } from '../utils/expenses.helpers';
import { ExpensesProps } from '../types/expenses.interface';

export const Expenses = ({ periodTitle }: ExpensesProps) => {
  const { filteredExpenses, totalExpenses, hasHydrated, isLoading } =
    useExpensesList(periodTitle);

  if (!hasHydrated) {
    return (
      <View className='flex-1 justify-center items-center mt-10'>
        <ActivityIndicator size='small' color='#AAAAAA' />
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
          ListEmptyComponent={() => {
            if (isLoading) {
              return (
                <View className='mt-10 items-center'>
                  <ActivityIndicator size='small' color='#AAAAAA' />
                  <Text className='text-xs text-[#AAAAAA] mt-2'>
                    Sedang memuat data...
                  </Text>
                </View>
              );
            }
            return (
              <Text className='font-montserrat-medium text-gray-400 mt-2 text-center'>
                Belum ada data pengeluaran{'\n'}di bulan {periodTitle}
              </Text>
            );
          }}
        />
      </View>
    </View>
  );
};
