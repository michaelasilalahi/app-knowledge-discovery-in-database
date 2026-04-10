import { View, Text, Modal, TouchableOpacity } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { useNotificationAccess } from '../hooks/notificationAccess.hooks';

export const SettingNotificationListener = () => {
  const {
    isListenerEnabled,
    toggleListener,
    isModalVisible,
    closeModal,
    openSettingsFromModal,
  } = useNotificationAccess();
  return (
    <View className='gap-y-[15px]'>
      <Text className='font-montserrat-bold'>Pendengar Notifikasi</Text>
      <View className='pb-[15px] border-b-[0.5px] border-b-[#AAAAAA]'>
        <View className='flex flex-row justify-between items-center'>
          <Text className='font-montserrat-medium'>Akses Notifikasi</Text>
          <ToggleSwitch
            isOn={isListenerEnabled}
            onColor='#16DB00'
            offColor='#AAAAAA'
            size='medium'
            onToggle={(isOn) => toggleListener(isOn)}
          />
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType='fade'
        onRequestClose={closeModal}
      >
        <View className='flex-1 justify-center items-center bg-black/50'>
          <View className='flex items-center bg-white w-[50%] p-[30px] rounded-2xl'>
            <View className='flex items-center justify-center gap-y-[20px]'>
              <Text className='font-montserrat-semibold'>Matikan Akses</Text>

              <TouchableOpacity onPress={closeModal}>
                <Text className='font-montserrat-semibold text-[#AAAAAA]'>
                  Batal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={openSettingsFromModal}>
                <Text className='font-montserrat-semibold text-green-500'>
                  Pengaturan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
