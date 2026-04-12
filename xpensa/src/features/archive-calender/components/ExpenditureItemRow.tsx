import { View, Text, TouchableOpacity } from 'react-native';
import { formatRupiah } from '../utils/formatRupiah.helpers';
import { formatDate } from '../utils/formatDate.helpers';
import { ExpenseItemRow } from '../types/expenses.interface';

export const ExpenditureItemRow = ({
  item,
  isSelected,
  isSelectionMode,
  onPress,
  onLongPress,
}: ExpenseItemRow) => {
  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(item.id!)}
      onPress={() => onPress(item.id!)}
      delayLongPress={100}
      className={`flex-row justify-between items-center py-[10px] border-b-[0.5px] border-b-[#AAAAAA] ${
        isSelected ? 'bg-red-50 rounded-lg px-2' : ''
      }`}
    >
      <View className='flex-row items-center flex-1 gap-x-3'>
        {isSelectionMode && (
          <View
            className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
              isSelected ? 'border-red-500' : 'border-gray-400'
            }`}
          >
            {isSelected && <View className='w-3 h-3 rounded-full bg-red-500' />}
          </View>
        )}
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
      </View>
      <View>
        <Text className='font-montserrat-medium'>
          {formatRupiah(Number(item.amount))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
