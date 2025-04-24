import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const DetallesPerfil = () => {
  const data = useLocalSearchParams();

  return (
    <View>
      <Text>DetallesPerfil</Text>
    </View>
  );
};

export default DetallesPerfil;
