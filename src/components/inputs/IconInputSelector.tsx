import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import React from 'react';

interface IconInputProps {
  icon: JSX.Element;
  text: string;
  options?: string[];
  style?: ViewStyle;
  textStyle?: TextStyle;
  onSelect?: (option: string) => void;
}

const IconInputSelector = ({ icon, text, style, textStyle }: IconInputProps) => {
  return (
    <View style={[styles.container, style]}>
      {icon}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

export default IconInputSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});
