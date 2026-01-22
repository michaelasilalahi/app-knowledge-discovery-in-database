import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// components
import { ArchiveCalenderScreen } from '@/features/archive-calender';

export default function ArchiveCalender() {
  return (
    <SafeAreaView edges={['bottom']}>
      <ArchiveCalenderScreen />
    </SafeAreaView>
  );
}
