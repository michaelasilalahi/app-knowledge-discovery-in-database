import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export const Guidebook = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='flex-1 w-[90%] mx-auto mt-[10px]'
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View className='flex-1 gap-y-[30px]'>
        <View className='flex-1 gap-y-[5px]'>
          <Text className='font-montserrat-semibold'>Apa itu Data Mining</Text>
          <Text className='font-montserrat-medium text-[#AAAAAA] leading-[1.5] indent-8'>
            Bayangkan Anda sedang menambang emas. Anda menggali tumpukan tanah
            dan bebatuan yang sangat besar, bukan untuk mengumpulkan tanahnya,
            melainkan untuk menemukan bongkahan emas berharga di dalamnya.{' '}
            {'\n\n'}
            Data Mining bekerja persis seperti itu. Ini adalah proses menggali
            tumpukan data yang sangat besar untuk menemukan emas berupa pola
            tersembunyi, tren, atau informasi penting yang sebelumnya tidak kita
            sadari. Untuk menemukan pola tersembunyi tersebut, aplikasi ini
            menggunakan salah satu teknik Data Mining yang disebut Association
            Rule Learning
          </Text>
        </View>

        <View className='flex-1 gap-y-[5px]'>
          <Text className='font-montserrat-semibold'>
            Mengenal Association Rule Learning
          </Text>
          <Text className='font-montserrat-medium text-[#AAAAAA] leading-[1.5]'>
            Association Rule Learning (Pembelajaran Aturan Asosiasi) adalah
            salah satu teknik paling populer dalam Data Mining. Tugas utamanya
            adalah menemukan hubungan Sebab-Akibat atau kebiasaan-kebiasaan yang
            sering muncul secara bersamaan.
            {'\n\n'}
            Teknik ini sering juga disebut sebagai Analisis Keranjang Belanja (
            <Text className='italic'>Market Basket Analysis</Text>). Intinya,
            algoritma ini bertugas mencari pola seperti:{' '}
            <Text className='font-montserrat-medium text-[#AAAAAA] leading-[1.5]'>
              Jika seseorang melakukan A, maka kemungkinan besar ia juga akan
              melakukan B.
            </Text>
          </Text>

          <View className='w-[90%] mx-auto mt-[30px]'>
            <Text className='font-montserrat-semibold'>
              Adapun Metrik Association Rule Learning yaitu:
            </Text>
            <View className='flex gap-y-2'>
              <View className='flex-row'>
                <Text className='font-montserrat-semibold text-[#AAAAAA] mr-2'>
                  1.
                </Text>
                <Text className='flex-1 font-montserrat-medium text-[#AAAAAA] leading-[1.5]'>
                  Jika seseorang melakukan A, maka kemungkinan besar ia juga
                  akan melakukan B.
                </Text>
              </View>

              <View className='flex-row'>
                <Text className='font-montserrat-semibold text-[#AAAAAA] mr-2'>
                  2.
                </Text>
                <Text className='flex-1 font-montserrat-medium text-[#AAAAAA] leading-[1.5]'>
                  Penjelasan metrik kedua ditaruh di sini.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className='flex-1 gap-y-[5px]'>
          <Text className='font-montserrat-semibold'>
            Tujuan pada Aplikasi Xpensa
          </Text>
          <Text className='font-montserrat-medium text-[#AAAAAA] leading-[1.5]'>
            Dalam aplikasi ini, algoritma tersebut bertugas untuk mencari pola
            pengeluaran yang berpotensi menyebabkan pemborosan, khususnya pada
            kategori Keinginan.
            {'\n\n'}
            Mengapa fokus pada kategori keinginan ? Karena pembelian pada
            kategori ini sering kali tidak didasarkan pada kebutuhan pokok,
            melainkan dipicu oleh pengaruh lingkungan sosial, gengsi, atau tren
            yang sedang berkembang. Dengan menyadari pola kebiasaan jajan Anda
            sendiri, Anda bisa lebih bijak dalam mengelola keuangan!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
