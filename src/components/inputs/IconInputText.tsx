import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import React, { useState } from 'react';

interface IconInputTextProps {
  icon: JSX.Element;
  text: string;
  inputText: string;
  selected: string | undefined;
  setSelected: (value: any) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  keyBoardType?: KeyboardTypeOptions;
}

const IconInputText = ({
  icon,
  text,
  inputText,
  style,
  selected,
  setSelected,
  textStyle,
  keyBoardType,
}: IconInputTextProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
        {icon}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={setSelected}
        keyboardType={keyBoardType ? keyBoardType : 'ascii-capable'}>
        {selected}
      </TextInput>
      <Text style={styles.textInput}>{inputText}</Text>
    </View>
  );
};

export default IconInputText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
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
  textInput: {
    fontSize: 20,
    fontWeight: '400',
    color: '#6608ff',
  },
});
