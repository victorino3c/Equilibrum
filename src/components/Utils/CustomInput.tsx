import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

interface CustomInputProps {
  style?: any;
  textStyle?: any;
  placeholder: string;
  multiline?: boolean;
  nol?: number;
}

const CustomInput = ({
  style,
  textStyle,
  placeholder,
  multiline = false,
  nol = 1,
}: CustomInputProps) => {
  return (
    <View style={[styles.inputView, { ...style }]}>
      <TextInput style={[styles.text, { ...textStyle }]} multiline={multiline} numberOfLines={nol}>
        {placeholder}
      </TextInput>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputView: {
    padding: 5,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.14,
  },
  text: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },
});
