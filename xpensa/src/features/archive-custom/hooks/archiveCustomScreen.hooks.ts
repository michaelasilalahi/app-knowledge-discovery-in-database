import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ARCHIVE_TABS } from '../utils/archiveCustomScreen.helpers';
import { TabType } from '../types/archiveCustomScreen.type';

export const useArchiveCustomScreen = () => {
  const { title, startDate, endDate } = useLocalSearchParams<{
    title: string;
    startDate: string;
    endDate: string;
  }>();

  const [activeTab, setActiveTab] = useState<TabType>('Pengeluaran');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return {
    title,
    startDate,
    endDate,
    activeTab,
    setActiveTab: handleTabChange,
    tabs: ARCHIVE_TABS,
  };
};
