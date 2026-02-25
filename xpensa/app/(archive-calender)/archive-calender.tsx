import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// components
import { ArchiveCalenderScreen } from '@/features/archive-calender';

export default function ArchiveCalender() {
  return (
    <SafeAreaView className='flex-1' edges={['bottom']}>
      <ArchiveCalenderScreen />
    </SafeAreaView>
  );
}
