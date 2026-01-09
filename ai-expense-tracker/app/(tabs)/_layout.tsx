import { Tabs } from 'expo-router';
import { Image } from 'expo-image';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/icons/house_fill.svg')
                  : require('../../assets/icons/house.svg')
              }
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000000' : '#aaaaaa',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='plus'
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/icons/plus_fill.svg')
                  : require('../../assets/icons/plus.svg')
              }
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000000' : '#aaaaaa',
              }}
              contentFit='contain'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='archive'
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/icons/archive_fill.svg')
                  : require('../../assets/icons/archive.svg')
              }
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000000' : '#aaaaaa',
              }}
              contentFit='contain'
            />
          ),
        }}
      />
    </Tabs>
  );
}
