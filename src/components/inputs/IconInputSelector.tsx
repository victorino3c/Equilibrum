import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';

interface IconInputProps {
  icon: JSX.Element;
  text: string;
  options: string[];
  selected: string | undefined;
  setSelected: (value: any) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const IconInputSelector = ({
  icon,
  text,
  style,
  selected,
  setSelected,
  options,
  textStyle,
}: IconInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
        {icon}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
      <Picker
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
        style={styles.pickerStyle}
        mode="dropdown">
        {options.map((option) => (
          <Picker.Item key={option} label={option} value={option} style={{ fontSize: 18 }} />
        ))}
      </Picker>
    </View>
  );
};

export default IconInputSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingVertical: 0,
    borderRadius: 100,
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
  pickerStyle: {
    flex: 4 / 5,
    color: '#6608ff',
  },
});
