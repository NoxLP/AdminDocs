import { useRef } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

export default function useItemsAnimations() {
  const hideAnim = useRef(new Animated.Value(-70)).current;
  const doShowAnim = () => {
    Animated.timing(hideAnim, {
      toValue: -2,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.elastic(0.95),
    }).start();
  };
  const doHideAnim = () => {
    Animated.timing(hideAnim, {
      toValue: -80,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.sin),
    }).start();
  };

  return { hideAnim, doShowAnim, doHideAnim };
}
