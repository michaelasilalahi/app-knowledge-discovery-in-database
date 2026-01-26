import React from 'react';
import { View, Text } from 'react-native';

// Definisikan tipe Props
type InsightProps = {
  periodTitle: string; // Menerima judul bulan
};

export const Insight = ({ periodTitle }: InsightProps) => {
  return (
    <View>
      <Text className='font-montserrat-medium'>Insight</Text>
    </View>
  );
};
