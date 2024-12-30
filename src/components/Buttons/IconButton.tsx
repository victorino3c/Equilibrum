import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

type IconButtonProps = {
  icon: JSX.Element;
  text: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
};

const IconButton = ({ icon, text, style, textStyle }: IconButtonProps) => {
  return (
    <TouchableOpacity style={[styles.empezarEntrenamiento, { ...style }]}>
      {icon}
      <Text style={[styles.buttonText, { ...textStyle }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  empezarEntrenamiento: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'white',
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
    color: '#6608ff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
