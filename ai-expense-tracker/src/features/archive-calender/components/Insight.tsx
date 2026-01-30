import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';

// Components
import { ProgressBar } from './ProgressBar';
import { AnalysisDisabled } from './AnalysisDisable';

// Hooks
import { useProgressBarApi } from '../hooks/useProgressBarApi';

interface MiningResult {
  id: string | number;
  message: string;
}

export const Insight = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const { progressBarData, isLoading, refreshProgress } = useProgressBarApi(
    currentMonth,
    currentYear,
  );

  const renderHeaderComponent = () => {
    if (isLoading && !progressBarData) return null;
    if (!progressBarData) return null;

    if (progressBarData.status === 'disabled') {
      return <AnalysisDisabled message={progressBarData.message} />;
    }

    if (
      progressBarData.status === 'progress' ||
      progressBarData.status === 'ready_to_mine'
    ) {
      return (
        <ProgressBar progressBarData={progressBarData} isLoading={isLoading} />
      );
    }
    return null;
  };

  const miningResults: MiningResult[] = [];

  return (
    <View className='flex-1'>
      <FlatList
        data={miningResults}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={renderHeaderComponent()}
        renderItem={({ item }) => (
          <View className='p-4 bg-gray-50 mb-3 rounded-xl border border-gray-100'>
            <Text className='font-montserrat-medium text-gray-800'>
              {item.message}
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshProgress}
            colors={['black']}
            tintColor={'black'}
          />
        }
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
