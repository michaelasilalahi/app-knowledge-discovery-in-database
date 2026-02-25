import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { MiningResultItem } from '../types/dataMiningResult.interface';
import {
  formatMetricValue,
  metricLabels,
  parseInsightString,
  formatItemToMultiline,
  formatRupiah,
  formatDate,
} from '../utils/dataMiningResult.helpers';

const TableRow = ({
  label,
  value,
  isLast = false,
  isLongText = false,
}: {
  label: string;
  value: string | number;
  isLast?: boolean;
  isLongText?: boolean;
}) => (
  <View
    className={`flex-row border-b border-gray-200 ${isLast ? 'border-b-0' : ''} p-2`}
  >
    <View className='flex-1 justify-center'>
      <Text className='text-gray-600 font-montserrat-medium text-xs'>
        {label}
      </Text>
    </View>
    <View className='flex-1 justify-center'>
      <Text className='text-gray-900 font-montserrat-medium text-xs text-left'>
        {isLongText ? value : formatMetricValue(Number(value))}
      </Text>
    </View>
  </View>
);

export const DataMiningResult = (dataMiningResult: MiningResultItem) => {
  const { description, suggestion } = useMemo(() => {
    return parseInsightString(dataMiningResult.insight_enrichment);
  }, [dataMiningResult.insight_enrichment]);

  const { totalTransactions, totalExpenditure } = useMemo(() => {
    if (
      !dataMiningResult.related_transactions ||
      dataMiningResult.related_transactions.length === 0
    ) {
      return { totalTransactions: 0, totalExpenditure: 0 };
    }
    return dataMiningResult.related_transactions.reduce(
      (acc, curr) => ({
        totalTransactions: acc.totalTransactions + 1,
        totalExpenditure: acc.totalExpenditure + curr.amount,
      }),
      { totalTransactions: 0, totalExpenditure: 0 },
    );
  }, [dataMiningResult.related_transactions]);

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View className='flex gap-y-[5px] bg-[#EEEEEE]'>
        <View className='bg-white'>
          <View className='flex-row justify-between items-center w-[90%] mx-auto mt-[15px] mb-[15px]'>
            <Text className='font-montserrat-medium'>Buku Panduan</Text>
            <Pressable>
              <Image
                source={require('../../../../assets/icons/book_open.svg')}
                style={{
                  width: 30,
                  height: 30,
                }}
                tintColor={'#AAAAAA'}
                contentFit='contain'
              />
            </Pressable>
          </View>
        </View>

        <View className='bg-white'>
          <View className='flex gap-y-[30px] w-[90%] mx-auto mt-[15px] mb-[15px]'>
            <View className='border border-gray-200 rounded-lg overflow-hidden bg-white'>
              <View className='bg-gray-50 p-2 border-b border-gray-200 items-center'>
                <Text className='font-montserrat-bold text-[10px] text-gray-700'>
                  Deskripsi
                </Text>
              </View>
              <TableRow
                label='Antecedents'
                value={formatItemToMultiline(dataMiningResult.antecedents)}
                isLongText={true}
              />
              <TableRow
                label='Consequents'
                value={formatItemToMultiline(dataMiningResult.consequents)}
                isLongText={true}
              />
              <TableRow
                label='Deskripsi'
                value={description}
                isLongText={true}
              />
              <TableRow
                label='Saran'
                value={suggestion}
                isLast
                isLongText={true}
              />
            </View>

            <View className='border border-gray-200 rounded-lg overflow-hidden'>
              <View className='bg-gray-50 p-2 border-b border-gray-200 items-center'>
                <Text className='font-montserrat-bold text-xs text-gray-700'>
                  Metrik Statistik
                </Text>
              </View>

              <TableRow
                label={metricLabels.antecedent_support}
                value={dataMiningResult.antecedent_support}
              />
              <TableRow
                label={metricLabels.consequent_support}
                value={dataMiningResult.consequent_support}
              />
              <TableRow
                label={metricLabels.support}
                value={dataMiningResult.support}
              />
              <TableRow
                label={metricLabels.confidence}
                value={dataMiningResult.confidence}
              />
              <TableRow
                label={metricLabels.lift}
                value={dataMiningResult.lift}
              />
              <TableRow
                label={metricLabels.leverage}
                value={dataMiningResult.leverage}
              />
              <TableRow
                label={metricLabels.conviction}
                value={dataMiningResult.conviction}
                isLast
              />
            </View>
          </View>
        </View>

        <View className='bg-white'>
          <View className='w-[90%] mx-auto mt-[15px] flex gap-y-[30px]'>
            <View className='flex gap-y-[10px]'>
              <View className='flex-row justify-between items-center'>
                <Text className='font-montserrat-semibold'>Pengeluaran</Text>
                <Text className='font-montserrat-medium'>
                  {totalTransactions}
                </Text>
              </View>
              <View className='flex-row justify-between items-center'>
                <Text className='font-montserrat-semibold'>
                  Total Pengeluaran
                </Text>
                <Text className='font-montserrat-medium'>
                  {formatRupiah(totalExpenditure)}
                </Text>
              </View>
            </View>

            <View>
              {dataMiningResult.related_transactions &&
              dataMiningResult.related_transactions.length > 0 ? (
                dataMiningResult.related_transactions.map((item, index) => (
                  <View
                    key={index}
                    className='flex-row justify-between items-center py-[10px] border-b-[0.5px] border-b-[#AAAAAA]'
                  >
                    <View className='flex-1 gap-y-[5px]'>
                      <Text className='font-montserrat-semibold'>
                        {item.type_of_expenditure}
                      </Text>
                      <View className='flex gap-y-[5px]'>
                        <Text className='font-montserrat-medium text-[13px] text-[#AAAAAA]'>
                          {item.category} • {item.label}
                        </Text>
                        <Text className='font-montserrat-medium text-[13px] text-[#AAAAAA]'>
                          {formatDate(item.date)}
                        </Text>
                      </View>
                    </View>
                    <Text className='font-montserrat-medium'>
                      {formatRupiah(item.amount)}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className='text-center text-gray-400 text-xs italic py-4'>
                  Detail item tidak tersedia.
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
