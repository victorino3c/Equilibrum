import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

type IconButtonProps = {
  icon: JSX.Element;
  text: string;
  onPress?: () => void;
  style?: object;
  textStyle?: object;
};

const IconButtonPurple = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  IconButtonProps
>(({ icon, text, onPress, style, textStyle }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      style={{ ...styles.empezarEntrenamiento, ...style }}
      onPress={onPress}>
      {icon}
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
});

export default IconButtonPurple;

const styles = StyleSheet.create({
  empezarEntrenamiento: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#6608ff',
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 15,
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
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});
