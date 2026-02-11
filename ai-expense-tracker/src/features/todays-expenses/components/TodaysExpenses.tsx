import { View, Text } from 'react-native';

export const TodaysExpenses = () => {
  return (
    <View className='bg-white h-full'>
      <View className='w-[90%] mx-auto my-[15px]'>
        <View className='flex-row gap-x-[5px]'>
          <Text className='font-montserrat-semibold'>Pengeluaran</Text>
          <Text className='font-montserrat-semibold text-[#AAAAAA] text-[2px]'>
            Hari ini.
          </Text>
        </View>
      </View>
    </View>
  );
};
