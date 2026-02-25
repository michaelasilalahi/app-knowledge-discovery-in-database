import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DataMiningBook() {
  return (
    <SafeAreaView className='flex-1 bg-[#EEEEEE]'>
      <View className='flex-1 w-[90%] mx-auto'>
        <Text>NotificationScreen</Text>
      </View>
      <StatusBar style='dark' />
    </SafeAreaView>
  );
}
