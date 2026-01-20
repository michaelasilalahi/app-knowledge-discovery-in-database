// Interface untuk props komponen yang memiliki fitur switch screen
export interface SwitchScreenAnalysisProps {
  onSwitch: () => void;
}

// Tipe data untuk mendefinisikan mode tampilan di halaman Archive
export type ArchiveViewMode =
  | 'SCREEN_ARCHIVE_ANALYSIS_CALENDER'
  | 'SCREEN_ARCHIVE_ANALYSIS_CUSTOM';
