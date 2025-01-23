import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the check icon

interface CustomCheckboxProps {
  isChecked?: boolean;
  idSerie?: string;
  onToggle?: (idSerie: string, checked: boolean) => void;
}

const CustomCheckbox = ({ isChecked, idSerie, onToggle }: CustomCheckboxProps) => {
  const [checked, setChecked] = useState(isChecked || false);

  const toggleCheckbox = () => {
    const newChecked = typeof isChecked !== 'undefined' ? !isChecked : !checked;

    console.log('toggleCheckbox', idSerie, newChecked);

    setChecked(newChecked);
    onToggle?.(idSerie || '-1', newChecked);
  };

  return (
    <TouchableOpacity
      style={[styles.checkbox, checked ? styles.checked : styles.unchecked]}
      onPress={toggleCheckbox}
      activeOpacity={0.7}>
      <Ionicons name="checkmark" size={20} color={checked ? '#FFFFFF' : '#000'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 25, // Adjust size as needed
    aspectRatio: 1, // Aspect ratio 1:1
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#00C853', // Green color when selected
  },
  unchecked: {
    backgroundColor: 'transparent', // Transparent background
    borderWidth: 2,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#333333', // Dark gray border when unselected
  },
});

export default CustomCheckbox;
