import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import UserCard from '@components/Profile/UserCard';
import Objetivos from '@components/Profile/Objetivos';
import InformacionDetallada from '@components/Profile/InformacionDetallada';

const DetallesPerfil = () => {
  const { editar: editarParam } = useLocalSearchParams();

  const [editar, setEditar] = useState(editarParam === 'true');

  useEffect(() => {
    if (editarParam === 'true') {
      setEditar(true);
    } else {
      setEditar(false);
    }
  }, [editarParam]);

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Stack.Screen
        name="DetallesPerfil"
        options={{
          headerShown: true,
          title: 'Detalles Perfil',
          headerTitleAlign: 'center',
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => setEditar(!editar)}>
                {editar ? (
                  <Text style={{ color: '#6608ff', fontSize: 18, textAlign: 'center' }}>
                    Guardar
                  </Text>
                ) : (
                  <Ionicons name="settings-outline" size={24} color="#000" />
                )}
              </TouchableOpacity>
            );
          },
        }}
      />
      <UserCard editar={editar} />
      <Text style={styles.title}>Información detallada</Text>
      <InformacionDetallada editar={editar} />
      <Text style={styles.title}>Objetivos</Text>
      <Objetivos editar={editar} />
    </View>
  );
};

export default DetallesPerfil;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
});
