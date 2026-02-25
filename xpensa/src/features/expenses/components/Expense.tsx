import React from 'react';
import { View, Text } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { useExpenseInput } from '../hooks/expense.hooks';

export const Expense = () => {
  const { amount, handleAmountChange } = useExpenseInput();
  return (
    <View className='flex items-center gap-y-[50px]'>
      <View>
        <Text className='font-montserrat-semibold text-[25px]'>
          Pengeluaran
        </Text>
      </View>
      <View className='flex-row items-center justify-center w-full'>
        <Text className='font-montserrat-medium text-3xl text-[#AAAAAA]'>
          Rp.
        </Text>
        <CurrencyInput
          placeholder='0'
          placeholderTextColor={'#AAAAAA'}
          value={amount}
          onChangeValue={handleAmountChange}
          keyboardType='numeric'
          delimiter='.'
          separator=','
          precision={0}
          style={{
            fontSize: 30,
            fontFamily: 'montserrat_medium',
            paddingVertical: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        />
      </View>
    </View>
  );
};
