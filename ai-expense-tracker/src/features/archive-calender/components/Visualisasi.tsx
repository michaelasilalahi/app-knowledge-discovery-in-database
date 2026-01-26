import React from 'react';
import { View, Text } from 'react-native';

// Definisikan tipe Props
type VisualisasiProps = {
  periodTitle: string; // Menerima judul bulan
};

export const Visualisasi = ({ periodTitle }: VisualisasiProps) => {
  return (
    <View>
      <Text className='font-montserrat-medium'>
        Menampilkan daftar pengeluaran untuk: {periodTitle}
      </Text>
    </View>
  );
};
