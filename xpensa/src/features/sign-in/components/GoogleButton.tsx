import { Pressable, Text, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Props } from '../types';

export const GoogleButton = ({ onPress, isLoading }: Props) => {
  return (
    <Pressable
      className='w-full py-4 border-[0.3px] border-[#AAAAAA] rounded-full flex-row justify-center items-center gap-x-3 active:bg-gray-300'
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color='#000000' />
      ) : (
        <>
          <Image
            source={require('@assets/icons/google.svg')}
            style={{ width: 20, height: 20 }}
            contentFit='contain'
          />
          <Text className='font-montserrat-medium'>
            Lanjutkan dengan Google
          </Text>
        </>
      )}
    </Pressable>
  );
};
