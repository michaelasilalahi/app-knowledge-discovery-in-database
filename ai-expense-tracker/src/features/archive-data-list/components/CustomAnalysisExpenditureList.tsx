import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

// hooks
import { useCustomAnalysisDataList } from '../utils/customAnalysisDataList';

// types
import { SwitchScreenAnalysisProps } from '../types/switchScreenAnalysisPropsType';

export const CustomAnalysisExpenditureList = ({
  onSwitch,
}: SwitchScreenAnalysisProps) => {
  const { listData } = useCustomAnalysisDataList();
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
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push({
                pathname: '/(archive-custom)/archiveCustom',
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
              <Image
                source={require('../../../../assets/icons/arrow_right.svg')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: '#000000',
                }}
              />
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
  );
};
