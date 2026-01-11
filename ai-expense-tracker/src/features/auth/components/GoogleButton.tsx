import { Pressable, Text, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';

interface Props {
  onPress: () => void;
  isLoading: boolean;
}

export const GoogleButton = ({ onPress, isLoading }: Props) => {
  return (
    <Pressable
      className='w-full py-4 border border-gray-300 rounded-[12px] flex-row justify-center items-center gap-x-3 active:bg-gray-300'
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
