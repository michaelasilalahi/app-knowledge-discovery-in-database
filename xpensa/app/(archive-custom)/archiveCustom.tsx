import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// components
import { ArchiveCustomScreen } from '@/features/archive-custom';

export default function ArchiveCustom() {
  return (
    <SafeAreaView className='flex-1' edges={['bottom']}>
      <ArchiveCustomScreen />
    </SafeAreaView>
  );
}
