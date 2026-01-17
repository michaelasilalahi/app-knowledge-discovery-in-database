import { View, Text, Modal, TouchableOpacity } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { Picker } from 'react-native-wheel-pick';
import { useAnalysisCalender } from '../hooks/useAnalysisCalender';

export const AnalysisCalender = () => {
  const {
    isEnabled,
    isModalVisible,
    toggleSwitch,
    handleCancel,
    // Props Modal
    isRecurring,
    setIsRecurring,
    months,
    selectedMonthIndex,
    handleSelectedMonth,
    handleSubmit,
    // Props Tampilan Utama
    isAnalysisActive,
    feedbackText,
  } = useAnalysisCalender();

  return (
    <View className='pb-[15px] border-b-[0.7px] border-b-[#AAAAAA]'>
      <View className='flex'>
        <View className='flex flex-row justify-between items-center'>
          <Text className='font-montserrat-medium'>Analisis Kalender</Text>
          <ToggleSwitch
            isOn={isEnabled}
            onColor='#16DB00'
            offColor='#AAAAAA'
            size='medium'
            onToggle={(isOn) => toggleSwitch(isOn)}
          />
        </View>

        <View className='w-[70%]'>
          {isAnalysisActive && (
            <Text className='font-montserrat-medium text-[#AAAAAA] leading-7'>
              {feedbackText}
            </Text>
          )}
        </View>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        backdropColor='white'
        visible={isModalVisible}
        onRequestClose={handleCancel}
      >
        <View className='flex-1 justify-center items-center px-[30px] bg-black/30'>
          <View className='bg-white w-full rounded-[10px] p-[30px] flex gap-y-[30px]'>
            <View className='flex gap-y-[10px]'>
              <Text className='font-montserrat-semibold text-center'>
                Setup Analisis Kalender
              </Text>
              <Text className='font-montserrat-medium text-[#AAAAAA] text-center'>
                Konfigurasikan bagaimana AI akan menganalisis pengeluaran anda
                berdasarkan siklus bulan kalender untuk mendapatkan wawasan
                keuangan yang lebih akurat.
              </Text>
            </View>

            <View className='w-full justify-center items-center'>
              <Picker
                textSize={15}
                isCyclic={true}
                selectLineColor='black'
                selectLineSize={3}
                pickerData={months}
                selectedValue={months[selectedMonthIndex]}
                onValueChange={(value: string) => {
                  const index = months.indexOf(value);
                  handleSelectedMonth(index);
                }}
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                }}
              />
            </View>

            <View className='flex flex-row justify-between items-center'>
              <Text className='font-montserrat-semibold'>
                Analisis Setiap Bulan ?
              </Text>
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
