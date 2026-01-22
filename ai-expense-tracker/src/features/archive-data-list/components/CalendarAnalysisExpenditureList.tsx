import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { SwitchScreenAnalysisProps } from '../types/switchScreenAnalysisPropsType';
import { useCalendarAnalysisDataList } from '../utils/calendarAnalysisDataList';

export const CalendarAnalysisExpenditureList = ({
  onSwitch,
}: SwitchScreenAnalysisProps) => {
  const dataList = useCalendarAnalysisDataList();
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
          data={dataList}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: '/(archive-calender)/archive-calender',
                  params: {
                    title: item.title,
                  },
                });
              }}
            >
              <View className='flex-row justify-between items-center py-[15px] border-b-[0.5px] border-b-[#AAAAAA]'>
                <View>
                  <Text className='font-montserrat-medium'>{item.title}</Text>
                </View>
                <View>
                  <Image
                    source={require('../../../../assets/icons/arrow_right.svg')}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#000000',
                    }}
                  />
                </View>
              </View>
            </Pressable>
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
