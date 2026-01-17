import { View, Text } from 'react-native';
import { useExpenseInput } from '../hooks/useExpense';
import CurrencyInput from 'react-native-currency-input';

export const Expense = () => {
  const { amount, handleAmountChange } = useExpenseInput();
  return (
    <View className='flex items-center gap-y-[50px]'>
      <View>
        <Text className='font-montserrat-semibold text-2xl'>
          Jenis Pengeluaran
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
