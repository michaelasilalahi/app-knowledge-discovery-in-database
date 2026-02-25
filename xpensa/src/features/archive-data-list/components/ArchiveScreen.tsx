import React from 'react';
import { View, Text } from 'react-native';
import { useArchiveView } from '../hooks/archiveView.hooks';
import { CalendarAnalysisExpenditureList } from './CalendarAnalysisExpenditureList';
import { CustomAnalysisExpenditureList } from './CustomAnalysisExpenditureList';

export const ArchiveScreen = () => {
  const { viewMode } = useArchiveView();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {viewMode === 'SCREEN_ARCHIVE_ANALYSIS_CALENDER' && (
        <CalendarAnalysisExpenditureList />
      )}

      {viewMode === 'SCREEN_ARCHIVE_ANALYSIS_CUSTOM' && (
        <CustomAnalysisExpenditureList />
      )}

      {viewMode === 'NONE' && (
        <View className='flex-1 items-center justify-center'>
          <Text className='font-montserrat-medium text-[#AAAAAA]'>
            Pengaturan Analisis belum diaktifkan. Mohon aktifkan Analisis
            Pengaturan anda.
          </Text>
        </View>
      )}
    </View>
  );
};
