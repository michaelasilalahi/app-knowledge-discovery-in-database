import React from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useCalendarAnalysisDataList } from '../utils/calendarAnalysisDataList.helpers';

export const CalendarAnalysisExpenditureList = () => {
  const { listData, isLoading } = useCalendarAnalysisDataList();
  return (
    <View>
      <View className='py-[15px] border-b-[0.5px] border-b-[#AAAAAA]'>
        <Text className='font-montserrat-bold text-[15px]'>
          Analisis Calender
        </Text>
      </View>

      <View>
        {isLoading ? (
          <View className='flex items-center justify-center min-h-[200px]'>
            <ActivityIndicator size='small' color='#AAAAAA' />
          </View>
        ) : (
          <FlatList
            data={listData}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
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
              <View className='flex items-center justify-center min-h-[200px]'>
                <Text className='font-montserrat-medium text-[#AAAAAA]'>
                  Belum ada data pengeluaran.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};
