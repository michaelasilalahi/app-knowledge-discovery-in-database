import '../ReactotronConfig';
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useGoogleStore } from '@/auth/google/store/useGoogleStore';
import * as SplashScreen from 'expo-splash-screen';
// @ts-expect-error global.css is handled by the bundler; no types needed
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // load font assets
  const [fontLoaded, fontError] = useFonts({
    new_astro_light: require('../assets/fonts/new_astro/new_astro_light.otf'),
    new_astro_medium: require('../assets/fonts/new_astro/new_astro_medium.otf'),
    new_astro_bold: require('../assets/fonts/new_astro/new_astro_bold.otf'),
    montserrat_thin: require('../assets/fonts/montserrat/montserrat_thin.ttf'),
    montserrat_semibold: require('../assets/fonts/montserrat/montserrat_semibold.ttf'),
    montserrat_regular: require('../assets/fonts/montserrat/montserrat_regular.ttf'),
    montserrat_medium: require('../assets/fonts/montserrat/montserrat_medium.ttf'),
    montserrat_light: require('../assets/fonts/montserrat/montserrat_light.ttf'),
    montserrat_extralight: require('../assets/fonts/montserrat/montserrat_extralight.ttf'),
    montserrat_extrabold: require('../assets/fonts/montserrat/montserrat_extrabold.ttf'),
    montserrat_bold: require('../assets/fonts/montserrat/montserrat_bold.ttf'),
    montserrat_black: require('../assets/fonts/montserrat/montserrat_black.ttf'),
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
    require('../assets/icons/notification.svg'),
    require('../assets/icons/close.svg'),
    require('../assets/icons/switch_analysis.svg'),
    require('../assets/icons/arrow_right.svg'),
  ]);

  // ambil state login dari zustand
  const { isLoggedIn } = useGoogleStore();

  // hooks untuk navigasi
  const router = useRouter();
  const segments = useSegments();

  const isFinishedLoading =
    (fontLoaded || fontError) && (assets || assetsError);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '208194412142-bjorfp866lddjmqhlf6skdcndjifbk7v.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  // auto redirect
  useEffect(() => {
    if (!isFinishedLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isLoggedIn && inAuthGroup) {
      router.replace('/(tabs)');
    } else if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [isLoggedIn, segments, isFinishedLoading, router]);

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
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='(auth)/login' />
        <Stack.Screen name='(tabs)' />
        <Stack.Screen
          name='(setting)/setting'
          options={{
            headerShown: true,
            title: 'Pengaturan',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: 'white' },
            contentStyle: { backgroundColor: 'white' },
          }}
        />
        <Stack.Screen
          name='(notification)/notification'
          options={{
            headerShown: true,
            title: 'Notifikasi',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: 'white' },
            contentStyle: { backgroundColor: 'white' },
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
