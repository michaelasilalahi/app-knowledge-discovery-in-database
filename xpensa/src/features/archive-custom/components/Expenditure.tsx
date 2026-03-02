import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useCustomExpenditure } from '../hooks/expenditure.hooks';
import { formatDate, formatRupiah } from '@/features/archive-calender';
import { ExpenditureProps } from '../types/expenditureProps.type';

export const Expenses = ({
  periodTitle,
  startDate,
  endDate,
}: ExpenditureProps) => {
  const { expenses, isLoading, error } = useCustomExpenditure(
    startDate,
    endDate,
  );

  const totalExpenses = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [expenses]);

  return (
    <View className='flex-1 w-[90%] mx-auto mt-[30px]'>
      <View className='flex-1 gap-y-[30px]'>
        <View className='flex gap-y-[10px]'>
          <View className='flex-row justify-between items-center'>
            <Text className='font-montserrat-semibold'>Pengeluaran</Text>
            <Text className='font-montserrat-medium'>{expenses.length}</Text>
          </View>
          <View className='flex-row justify-between items-center'>
            <Text className='font-montserrat-semibold'>Total Pengeluaran</Text>
            <Text className='font-montserrat-medium'>
              {formatRupiah(totalExpenses)}
            </Text>
          </View>
        </View>

        <FlatList
          data={expenses}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          showsVerticalScrollIndicator={false}
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
                    {formatDate(item.date.toString())}
                  </Text>
                </View>
              </View>
              <View>
                <Text className='font-montserrat-medium'>
                  {formatRupiah(Number(item.amount))}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => {
            if (isLoading) {
              return (
                <View className='mt-10 items-center'>
                  <ActivityIndicator size='small' color='#AAAAAA' />
                  <Text className='font-montserrat-medium text-xs text-[#AAAAAA] mt-2'>
                    Sedang memuat data...
                  </Text>
                </View>
              );
            }
            return (
              <Text className='font-montserrat-medium text-[#AAAAAA] mt-2 text-center'>
                Belum ada data pengeluaran{'\n'}pada siklus {periodTitle}
              </Text>
            );
          }}
        />
      </View>
    </View>
  );
};
