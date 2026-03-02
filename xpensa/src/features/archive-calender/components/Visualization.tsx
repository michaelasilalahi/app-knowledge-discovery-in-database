import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { useGoogleStore } from '@/auth/google';
import { useBarChart } from '@/features/archive-calender/hooks/barChart.hooks';
import { usePieChart } from '@/features/archive-calender/hooks/pieChart.hooks';
import { formatCurrency } from '@/features/archive-calender/utils/pieChart.helpers';

export const Visualization = () => {
  const user = useGoogleStore((state) => state.user);
  const userId = user?.id || '';

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const { loading, chartData, totalExpense } = useBarChart(
    userId,
    currentMonth,
    currentYear,
  );

  const {
    loading: loadingPie,
    pieData,
    totalCount: totalPieCount,
  } = usePieChart(userId, currentMonth, currentYear);

  const uiChartData = chartData.map((item) => {
    return {
      value: item.value,
      frontColor: item.frontColor,
      topLabelComponent: () => (
        <Text
          style={{
            color: item.frontColor,
            fontSize: 12,
            marginBottom: 5,
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'center',
          }}
        >
          {item.value}
        </Text>
      ),
      labelComponent: () => (
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              fontFamily: 'Montserrat-SemiBold',
              marginBottom: 2,
            }}
            numberOfLines={1}
          >
            {item.label}
          </Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 10,
              fontFamily: 'Montserrat-Medium',
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            {item.formattedAmount}
          </Text>
        </View>
      ),
    };
  });

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center bg-white'>
        <ActivityIndicator size='large' color='black' />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className='flex-1 gap-y-[50px]'>
        <View className='bg-white'>
          <View className='w-[90%] mx-auto mt-[15px]'>
            <View className='flex gap-y-[5px]'>
              <Text className='font-montserrat-semibold'>Bar Chart</Text>
              <Text className='font-montserrat-medium text-[#AAAAAA]'>
                Visualisasi berikut menampilkan perbandingan total pengeluaran
                antara kategori Kebutuhan dan Keinginan.
              </Text>
            </View>

            <View className='flex justify-center items-center'>
              {totalExpense > 0 ? (
                <View className='items-center mb-[30px] w-full'>
                  <BarChart
                    data={uiChartData}
                    barWidth={50}
                    spacing={50}
                    initialSpacing={95}
                    height={250}
                    yAxisLabelWidth={0}
                    hideRules
                    hideAxesAndRules
                    xAxisThickness={0}
                    yAxisThickness={0}
                    barBorderRadius={5}
                    xAxisLabelTextStyle={{ color: 'transparent', height: 0 }}
                    animationDuration={500}
                    scrollAnimation={false}
                  />
                </View>
              ) : (
                <Text className='text-sm font-montserrat-medium'>
                  Belum ada data pengeluaran.
                </Text>
              )}
            </View>
          </View>
        </View>

        <View className='bg-white'>
          <View className='w-[90%] mx-auto mt-[15px]'>
            <View className='flex gap-y-[5px]'>
              <Text className='font-montserrat-semibold'>Pie Chart</Text>
              <Text className='font-montserrat-medium text-[#AAAAAA]'>
                Visualisasi ini menampilkan distribusi total pengeluaran anda
                berdasarkan label belanja.
              </Text>
            </View>

            <View className='flex gap-y-[30px] mb-[30px]'>
              <View className='items-center mt-[15px]'>
                {pieData.length > 0 ? (
                  <PieChart
                    data={pieData}
                    donut
                    radius={150}
                    showText
                    textSize={10}
                    labelsPosition='outward'
                    focusOnPress={true}
                    toggleFocusOnPress={true}
                    innerRadius={75}
                    innerCircleColor={'white'}
                    isAnimated={true}
                    animationDuration={700}
                    sectionAutoFocus={false}
                    centerLabelComponent={() => {
                      return (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 24,
                              color: 'black',
                              fontWeight: 'bold',
                            }}
                          >
                            {totalPieCount}
                          </Text>
                          <Text style={{ fontSize: 12, color: '#AAAAAA' }}>
                            Transaksi
                          </Text>
                        </View>
                      );
                    }}
                  />
                ) : (
                  <Text className='text-sm font-montserrat-medium text-gray-500 py-10'>
                    Belum ada data label.
                  </Text>
                )}
              </View>

              <View>
                {pieData.length > 0 && (
                  <View className='flex-col gap-y-3'>
                    {pieData.map((item, index) => (
                      <View
                        key={index}
                        className='flex-row items-center w-full'
                      >
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 10,
                            backgroundColor: item.color,
                            marginRight: 5,
                          }}
                        />
                        <Text
                          className='text-xs font-montserrat-medium'
                          numberOfLines={1}
                        >
                          {item.label} •{' '}
                          {formatCurrency(item.originalAmount || 0)} •{' '}
                          {item.originalCount}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
