import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: object;
};

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height = 90,
  borderRadius = 15,
  style = {},
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    return () => pulse.stop(); // Clean up animation on unmount
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[styles.skeletonContainer, { width, height, borderRadius, opacity: pulseAnim }, style]}
    />
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    marginHorizontal: 10,
    marginBottom: 15,
    //borderRadius: 15,
    padding: 20,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Skeleton;
