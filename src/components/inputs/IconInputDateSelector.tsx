import { View, Text, StyleSheet, ViewStyle, TextStyle, Button } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-ui-datepicker';
import moment from 'moment';

interface IconInputProps {
  icon: JSX.Element;
  text: string;
  selected: any;
  open?: boolean;
  setSelected: (value: any) => void;
  setOpen?: (value: boolean) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const IconInputDateSelector = ({
  icon,
  text,
  style,
  selected,
  open,
  setSelected,
  setOpen,
  textStyle,
}: IconInputProps) => {
  console.log(selected);
  return (
    <View style={[styles.container, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
        {icon}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
      <DatePicker
        mode="single"
        firstDayOfWeek={1}
        style={{ flex: 1 }}
        date={selected}
        onChange={({ date }) => {
          if (date) {
            setSelected(date);
          }
        }}
        locale="es"
      />
    </View>
  );
};

export default IconInputDateSelector;

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
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});
