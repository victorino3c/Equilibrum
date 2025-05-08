import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import UserCard from '@components/Profile/UserCard';
import Objetivos from '@components/Profile/Objetivos';
import InformacionDetallada from '@components/Profile/InformacionDetallada';
import IconButton from '@components/Buttons/IconButton';
import { useAuth } from '@providers/AuthProvider';

import { appStore } from '@store/AppStore';

const iconLogout = <Ionicons name="settings-outline" size={24} color="#d00" />;

const DetallesPerfil = () => {
  const { editar: editarParam } = useLocalSearchParams();
  const { setHasEnteredUserInfo } = appStore();
  const { signOut, session } = useAuth();

  const [editar, setEditar] = useState(editarParam === 'false');

  const handleButton = () => {
    Alert.alert('Confirmación', '¿Estás seguro de que deseas cerrar sesión?', [
      {
        text: 'Si',
        onPress: () => {
          handleSignOut();
        },
      },
      { text: 'No', style: 'cancel' },
    ]);
  };

  const handleSignOut = async () => {
    await signOut();
    setHasEnteredUserInfo(false);
  };

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
        name="Profile/DetallesPerfil"
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
      <IconButton
        icon={iconLogout}
        text="Cerrar sesión"
        onPress={handleButton}
        textStyle={{ color: '#d00' }}
        style={{ backgroundColor: '#fff' }}
      />
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
