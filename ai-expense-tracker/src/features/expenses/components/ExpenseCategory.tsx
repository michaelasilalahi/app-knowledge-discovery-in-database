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
    tempCategory,
    categoryOptions,
    openModal,
    closeModal,
    clearCategory,
    handleSelectTempCategory,
    handleSubmitCategory,
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

        {category ? (
          <Pressable onPress={clearCategory}>
            <Image
              source={require('@assets/icons/close.svg')}
              style={{ width: 20, height: 20, tintColor: '#F87171' }}
              contentFit='contain'
            />
          </Pressable>
        ) : null}
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
                <Text>Pilih Kategori</Text>
              </Text>
              <Text className='font-montserrat-medium text-[#AAAAAA] text-center'>
                Pilih kategori yang sesuai dengan pengeluaran Anda
              </Text>
            </View>

            <View>
              <FlatList
                data={categoryOptions}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => handleSelectTempCategory(item)}
                    className={`flex items-center justify-center border-b-[0.7px] border-b-[#AAAAAA] py-[15px] ${index === 0 ? 'border-t-[0.5px]' : ''} ${
                      item === tempCategory ? 'bg-[#EEEEEE]' : 'bg-white'
                    }`}
                  >
                    <Text
                      className={`font-montserrat-medium ${
                        item === tempCategory
                          ? 'font-montserrat-medium'
                          : 'text-black'
                      }`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )}
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
                onPress={handleSubmitCategory}
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
