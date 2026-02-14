import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ARCHIVE_TABS } from '../utils/archiveCalenderScreenTabs.helpers';
import { TabType } from '../types/archiveCalenderScreen.interface';

export const useArchiveCalenderScreen = () => {
  const { title } = useLocalSearchParams<{ title: string }>();

  // state untuk mengatur tab mana yang aktif
  const [activeTab, setActiveTab] = useState<TabType>('Pengeluaran');

  // handler untuk mengubah tab yang aktif
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return {
    title,
    activeTab,
    setActiveTab: handleTabChange,
    tabs: ARCHIVE_TABS,
  };
};
