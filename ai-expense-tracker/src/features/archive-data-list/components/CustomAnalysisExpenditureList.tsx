import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { SwitchScreenAnalysisProps } from '../types/switchScreenAnalysisPropsType';
import { useCustomAnalysisDataList } from '../utils/customAnalysisDataList';

export const CustomAnalysisExpenditureList = ({
  onSwitch,
}: SwitchScreenAnalysisProps) => {
  const { listData, startDay } = useCustomAnalysisDataList();
  return (
    <View>
      <View className='flex-row justify-between items-center py-[15px] border-b-[0.5px] border-b-[#AAAAAA]'>
        <Text className='font-montserrat-bold text-[15px]'>
          Analisis Kustom
        </Text>

        <Pressable
          onPress={onSwitch}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 0.1,
          })}
        >
          <Image
            source={require('../../../../assets/icons/switch_analysis.svg')}
            style={{
              width: 25,
              height: 25,
              tintColor: '#AAAAAA',
            }}
          />
        </Pressable>
      </View>

      <FlatList
        data={listData}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className='flex-row justify-between items-center py-4 border-b-[0.5px] border-b-[#E0E0E0]'>
            <View>
              <Text className='font-montserrat-semibold text-[14px]'>
                {item.title}
              </Text>
              <Text className='font-montserrat-medium text-[#AAAAAA] text-[12px] mt-1'>
                Rp {item.total.toLocaleString('id-ID')}
              </Text>
            </View>
            <Image
              source={require('../../../../assets/icons/arrow_right.svg')}
              style={{ width: 14, height: 14, tintColor: '#000' }}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text className='text-center text-[#AAAAAA] mt-10 font-montserrat-medium'>
            Belum ada data pengeluaran.
          </Text>
        }
      />
    </View>
  );
};
