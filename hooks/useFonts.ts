import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

const CUSTOM_FONTS = {
  montserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
}

export default function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const loadFontsAsync = async() => {
      await Font.loadAsync(CUSTOM_FONTS);
      setFontsLoaded(true);
    }
    loadFontsAsync()
  }, [])

  return fontsLoaded
}