import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { Expenses } from './Expenses';
import { Visualization } from './Visualization';
import { Insight } from './Insight';
import { useArchiveCalenderScreen } from '../hooks/archiveCalenderScreen.hooks';

export const ArchiveCalenderScreen = () => {
  const { title, activeTab, setActiveTab, tabs } = useArchiveCalenderScreen();

  return (
    <View className='flex-1'>
      <Stack.Screen
        options={{
          headerShown: true,
          title: title,
          headerTitleStyle: { fontFamily: 'montserrat_medium' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />

      <View className='flex-row'>
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-4 items-center ${
              activeTab === tab
                ? 'border-b-black border-b'
                : 'border-transparent'
            }`}
          >
            <Text
              className={`font-montserrat-semibold ${
                activeTab === tab ? 'text-black' : 'text-[#AAAAAA]'
              }`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className='flex-1'>
        {activeTab === 'Pengeluaran' && <Expenses periodTitle={title} />}
        {activeTab === 'Visualisasi' && <Visualization />}
        {activeTab === 'Insight' && <Insight />}
      </View>
    </View>
  );
};
