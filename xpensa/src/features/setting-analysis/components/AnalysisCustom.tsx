import { View, Text, Modal, TouchableOpacity } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { useAnalysisCustom } from '../hooks/useAnalysisCustom';
import { daysArray } from '../utils/analysisConfirmationStatus.helpers';
import { Picker } from 'react-native-wheel-pick';
import { Month } from '../types/month.enum';

export const AnalysisCustom = () => {
  const {
    isEnabled,
    isModalVisible,
    selectedDay,
    setSelectedDay,
    selectedMonthValue,
    handleSelectedMonth,
    isRecurring,
    setIsRecurring,
    toggleSwitch,
    handleSubmit,
    handleCancel,
    months,
    feedbackText,
  } = useAnalysisCustom();

  return (
    <View className='pb-[15px] border-b-[0.5px] border-b-[#AAAAAA]'>
      <View className='flex'>
        <View className='flex flex-row justify-between items-center'>
          <Text className='font-montserrat-medium'>Analisis Kustom</Text>
          <ToggleSwitch
            isOn={isEnabled}
            onColor='#16DB00'
            offColor='#AAAAAA'
            size='medium'
            onToggle={(isOn) => toggleSwitch(isOn)}
          />
        </View>

        <View className='w-[70%]'>
          {feedbackText !== '' && (
            <Text className='font-montserrat-medium text-[#AAAAAA]'>
              {feedbackText}
            </Text>
          )}
        </View>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCancel}
      >
        <View className='flex-1 justify-center items-center px-[30px] bg-black/30'>
          <View className='bg-white w-full rounded-[10px] p-[30px] flex gap-y-[30px]'>
            <View className='flex gap-y-[10px]'>
              <Text className='font-montserrat-semibold text-center'>
                Setup Analisis Kustom
              </Text>
              <Text className='font-montserrat-medium text-[#AAAAAA] text-center'>
                Tentukan tanggal dan bulan spesifik untuk memulai siklus
                analisis AI Anda secara otomatis.
              </Text>
            </View>

            <View className='flex-row h-[180px] w-full justify-center items-center'>
              <View className='flex-1'>
                <Picker
                  textSize={15}
                  isCyclic={true}
                  selectLineColor='black'
                  selectLineSize={3}
                  pickerData={daysArray}
                  selectedValue={selectedDay}
                  onValueChange={(value: string) => setSelectedDay(value)}
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                  }}
                />
              </View>
              <View className='flex-1'>
                <Picker
                  textSize={15}
                  isCyclic={true}
                  selectLineColor='black'
                  selectLineSize={3}
                  pickerData={months}
                  selectedValue={selectedMonthValue}
                  onValueChange={(value: string) => {
                    handleSelectedMonth(value as Month);
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                  }}
                />
              </View>
            </View>

            <View className='flex flex-row justify-between items-center'>
              <Text className='font-montserrat-semibold'>Analisis rutin ?</Text>
              <ToggleSwitch
                isOn={isRecurring}
                onColor='#16DB00'
                offColor='#AAAAAA'
                size='small'
                onToggle={(isOn) => setIsRecurring(isOn)}
              />
            </View>

            <View className='flex gap-y-[10px]'>
              <TouchableOpacity
                onPress={handleCancel}
                className='border-[0.7px] border-[#AAAAAA] rounded-[10px] py-[10px]'
              >
                <Text className='font-montserrat-semibold text-center'>
                  Batal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                className='bg-black rounded-[10px] py-[10px]'
              >
                <Text className='font-montserrat-semibold text-white text-center'>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
