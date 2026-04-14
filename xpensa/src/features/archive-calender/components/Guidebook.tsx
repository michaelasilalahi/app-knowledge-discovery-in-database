import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export const Guidebook = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='flex-1 w-[90%] mx-auto mt-[10px]'
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View className='gap-y-[30px]'>
        <View className='gap-y-[15px]'>
          <Text className='font-montserrat-semibold'>Apa itu Data Mining</Text>
          <Text className='font-montserrat-medium leading-[2]'>
            Bayangkan Anda sedang menambang emas. Anda menggali tumpukan tanah
            dan bebatuan yang sangat besar, bukan untuk mengumpulkan tanahnya,
            melainkan untuk menemukan bongkahan emas berharga di dalamnya. Data
            Mining bekerja persis seperti itu. Ini adalah proses menggali
            tumpukan data yang sangat besar untuk menemukan emas berupa pola
            tersembunyi, tren, atau informasi penting yang sebelumnya tidak kita
            sadari. Untuk menemukan pola tersembunyi tersebut, aplikasi ini
            menggunakan salah satu teknik Data Mining yang disebut Association
            Rule Learning
          </Text>
        </View>

        <View className='gap-y-[15px]'>
          <Text className='font-montserrat-semibold'>
            Mengenal Association Rule Learning
          </Text>
          <Text className='font-montserrat-medium leading-[2]'>
            Association Rule Learning (Pembelajaran Aturan Asosiasi) adalah
            salah satu teknik paling populer dalam Data Mining. Tugas utamanya
            adalah menemukan hubungan Sebab-Akibat atau kebiasaan-kebiasaan yang
            sering muncul secara bersamaan.
          </Text>
          <View className='w-[90%] mx-auto gap-y-[15px]'>
            <Text className='font-montserrat-semibold leading-[2]'>
              Adapun Metrik Association Rule Learning yaitu:
            </Text>
            <View className='flex gap-y-[10px]'>
              <View className='flex-row'>
                <Text className='font-montserrat-medium leading-[2]'>1. </Text>
                <View>
                  <Text className='font-montserrat-medium leading-[2]'>
                    Support.
                  </Text>
                  <Text className='font-montserrat-medium leading-[2]'>
                    {
                      'Support mengukur seberapa sering suatu itemset muncul dalam dataset transaksi. Semakin tinggi nilai Support, semakin sering itemset tersebut muncul.'
                    }
                  </Text>
                </View>
              </View>

              <View className='flex-row'>
                <Text className='font-montserrat-medium leading-[2]'>2. </Text>
                <View>
                  <Text className='font-montserrat-medium leading-[2]'>
                    Confidence.
                  </Text>
                  <Text className='font-montserrat-medium leading-[2]'>
                    {
                      'Confidence mengukur seberapa besar kepastian sebuah aturan. Singkatnya, jika anda sudah membeli item A, seberapa besar persentase kemungkinan anda juga akan membeli item B ? Semakin mendekati 100%, semakin pasti kebiasaan tersebut terjadi.'
                    }
                  </Text>
                </View>
              </View>

              <View className='flex-row'>
                <Text className='font-montserrat-medium leading-[2]'>3. </Text>
                <View>
                  <Text className='font-montserrat-medium leading-[2]'>
                    Lift.
                  </Text>
                  <Text className='font-montserrat-medium leading-[2]'>
                    {
                      'Lift mengukur seberapa kuat hubungan sebab-akibat antara item A dan B, dibandingkan jika keduanya terjadi secara kebetulan. Jika nilai Lift lebih dari 1 (>1), berarti pembelian item A memang memicu pembelian item B, bukan sekadar kebetulan acak.'
                    }
                  </Text>
                </View>
              </View>

              <View className='flex-row'>
                <Text className='font-montserrat-medium leading-[2]'>4. </Text>
                <View>
                  <Text className='font-montserrat-medium leading-[2]'>
                    Leverage
                  </Text>
                  <Text className='font-montserrat-medium leading-[2]'>
                    {
                      'Mirip dengan Lift, Leverage menghitung selisih antara seberapa sering item A dan B benar-benar dibeli bersamaan, dibandingkan dengan seberapa sering kita mengekspektasikan mereka dibeli bersamaan secara acak. Nilai Leverage di atas 0 menunjukkan hubungan yang positif.'
                    }
                  </Text>
                </View>
              </View>

              <View className='flex-row'>
                <Text className='font-montserrat-medium leading-[2]'>5. </Text>
                <View>
                  <Text className='font-montserrat-medium leading-[2]'>
                    Conviction
                  </Text>
                  <Text className='font-montserrat-medium leading-[2]'>
                    {
                      'Conviction membandingkan probabilitas item X muncul tanpa item Y dengan probabilitas prediksi yang salah. Metrik ini memberikan gambaran yang lebih jelas tentang seberapa sering aturan atau kebiasaan pengeluaran Anda tersebut dilanggar.'
                    }
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className='gap-y-[15px]'>
          <Text className='font-montserrat-semibold'>
            Tujuan pada Aplikasi Xpensa
          </Text>
          <View className='gap-y-[15px]'>
            <Text className='font-montserrat-medium leading-[2]'>
              Dalam aplikasi ini, algoritma tersebut bertugas untuk mencari pola
              pengeluaran yang berpotensi menyebabkan pemborosan, khususnya pada
              kategori Keinginan.
            </Text>
            <Text className='font-montserrat-medium leading-[2]'>
              Mengapa fokus pada kategori keinginan ? Karena pembelian pada
              kategori ini sering kali tidak didasarkan pada kebutuhan pokok,
              melainkan dipicu oleh pengaruh lingkungan sosial, gengsi, atau
              tren yang sedang berkembang. Dengan menyadari pola kebiasaan jajan
              Anda sendiri, Anda bisa lebih bijak dalam mengelola keuangan!
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
