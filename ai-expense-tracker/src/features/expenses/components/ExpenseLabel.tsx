import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { useExpenseLabel } from '../hooks/useExpenseLabel';

export const ExpenseLabel = () => {
  const {
    isModalVisible,
    label,
    openModal,
    closeModal,
    clearLabel,
    handleSelectLabel,
    labelOptions,
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
          onPress={closeModal}
          className='flex-1 bg-black/50 justify-center items-center px-6'
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className='bg-white w-full rounded-2xl p-4 max-h-[50%]'
          >
            <Text className='font-montserrat-semibold text-lg text-center mb-4 text-black'>
              Pilih Label
            </Text>

            <FlatList
              data={labelOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelectLabel(item)}
                  className='bg-[#F5F5F5] rounded-full px-4 py-2 mb-2'
                >
                  <Text className='font-montserrat-medium text-base text-black'>
                    {item}
                  </Text>
                </Pressable>
              )}
            />

            <TouchableOpacity
              className='mt-4 py-3 bg-gray-100 rounded-xl items-center'
              onPress={closeModal}
            >
              <Text className='font-montserrat-semibold text-gray-600'>
                Tutup
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
