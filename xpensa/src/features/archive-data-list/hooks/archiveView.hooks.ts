import { settingAnalysisStore } from '@/features/setting-analysis';
import { ArchiveViewMode } from '../types/archiveViewMode.type';

export const useArchiveView = () => {
  // store (zustand) analysis setting
  const calendarConfig = settingAnalysisStore(
    (state) => state.analysisCalendarConfig,
  );
  const customConfig = settingAnalysisStore(
    (state) => state.analysisCustomConfig,
  );

  let viewMode: ArchiveViewMode | 'NONE' = 'NONE';

  if (calendarConfig !== null) {
    viewMode = 'SCREEN_ARCHIVE_ANALYSIS_CALENDER';
  } else if (customConfig !== null) {
    viewMode = 'SCREEN_ARCHIVE_ANALYSIS_CUSTOM';
  }

  return { viewMode };
};
