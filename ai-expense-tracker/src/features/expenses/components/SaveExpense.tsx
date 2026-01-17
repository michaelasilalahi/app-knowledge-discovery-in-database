import { Pressable, Text, ActivityIndicator } from 'react-native';
import { useExpenseStore } from '../store/expenseStore';

export const SaveExpense = () => {
  // Ambil fungsi submit dan status loading
  const submitExpense = useExpenseStore((state) => state.submitExpense);
  const isLoading = useExpenseStore((state) => state.isLoading);

  return (
    <Pressable
      onPress={submitExpense}
      disabled={isLoading}
      className='w-[70%] py-[10px] mb-[50px] mx-auto bg-black rounded-full flex-row justify-center items-center active:bg-gray-300'
    >
      {isLoading ? (
        <ActivityIndicator color='white' />
      ) : (
        <Text className='font-montserrat-semibold text-white'>Simpan</Text>
      )}
    </Pressable>
  );
};
