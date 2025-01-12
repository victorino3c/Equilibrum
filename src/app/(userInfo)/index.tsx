import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

import { appStore } from '@store/AppStore';
import IconInputSelector from '~/src/components/inputs/IconInputSelector';

import { Generos } from 'src/types/types';

import { Feather } from '@expo/vector-icons';

const sobreTi = () => {
  const { setHasEnteredUserInfo } = appStore();

  const iconGender = <Feather name="user" size={24} color="#6608ff" />;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginHorizontal: 'auto' }}
        onPress={() => {
          setHasEnteredUserInfo(true);
        }}>
        <Text className="rounded-lg bg-blue-500 p-3 text-center text-xl">User info false</Text>
      </TouchableOpacity>
      <Text style={styles.titleText}>Sobre ti</Text>
      <IconInputSelector icon={iconGender} text="Genero" style={{ marginHorizontal: 20 }} />
    </View>
  );
};

export default sobreTi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 35,
    color: '#6608ff',
    fontWeight: '700',
    marginBottom: 20,
  },
});
