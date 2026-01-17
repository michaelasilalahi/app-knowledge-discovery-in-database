import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { useExpenseCategory } from '../hooks/useExpenseCategory';

export const ExpenseCategory = () => {
  const {
    isModalVisible,
    category,
    openModal,
    closeModal,
    clearCategory,
    handleSelectCategory,
    categoryOptions,
  } = useExpenseCategory();

  return (
    <View>
      <View className='flex-row items-center justify-between border-b-[0.7px] border-b-[#AAAAAA]'>
        <Pressable onPress={openModal}>
          <Text
            className={`font-montserrat-medium text-base py-[10px] ${category ? 'text-black' : 'text-[#AAAAAA]'}`}
          >
            {category || 'Kategori'}
          </Text>
        </Pressable>

        {category && (
          <Pressable onPress={clearCategory}>
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
              <Text>Pilih Kategori</Text>
            </Text>

            <FlatList
              data={categoryOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelectCategory(item)}
                  className='bg-[#F5F5F5] rounded-full px-4 py-2 mb-2'
                >
                  <Text className='ont-montserrat-medium text-base text-black'>
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
                <Text>Tutup</Text>
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
