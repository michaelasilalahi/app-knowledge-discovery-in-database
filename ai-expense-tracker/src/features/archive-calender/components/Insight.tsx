import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';

// Components
import { ProgressBar } from './ProgressBar';
import { AnalysisDisabled } from './AnalysisDisable';

// Hooks
import { useInsightProgressBar } from '../hooks/useInsightProgressBar';

interface MiningResult {
  id: string | number;
  message: string;
}

export const Insight = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const { progressBarData, isLoading, refreshProgress } = useInsightProgressBar(
    currentMonth,
    currentYear,
  );

  const renderHeaderComponent = () => {
    if (isLoading && !progressBarData) return null;
    if (!progressBarData) return null;

    // SKENARIO C: Jika Setting Mati
    if (progressBarData.status === 'disabled') {
      return <AnalysisDisabled message={progressBarData.message} />;
    }

    // SKENARIO A & B: Jika Sedang Progress atau Siap Mining
    if (
      progressBarData.status === 'progress' ||
      progressBarData.status === 'ready_to_mine'
    ) {
      return (
        <ProgressBar progressBarData={progressBarData} isLoading={isLoading} />
      );
    }

    // Jika 'completed', Header hilang (karena nanti list hasil akan muncul)
    return null;
  };
  // -----------------------

  // Nanti: Jika status === 'completed', fetch data ke miningResults
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
        ListEmptyComponent={
          <ProgressBar
            progressBarData={progressBarData}
            isLoading={isLoading}
          />
        }
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
