import { View, Text } from 'react-native';

export const LoginHeader = () => {
  return (
    <View className='flex-1 justify-center gap-y-2'>
      <View>
        <Text className='font-new-astro-bold text-4xl'>Ai</Text>
        <Text className='font-new-astro-bold text-4xl'>Expense Tracker</Text>
      </View>
      <View>
        <Text className='font-montserrat-regular text-gray-500'>
          Menemukan ritme dalam setiap pengeluaran demi memetakan langkah
          finansial yang lebih terukur dan bermakna.
        </Text>
      </View>
    </View>
  );
};
