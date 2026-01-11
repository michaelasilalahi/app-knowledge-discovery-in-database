import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Expense, ExpenseName } from '@/features/expenses';

export default function TabAdd() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='mt-[70px]'>
        <Expense />
      </View>
      <View className='w-[90%] flex mx-auto'>
        <ExpenseName />
      </View>
    </SafeAreaView>
  );
}
