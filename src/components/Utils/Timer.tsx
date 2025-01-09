import { View, Text, ViewStyle, TextStyle } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { appStore } from '~/src/store/store';
import { useFocusEffect } from 'expo-router';

interface TimerProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Timer = ({ style, textStyle }: TimerProps) => {
  const { seconds, isRunning, setIsRunning, setSeconds, formatTime } = appStore((state) => ({
    seconds: state.seconds,
    isRunning: state.isRunning,
    setIsRunning: state.setIsRunning,
    setSeconds: state.setSeconds,
    formatTime: state.formatTime,
  }));

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 999);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  useFocusEffect(
    useCallback(() => {
      startTimer();
      //return () => setIsRunning(false);
    }, [startTimer])
  );

  return (
    <View style={style}>
      <Text style={textStyle}>{formatTime(seconds)}</Text>
    </View>
  );
};

export default Timer;
