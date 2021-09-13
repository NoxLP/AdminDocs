import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { useFonts, Montserrat_400Regular as montserratRegular } from "@expo-google-fonts/montserrat";

const CUSTOM_FONTS = {
  montserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
}

export default function App() {
  const queryClient = new QueryClient()

  const [fontsLoaded] = useFonts({montserratRegular})
  const isLoadingComplete = useCachedResources() && fontsLoaded;
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppearanceProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </QueryClientProvider>
      </AppearanceProvider>
    );
  }
}
