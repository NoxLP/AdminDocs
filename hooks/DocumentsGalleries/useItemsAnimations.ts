import { useRef } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

export default function useItemsAnimations() {
  const widthAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(1)).current;
  translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });
  const translateY = useRef(new Animated.Value(1)).current;
  translateY.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '20%'],
  });

  const shrink = () => {
    const animConfig: Animated.TimingAnimationConfig = {
      toValue: 0,
      duration: 450,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.sin),
    };
    Animated.timing(widthAnim, {
      toValue: 0.75,
      duration: 450,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.sin),
    }).start();
    Animated.timing(translateX, {
      toValue: 50,
      duration: 450,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.sin),
    }).start();
    Animated.timing(translateY, animConfig).start();
  };
  const grow = () => {
    const animConfig: Animated.TimingAnimationConfig = {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.sin),
    };
    Animated.timing(widthAnim, animConfig).start();
    Animated.timing(translateX, animConfig).start();
    Animated.timing(translateY, animConfig).start();
  };

  return { widthAnim, translateX, translateY, shrink, grow };
}
