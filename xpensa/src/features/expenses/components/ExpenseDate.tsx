import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenseDate } from '../hooks/expenseDate.hooks';

export const ExpenseDate = () => {
  const {
    date,
    showPicker,
    formattedDate,
    openDatePicker,
    handleDateChange,
    clearDate,
  } = useExpenseDate();

  return (
    <View>
      <View className='flex-row items-center justify-between border-b-[0.5px] border-b-[#AAAAAA]'>
        <Pressable className='flex-1' onPress={openDatePicker}>
          <Text
            className={`font-montserrat-medium text-base py-[10px] ${date ? 'text-black' : 'text-[#AAAAAA]'}`}
          >
            {date ? formattedDate : 'Tanggal'}
          </Text>
        </Pressable>

        {date && (
          <Pressable onPress={clearDate}>
            <Image
              source={require('@assets/icons/close.svg')}
              style={{ width: 20, height: 20, tintColor: '#F87171' }}
              contentFit='contain'
            />
          </Pressable>
        )}
      </View>

      {showPicker && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date || new Date()}
          mode='date'
          display='default'
          onChange={handleDateChange}
          maximumDate={new Date()}
          className='font-montserrat-medium text-base text-black'
        />
      )}
    </View>
  );
};
