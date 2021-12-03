import { useRef } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

export default function useGalleryItemsAnimations() {
  const pressItemAnim = useRef(new Animated.Value(1)).current;
  const opacityItemAnim = useRef(new Animated.Value(1)).current;
  const duration = 100;

  const shrink = () => {
    Animated.timing(pressItemAnim, {
      toValue: 0.85,
      duration: duration,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.sin),
    }).start();
  };
  const grow = () => {
    Animated.timing(pressItemAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.sin),
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(opacityItemAnim, {
      toValue: 0.75,
      duration: duration,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.sin),
    }).start();
  };
  const fadeIn = (callback?: Animated.EndCallback) => {
    Animated.timing(opacityItemAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.sin),
    }).start(callback ? callback : undefined);
  };

  const doElasticPressAnim = () => {
    Animated.parallel([
      Animated.timing(opacityItemAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.sin),
      }),
      Animated.sequence([
        Animated.timing(pressItemAnim, {
          toValue: 0.85,
          duration: duration,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(pressItemAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.sin),
        }),
      ]),
    ]).start();
  };

  return {
    pressItemAnim,
    doElasticPressAnim,
    shrink,
    grow,
    opacityItemAnim,
    fadeIn,
    fadeOut,
  };
}
