import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Skeleton from '../Utils/SkeletonView';

type ThreeOptionsProps = {
  option1: string;
  option2: string;
  option3: string;
  style?: object;
  method: (value: string) => void;
  selected: string;
  loading?: boolean;
};

const ThreeOptionsButton = ({
  option1,
  option2,
  option3,
  method,
  selected,
  style,
  loading = false,
}: ThreeOptionsProps) => {
  if (loading) {
    return <Skeleton height={45} />;
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.button, selected === option1 && { backgroundColor: '#6608ff' }]}
        onPress={() => method(option1)}>
        <Text
          style={[styles.text, selected === option1 && { fontWeight: 'bold', color: '#ffffff' }]}>
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selected === option2 && { backgroundColor: '#6608ff' }]}
        onPress={() => method(option2)}>
        <Text
          style={[styles.text, selected === option2 && { fontWeight: 'bold', color: '#ffffff' }]}>
          {option2}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selected === option3 && { backgroundColor: '#6608ff' }]}
        onPress={() => method(option3)}>
        <Text
          style={[styles.text, selected === option3 && { fontWeight: 'bold', color: '#ffffff' }]}>
          {option3}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThreeOptionsButton;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
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
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
