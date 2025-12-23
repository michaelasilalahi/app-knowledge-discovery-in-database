import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// @ts-expect-error global.css is handled by the bundler; no types needed
import './global.css';

export default function App() {
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
