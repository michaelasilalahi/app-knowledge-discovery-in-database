import React, { memo } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useExpensesList } from '../hooks/expenditure.hooks';
import { formatRupiah } from '../utils/formatRupiah.helpers';
import { ExpensesProps } from '../types/expenses.interface';
import { ExpenditureItemRow } from './ExpenditureItemRow';

const ExpenditureItem = memo(ExpenditureItemRow);
ExpenditureItem.displayName = 'ExpenditureItem';

export const Expenses = ({ periodTitle }: ExpensesProps) => {
  const {
    filteredExpenses,
    totalExpenses,
    isLoading,
    isDeleting,
    isSelectionMode,
    selectedIds,
    handleLongPress,
    handlePress,
    cancelSelection,
    executeDelete,
  } = useExpensesList(periodTitle);

  if (isLoading && filteredExpenses.length === 0) {
    return (
      <View className='flex-1 justify-center items-center mt-10'>
        <ActivityIndicator size='small' color='#AAAAAA' />
      </View>
    );
  }

  return (
    <View className='flex-1 w-[90%] mx-auto mt-[30px]'>
      <View className='flex-1 gap-y-[30px]'>
        <View className='flex gap-y-[10px]'>
          <View className='flex-row justify-between items-center'>
            <Text className='font-montserrat-semibold'>Pengeluaran</Text>
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
          extraData={{ selectedIds, isSelectionMode }}
          renderItem={({ item }) => {
            const isSelected = selectedIds.includes(item.id!);
            return (
              <ExpenditureItem
                item={item}
                isSelected={isSelected}
                isSelectionMode={isSelectionMode}
                onPress={handlePress}
                onLongPress={handleLongPress}
              />
            );
          }}
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

      {isSelectionMode && (
        <View className='absolute bottom-5 w-full bg-white rounded-2xl shadow-xl flex-row justify-between items-center p-4 border border-gray-100'>
          <Text className='font-montserrat-semibold'>
            Hapus {selectedIds.length} item ?
          </Text>

          <View className='flex-row gap-x-[15px] items-center'>
            <TouchableOpacity onPress={cancelSelection}>
              <Text className='font-montserrat-medium text-[#AAAAAA]'>
                Batal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={executeDelete}
              disabled={isDeleting || selectedIds.length === 0}
              className={`px-4 py-2 rounded-lg ${selectedIds.length > 0 ? 'bg-red-500' : 'bg-gray-300'}`}
            >
              {isDeleting ? (
                <ActivityIndicator size='small' color='white' />
              ) : (
                <Text className='font-montserrat-semibold text-white'>
                  Hapus
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
