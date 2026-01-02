// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
// @ts-expect-error global.css is handled by the bundler; no types needed
import './global.css';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontLoaded, fontError] = useFonts({
    'new_astro': require('./assets/fonts/new_astro/new_astro_medium.otf'),
    'neue_haas_grotesk': require('./assets/fonts/neue_haas_grotesk/neue_haas_grotesk_medium.ttf'),
  });

  const [imageAssets, imageError] = useAssets([
    require('./assets/icons/google.png'),
  ]);

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    };
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <View className='flex-1'>
      <View className='absolute inset-0 justify-center items-center z-0'>
        <View className='mx-[30px] gap-y-[10px]'>
          <View>
            <Text className='font-new-astro text-5xl'>AI</Text>
            <Text className='font-new-astro text-5xl'>Expense Tracker</Text>
          </View>

          <View>
            <Text className='text-gray-999999 font-neue-haas-grotesk'>Menemukan ritme dalam setiap pengeluaran demi memetakan langkah finansial yang lebih terukur dan bermakna.</Text>
          </View>
        </View>
      </View>

      <View className='absolute bottom-10 w-full items-center z-10'>
        <View>
          <View>
            {imageAssets && <Image source={imageAssets[0]} />}
          </View>
        </View>
      </View>

      
      <StatusBar style="auto" />
    </View>
  );
}
