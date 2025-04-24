import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';

import { AntDesign, Feather } from '@expo/vector-icons';

import { getNumberEntrenamientos } from '@api/entrenamientos';
import { getProfile } from '@api/profile';
import { Link } from 'expo-router';

const UserCard = () => {
  const { data: entrenamientos } = getNumberEntrenamientos();
  const { data: profile } = getProfile();

  return (
    <View style={styles.container}>
      <View style={styles.imagenContainer}>
        <AntDesign name="user" size={65} color="grey" />
      </View>
      <View style={{ flex: 1, marginLeft: 10, alignSelf: 'center', gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {profile?.username
            ? profile.username.length > 25
              ? `${profile.username.slice(0, 25)}...`
              : profile.username
            : 'Bienvenido'}
        </Text>
        <Text style={{ fontSize: 14, color: 'gray' }}>#{entrenamientos || 0} entrenamientos</Text>
      </View>
      <View style={{ alignSelf: 'center', paddingRight: 10 }}>
        <Link href="/(protected)/Profile/DetallesPerfil?editar=true" asChild>
          <TouchableOpacity>
            <Feather name="edit-3" size={24} color="#6608ff" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imagenContainer: {
    width: 70,
    height: 70,
    backgroundColor: 'lightgray',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
