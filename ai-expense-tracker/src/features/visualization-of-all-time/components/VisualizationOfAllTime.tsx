import { View, Text, Pressable } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Image } from 'expo-image';
import { useGoogleStore } from '@/auth/google';
import { useVisualizationOfAllTime } from '@/features/visualization-of-all-time/hooks/visualizationOfAllTime.hooks';
import { formatCurrency } from '../utils/visualizationOfAllTime.helpers';
import { GiftedLineChartItem } from '../types/visualizationOfAllTime.interface';

export const VisualizationOfAllTime = () => {
  const user = useGoogleStore((state) => state.user);
  const userId = user?.id || '';

  const {
    lineDataNeeds,
    lineDataWants,
    currentDate,
    goToPreviousMonth,
    goToNextMonth,
    isPrevDisabled,
    isNextDisabled,
  } = useVisualizationOfAllTime(userId);

  const colorNeeds = '#177AD5';
  const colorWants = '#ED6665';

  const formattedDate = currentDate.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  const hasData =
    lineDataNeeds.some((item) => item.value > 0) ||
    lineDataWants.some((item) => item.value > 0);

  return (
    <View className='bg-white'>
      <View className='w-[90%] mx-auto mt-[15px] mb-[15px]'>
        <View className='flex gap-y-[5px] mb-4'>
          <Text className='font-montserrat-semibold'>Line Chart</Text>
          <Text className='font-montserrat-medium text-[#AAAAAA]'>
            Visualisasi ini menampilkan riwayat perbandingan antara kategori
            Kebutuhan dan Keinginan pada bulan terpilih.
          </Text>
        </View>

        <View className='flex-row gap-x-[5px] justify-center items-center'>
          <View className='flex-row items-center'>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colorNeeds,
                marginRight: 5,
              }}
            />
            <Text className='text-xs font-montserrat-medium text-[#AAAAAA]'>
              Kebutuhan
            </Text>
          </View>
          <View className='flex-row items-center'>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colorWants,
                marginRight: 5,
              }}
            />
            <Text className='text-xs font-montserrat-medium text-[#AAAAAA]'>
              Keinginan
            </Text>
          </View>
        </View>

        <View className='flex gap-y-[15px]'>
          <View className='items-center justify-center -ml-2 min-h-[250px]'>
            {hasData ? (
              <LineChart
                dataSet={[
                  {
                    data: lineDataNeeds,
                    color: colorNeeds,
                    dataPointsColor: colorNeeds,
                    textColor: colorNeeds,
                    startFillColor: colorNeeds,
                    endFillColor: colorNeeds,
                    startOpacity: 0.1,
                    endOpacity: 0.1,
                    areaChart: true,
                  },
                  {
                    data: lineDataWants,
                    color: colorWants,
                    dataPointsColor: colorWants,
                    textColor: colorWants,
                    startFillColor: colorWants,
                    endFillColor: colorWants,
                    startOpacity: 0.1,
                    endOpacity: 0.1,
                    areaChart: true,
                  },
                ]}
                height={200}
                spacing={50}
                initialSpacing={12}
                thickness={1}
                hideRules
                hideYAxisText
                yAxisThickness={0}
                xAxisColor={'#EAEAEA'}
                xAxisLabelTextStyle={{
                  fontSize: 10,
                  width: 50,
                  textAlign: 'center',
                }}
                pointerConfig={{
                  pointerStripHeight: 250,
                  pointerStripColor: 'lightgray',
                  pointerStripWidth: 2,
                  pointerColor: 'lightgray',
                  radius: 5,
                  pointerLabelWidth: 100,
                  pointerLabelHeight: 50,
                  activatePointersOnLongPress: true,
                  autoAdjustPointerLabelPosition: true,
                  pointerLabelComponent: (items: GiftedLineChartItem[]) => {
                    const itemNeeds = items?.[0];
                    const itemWants = items?.[1];
                    if (!itemNeeds) return null;
                    return (
                      <View
                        style={{
                          height: 'auto',
                          width: 'auto',
                          justifyContent: 'center',
                          marginTop: -30,
                          marginLeft: -40,
                          backgroundColor: 'white',
                          borderRadius: 8,
                          padding: 5,
                          elevation: 5,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.9,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            color: 'gray',
                            textAlign: 'center',
                          }}
                        >
                          Tanggals {itemNeeds.label}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            color: colorNeeds,
                          }}
                        >
                          Needs: {formatCurrency(itemNeeds.value)}
                        </Text>
                        {itemWants && (
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 'bold',
                              color: colorWants,
                            }}
                          >
                            Wants: {formatCurrency(itemWants.value)}
                          </Text>
                        )}
                      </View>
                    );
                  },
                }}
              />
            ) : (
              <Text className='text-sm font-montserrat-medium text-[#AAAAAA] text-center'>
                Belum ada data transaksi pada bulan {formattedDate}.
              </Text>
            )}
          </View>

          <View className='flex-row justify-between items-center'>
            <Pressable onPress={goToPreviousMonth} disabled={isPrevDisabled}>
              <View style={{ opacity: isPrevDisabled ? 0 : 1 }}>
                <Image
                  source={require('../../../../assets/icons/arrow_right.svg')}
                  style={{
                    width: 15,
                    height: 15,
                    transform: [{ rotate: '180deg' }],
                  }}
                  tintColor={'#AAAAAA'}
                  contentFit='contain'
                />
              </View>
            </Pressable>
            <Text className='font-montserrat-medium'>{formattedDate}</Text>
            <Pressable onPress={goToNextMonth} disabled={isNextDisabled}>
              <View style={{ opacity: isNextDisabled ? 0 : 1 }}>
                <Image
                  source={require('../../../../assets/icons/arrow_right.svg')}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                  tintColor={'#AAAAAA'}
                  contentFit='contain'
                />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
