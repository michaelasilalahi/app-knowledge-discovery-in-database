import React from 'react';
import { View, Text } from 'react-native';
import { MiningResultItem } from '../types/miningResultApiTypes';

// utils
import {
  formatRuleTitle,
  formatMetricValue,
  metricLabels,
} from '../utils/miningResultHelpers';

const TableRow = ({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string | number;
  isLast?: boolean;
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
        {formatMetricValue(Number(value))}
      </Text>
    </View>
  </View>
);

export const DataMiningResult = (item: MiningResultItem) => {
  return (
    <View className='flex w-[90%] mx-auto mt-[30px] gap-y-[30px]'>
      <View className='flex gap-y-[10px]'>
        <Text className='font-montserrat-semibold text-lg text-gray-900'>
          {formatRuleTitle(item.rule_name)}
        </Text>
        <Text className='font-montserrat-medium text-[13px] text-[#AAAAAA]'>
          {item.insight_enrichment}
        </Text>
      </View>

      <View className='border border-gray-200 rounded-lg overflow-hidden'>
        <View className='bg-gray-50 p-2 border-b border-gray-200 items-center'>
          <Text className='font-montserrat-bold text-xs text-gray-700'>
            Metrik Statistik
          </Text>
        </View>

        <TableRow
          label={metricLabels.antecedent_support}
          value={item.antecedent_support}
        />
        <TableRow
          label={metricLabels.consequent_support}
          value={item.consequent_support}
        />
        <TableRow label={metricLabels.support} value={item.support} />
        <TableRow label={metricLabels.confidence} value={item.confidence} />
        <TableRow label={metricLabels.lift} value={item.lift} />
        <TableRow label={metricLabels.leverage} value={item.leverage} />
        <TableRow
          label={metricLabels.conviction}
          value={item.conviction}
          isLast
        />
      </View>

      <View>
        <Text className='font-montserrat-semibold'>Jenis Pengeluaran</Text>
      </View>
    </View>
  );
};
