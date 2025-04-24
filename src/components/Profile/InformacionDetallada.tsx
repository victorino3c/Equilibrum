import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';

import { appStore } from '@store/AppStore';
import { getProfile } from '@api/profile';
import moment from 'moment';
import { useAuth } from '~/src/providers/AuthProvider';

interface ObjetivosProps {
  editar?: boolean;
}

const InformacionDetallada = ({ editar }: ObjetivosProps) => {
  const { nacimiento, genero } = appStore();
  const { session } = useAuth();

  const nacimientoDate = moment(new Date(nacimiento).toUTCString()).format('DD MMMM, YYYY');

  return (
    <View style={styles.container}>
      <View style={{ ...styles.objetivosContainer, justifyContent: 'space-between' }}>
        <View style={styles.objetivosContainer}>
          <Text style={styles.text}>Correo</Text>
        </View>
        <Text style={styles.objetivosText}>{session?.user.email}</Text>
      </View>
      <View style={{ ...styles.objetivosContainer, justifyContent: 'space-between' }}>
        <View style={styles.objetivosContainer}>
          <Text style={styles.text}>Nacimiento</Text>
        </View>
        <Text style={styles.objetivosText}>{nacimientoDate}</Text>
      </View>
      <View style={{ ...styles.objetivosContainer, justifyContent: 'space-between' }}>
        <View style={styles.objetivosContainer}>
          <Text style={styles.text}>Genero </Text>
        </View>
        <Text style={styles.objetivosText}>{genero}</Text>
      </View>
    </View>
  );
};

export default InformacionDetallada;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    gap: 10,
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
  objetivosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000',
    marginLeft: 10,
  },
  objetivosText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6608ff',
    marginLeft: 10,
    textAlign: 'right',
  },
});
