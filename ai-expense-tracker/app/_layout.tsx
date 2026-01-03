import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// @ts-expect-error global.css is handled by the bundler; no types needed
import '../global.css';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs(['SafeAreaView has been deprecated']);

export default function RootLayout() {
  // load font assets
  const [fontLoaded, fontError] = useFonts({
    new_astro_light: require('../assets/fonts/new_astro/new_astro_light.otf'),
    new_astro_medium: require('../assets/fonts/new_astro/new_astro_medium.otf'),
    new_astro_bold: require('../assets/fonts/new_astro/new_astro_bold.otf'),
    neue_haas_grotesk_reguler: require('../assets/fonts/neue_haas_grotesk/neue_haas_grotesk_reguler.ttf'),
    neue_haas_grotesk_medium: require('../assets/fonts/neue_haas_grotesk/neue_haas_grotesk_medium.ttf'),
    neue_haas_grotesk_bold: require('../assets/fonts/neue_haas_grotesk/neue_haas_grotesk_bold.ttf'),
  });

  // load image assets
  const [assets, assetsError] = useAssets([
    require('../assets/icons/google.svg'),
    require('../assets/icons/house.svg'),
    require('../assets/icons/plus.svg'),
    require('../assets/icons/archive.svg'),
    require('../assets/icons/house_fill.svg'),
    require('../assets/icons/plus_fill.svg'),
    require('../assets/icons/archive_fill.svg'),
  ]);

  const isFinishedLoading = (fontLoaded || fontError) && (assets || assetsError);

  useEffect(() => {
    if (isFinishedLoading) {
      SplashScreen.hideAsync();
    }
  }, [isFinishedLoading]);

  if (!isFinishedLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='(auth)/login' />
        <Stack.Screen name='(tabs)' />
      </Stack>
    </SafeAreaProvider>
  );
}
