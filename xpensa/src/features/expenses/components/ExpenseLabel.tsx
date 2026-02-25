import React from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Picker } from 'react-native-wheel-pick';
import { useExpenseLabel } from '../hooks/expenseLabel.hooks';

export const ExpenseLabel = () => {
  const {
    isModalVisible,
    label,
    tempSelected,
    labelOptions,
    openModal,
    closeModal,
    clearLabel,
    handleWheelChange,
    confirmSelection,
  } = useExpenseLabel();

  return (
    <View>
      <View className='flex-row items-center justify-between border-b-[0.7px] border-b-[#AAAAAA]'>
        <Pressable onPress={openModal}>
          <Text
            className={`font-montserrat-medium text-base py-[10px] ${label ? 'text-black' : 'text-[#AAAAAA]'}`}
          >
            {label || 'Label'}
          </Text>
        </Pressable>

        {label && (
          <Pressable onPress={clearLabel}>
            <Image
              source={require('@assets/icons/close.svg')}
              style={{ width: 20, height: 20, tintColor: '#F87171' }}
              contentFit='contain'
            />
          </Pressable>
        )}
      </View>

      <Modal
        visible={isModalVisible}
        animationType='fade'
        transparent={true}
        onRequestClose={closeModal}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className='flex-1 justify-center items-center px-[30px] bg-black/50'
        >
          <View className='bg-white w-full rounded-[10px] p-[30px] flex gap-y-[30px]'>
            <View className='flex gap-y-[10px]'>
              <Text className='font-montserrat-semibold text-center'>
                Pilih Label
              </Text>
              <Text className='font-montserrat-medium text-[#AAAAAA] text-center'>
                Pilih label yang sesuai dengan pengeluaranmu
              </Text>
            </View>

            <View className='w-full justify-center items-center'>
              <Picker
                textSize={15}
                isCyclic={true}
                selectLineColor='black'
                selectLineSize={3}
                pickerData={labelOptions}
                selectedValue={tempSelected}
                onValueChange={handleWheelChange}
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                }}
              />
            </View>

            <View className='flex gap-y-[10px]'>
              <TouchableOpacity
                onPress={closeModal}
                className='border-[0.7px] border-[#AAAAAA] rounded-[10px] py-[10px]'
              >
                <Text className='font-montserrat-semibold text-center'>
                  Tutup
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className='bg-black rounded-[10px] py-[10px]'
                onPress={confirmSelection}
              >
                <Text className='font-montserrat-semibold text-white text-center'>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
