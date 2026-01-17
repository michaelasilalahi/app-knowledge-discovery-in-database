import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { SwitchScreenAnalysisProps } from '../types';

export const ArchiveAnalysisCustom = ({
  onSwitch,
}: SwitchScreenAnalysisProps) => {
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
    </View>
  );
};
