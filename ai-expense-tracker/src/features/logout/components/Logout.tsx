import { View, Pressable, Text, Modal, ActivityIndicator } from 'react-native';
import { useLogout } from '../hooks/useLogout';

export const Logout = () => {
  const {
    isModalVisible,
    showLogoutModal,
    hideLogoutModal,
    handleConfirmLogout,
    isLoading,
  } = useLogout();
  return (
    <View>
      <Pressable onPress={showLogoutModal}>
        <Text className='font-montserrat-semibold text-red-400'>Keluar</Text>
      </Pressable>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType='fade'
        onRequestClose={hideLogoutModal}
      >
        <View className='flex-1 justify-center items-center bg-black/50'>
          <View className='flex items-center bg-white w-[50%] p-[30px] rounded-2xl'>
            <View className='flex items-center justify-center gap-y-[20px]'>
              <Text className='font-montserrat-semibold'>
                Konfirmasi Keluar
              </Text>

              <Pressable onPress={hideLogoutModal} disabled={isLoading}>
                <Text className='font-montserrat-semibold text-[#AAAAAA]'>
                  Batal
                </Text>
              </Pressable>

              <Pressable onPress={handleConfirmLogout} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color='white' size='small' />
                ) : (
                  <Text className='font-montserrat-semibold text-red-500'>
                    Keluar
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
