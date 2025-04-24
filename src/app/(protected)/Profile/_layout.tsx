import { Stack, router } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '@providers/AuthProvider';
import { Redirect, Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

export default function EjercicioLayout() {
  const { session } = useAuth();
  const insets = useSafeAreaInsets();

  if (!session) {
    return <Redirect href={'/(onboarding)'} />;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: 'transparent' }}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="DetallesPerfil">
        <Stack.Screen
          name="DetallesPerfil"
          options={{
            headerShown: true,
            title: 'Detalles Perfil',
            headerTitleAlign: 'center',
            headerRight: () => {
              return (
                <Link href="/(protected)/(tabs)/(profile)/Configuracion">
                  <Ionicons name="settings-outline" size={24} color="#000" />
                </Link>
              );
            },
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerItems: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botonGuardar: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    backgroundColor: '#6608ff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 90,
  },
});
