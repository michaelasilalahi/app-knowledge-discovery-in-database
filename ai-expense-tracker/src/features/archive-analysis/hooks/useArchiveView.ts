import { useState } from 'react';
import { ArchiveViewMode } from '../types';

export const useArchiveView = () => {
  const [viewMode, setViewMode] = useState<ArchiveViewMode>(
    'SCREEN_ARCHIVE_ANALYSIS_CALENDER',
  );

  // fungsi logic untuk menukar screen
  const handleSwitchView = () => {
    setViewMode((prevMode) =>
      prevMode === 'SCREEN_ARCHIVE_ANALYSIS_CALENDER'
        ? 'SCREEN_ARCHIVE_ANALYSIS_CUSTOM'
        : 'SCREEN_ARCHIVE_ANALYSIS_CALENDER',
    );
  };

  return {
    viewMode,
    handleSwitchView,
  };
};
