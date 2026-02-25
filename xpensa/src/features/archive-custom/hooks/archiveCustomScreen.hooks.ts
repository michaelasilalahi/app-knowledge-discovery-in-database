import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ARCHIVE_TABS } from '../utils/archiveCustomScreen.helpers';
import { TabType } from '../types/archiveCustomScreen.type';

export const useArchiveCustomScreen = () => {
  // tangkap data dari router
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
