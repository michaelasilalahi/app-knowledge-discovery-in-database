import { View, TextInput } from 'react-native';
import { useExpenseName } from '../hooks/useExpenseName';

export const ExpenseName = () => {
  const { expenseName, handleExpenseNameChange } = useExpenseName();

  return (
    <View className='border-b border-b-[#AAAAAA]'>
      <TextInput
        placeholder='Nama Pengeluaran'
        value={expenseName}
        onChangeText={handleExpenseNameChange}
        keyboardType='default'
      />
    </View>
  );
};
