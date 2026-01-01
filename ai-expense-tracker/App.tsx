import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// @ts-expect-error global.css is handled by the bundler; no types needed
import './global.css';

export default function App() {
  // const [data, setData] = useState<any>(null);

  // useEffect(() => {
  //   fetch('http://192.168.18.16:8000/')
  //     .then(response => response.json())
  //     .then(json => setData(json));
  // }, []);

  return (
    <View style={styles.container}>
      <Text className=" text-blue-500">Open up App.tsx to start working on your app!</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
