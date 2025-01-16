import { View, Text, StyleSheet, ViewStyle, TextStyle, TextInput } from 'react-native';
import React, { useState } from 'react';

interface IconInputTextLeftProps {
  icon: JSX.Element;
  selected: string | undefined;
  placeholder?: string;
  password?: boolean;
  setSelected: (value: any) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const IconInputTextLeft = ({
  icon,
  style,
  selected,
  placeholder,
  password = false,
  setSelected,
  textStyle,
}: IconInputTextLeftProps) => {
  return (
    <View style={[styles.container, style]}>
      {icon}
      <TextInput
        style={[styles.textInput, textStyle]}
        secureTextEntry={password}
        placeholder={placeholder}
        value={selected}
        onChangeText={setSelected}></TextInput>
    </View>
  );
};

export default IconInputTextLeft;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 0,
    borderRadius: 10,
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
  textInput: {
    fontSize: 20,
    fontWeight: '400',
    flex: 1,
  },
});
