import React, { useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { SwitchScreenAnalysisProps } from '../types/switchScreenAnalysisPropsType';
import { useCalendarAnalysisDataList } from '../utils/calendarAnalysisDataList';

export const ArchiveAnalysisCalender = ({
  onSwitch,
}: SwitchScreenAnalysisProps) => {
  const listData = useCalendarAnalysisDataList();

  return (
    <View>
      <View className='flex-row justify-between items-center py-[15px] border-b-[0.5px] border-b-[#AAAAAA]'>
        <Text className='font-montserrat-bold text-[15px]'>
          Analisis Calender
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

      <View>
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
                  Rp {item.totalExpense.toLocaleString('id-ID')}
                </Text>
              </View>
              <Image
                source={require('../../../../assets/icons/arrow_right.svg')}
                style={{ width: 14, height: 14, tintColor: '#000' }}
              />
            </View>
          )}
          ListEmptyComponent={
            <View className='flex items-center justify-center'>
              <Text className='font-montserrat-medium text-[#AAAAAA]'>
                Belum ada data pengeluaran.
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};
