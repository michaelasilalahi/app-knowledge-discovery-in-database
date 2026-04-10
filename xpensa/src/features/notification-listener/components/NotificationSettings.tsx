import { View, Text, Modal, TouchableOpacity } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { useLocalNotification } from '../hooks/localNotification.hooks';

export const NotificationSettings = () => {
  const {
    isPopupEnabled,
    togglePopup,
    isPopupModalVisible,
    closePopupModal,
    openSettingsFromPopupModal,
  } = useLocalNotification();
  return (
    <View className='gap-y-[15px]'>
      <Text className='font-montserrat-bold'>Notifikasi</Text>
      <View className='pb-[15px] border-b-[0.5px] border-b-[#AAAAAA]'>
        <View className='flex flex-row justify-between items-center'>
          <Text className='font-montserrat-medium'>Izin Notifikasi</Text>
          <ToggleSwitch
            isOn={isPopupEnabled}
            onColor='#16DB00'
            offColor='#AAAAAA'
            size='medium'
            onToggle={(isOn) => togglePopup(isOn)}
          />
        </View>
      </View>
      <Modal
        visible={isPopupModalVisible}
        transparent={true}
        animationType='fade'
        onRequestClose={closePopupModal}
      >
        <View className='flex-1 justify-center items-center bg-black/50'>
          <View className='flex items-center bg-white w-[50%] p-[30px] rounded-2xl'>
            <View className='flex items-center justify-center gap-y-[20px]'>
              <Text className='font-montserrat-semibold'>Izin Notifikasi</Text>

              <TouchableOpacity onPress={closePopupModal}>
                <Text className='font-montserrat-semibold text-[#AAAAAA]'>
                  Batal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={openSettingsFromPopupModal}>
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
