import React from 'react';
import { View, Text } from 'react-native';

// Definisikan tipe Props
type ExpensesProps = {
  periodTitle: string; // Menerima judul bulan
};

export const Expenses = ({ periodTitle }: ExpensesProps) => {
  return (
    <View>
      <Text className='font-montserrat-medium'>
        Menampilkan daftar pengeluaran untuk: {periodTitle}
      </Text>
      {/* Logic pengambilan data berdasarkan periodTitle disini */}
    </View>
  );
};
