import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Stack } from 'expo-router';

// hooks
import { useArchiveCustomScreen } from '../hooks/archiveCustomScreen.hooks';
// components
import { Expenses } from './Expenses';
import { Visualisasi } from './Visualisasi';
import { Insight } from './Insight';

export const ArchiveCustomScreen = () => {
  const { title, activeTab, setActiveTab, tabs } = useArchiveCustomScreen();

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          title: title,
          headerTitleStyle: { fontFamily: 'montserrat_medium' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />

      {/* Switch Tab Bar Expense, Visualisasi, Insight */}
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

      {/* components */}
      <View className='flex-1'>
        {activeTab === 'Pengeluaran' && <Expenses periodTitle={title} />}

        {activeTab === 'Visualisasi' && <Visualisasi periodTitle={title} />}

        {activeTab === 'Insight' && <Insight periodTitle={title} />}
      </View>
    </View>
  );
};
