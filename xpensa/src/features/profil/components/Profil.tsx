import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { useGoogleStore } from '@/auth/google/store/useGoogleStore';

export const Profil = () => {
  const { user } = useGoogleStore();

  return (
    <View className='flex items-center gap-y-[15px] top-5'>
      <Image
        source={user?.photo}
        style={{ width: 50, height: 50, borderRadius: 50 }}
        contentFit='contain'
      />
      <Text className='font-montserrat-semibold'>{user?.name}</Text>
    </View>
  );
};
