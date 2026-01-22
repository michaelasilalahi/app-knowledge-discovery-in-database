import React from 'react';
import { View, Text } from 'react-native';

// Definisikan tipe Props
type InsightProps = {
  periodTitle: string; // Menerima judul bulan
};

export const Insight = ({ periodTitle }: InsightProps) => {
  return (
    <View>
      <Text className='font-montserrat-medium'>
        Menampilkan daftar pengeluaran untuk: {periodTitle}
      </Text>
      {/* Logic pengambilan data berdasarkan periodTitle disini */}
    </View>
  );
};
