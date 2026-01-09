import { View, Text, Pressable, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useAuthStore } from '@/store/useAuthStore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function ProfilScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await GoogleSignin.signOut();
            logout();
          } catch (error) {
            console.log(error);
            console.error('Error', error);
            logout();
          }
        },
      },
    ]);
  };

  return (
    <View className='flex-1'>
      <View className='flex-1 items-center gap-y-3 top-16'>
        <Image
          source={user?.photo}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
        />
        <Text className='font-neue-haas-grotesk-regular text-base font-light'>
          {user?.name}
        </Text>
      </View>

      <View>
        <Pressable className='w-[90%] mx-auto mb-10' onPress={handleLogout}>
          <Text className='font-neue-haas-grotesk-regular text-base font-semibold text-red-500'>
            Keluar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
