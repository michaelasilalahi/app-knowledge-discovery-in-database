import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pastikan ada 'export {}' di bawah jika file tidak memiliki export lain,
// agar dianggap sebagai module oleh TS
declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

if (__DEV__) {
  const iron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      name: 'AI Expense Tracker',
      host: '192.168.18.16',
      port: 9090,
    })
    .useReactNative({
      asyncStorage: true,
      networking: {
        ignoreUrls: /symbolicate/,
      },
    })
    .connect();

  console.tron = iron;
  iron.clear?.();
}

export default Reactotron;
