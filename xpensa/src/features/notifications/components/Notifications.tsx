import { View } from 'react-native';
import { Image } from 'expo-image';

export const Notifications = () => {
  return (
    <View>
      <Image
        source={require('../../../../assets/icons/notification.svg')}
        style={{
          width: 25,
          height: 25,
          tintColor: '#AAAAAA',
        }}
        contentFit='contain'
      />
    </View>
  );
};
