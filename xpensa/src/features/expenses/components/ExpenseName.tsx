import React from 'react';
import { View, TextInput } from 'react-native';
import { useExpenseName } from '../hooks/expenseName.hooks';

export const ExpenseName = () => {
  const { expenseName, handleExpenseNameChange } = useExpenseName();

  return (
    <View className='border-b-[0.5px] border-b-[#AAAAAA]'>
      <TextInput
        placeholder='Nama Pengeluaran'
        placeholderTextColor={'#AAAAAA'}
        value={expenseName}
        autoCapitalize='words'
        onChangeText={handleExpenseNameChange}
        keyboardType='default'
        style={{
          paddingVertical: 11,
          paddingTop: 11,
          paddingBottom: 11,
          paddingLeft: 0,
          includeFontPadding: false,
          textAlignVertical: 'center',
          fontFamily: 'montserrat_medium',
        }}
      />
    </View>
  );
};
