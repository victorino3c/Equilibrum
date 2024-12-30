import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

import { Feather, FontAwesome6 } from '@expo/vector-icons';
import IconButton from '../../../components/Buttons/IconButton';

import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

//TEMP
import {
  getEjerciciosByRutinaAndUser,
  getRutinaIdByNombre,
} from '~/assets/ejercicio/entrenamientos';
import ResumenEjercicio from '~/src/components/Ejercicio/Entrenamiento/ResumenEjercicio';

const DetallesRutina = () => {
  const [editar, setEditar] = React.useState(false);

  //Get arguments from URL
  const { rutina, usuario } = useLocalSearchParams();

  const rutinaStr = Array.isArray(rutina) ? rutina[0] : rutina;
  const usuarioStr = Array.isArray(usuario) ? usuario[0] : usuario;

  const ejercicios = getEjerciciosByRutinaAndUser(rutinaStr, usuarioStr);

  const icon = <Feather name="delete" size={45} color="#E34716" />;
  const iconSum = <Feather name="plus-circle" size={45} color="#6608ff" />;

  return (
    <ScrollView>
      <Stack.Screen
        name="Ejercicio/DetallesRutina"
        options={{
          headerShown: true,
          title: 'Rutina',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity>
              <Feather name="more-horizontal" size={25} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 10,
        }}>
        <View>
          <Text style={styles.fecha}>{rutina}</Text>
          <Text style={{ paddingLeft: 10 }}>Creado por {usuario}</Text>
        </View>
        <TouchableOpacity onPress={() => setEditar(!editar)}>
          {editar ? (
            <Text style={{ color: '#6608ff', fontSize: 18 }}>Guardar</Text>
          ) : (
            <FontAwesome6 name="edit" size={24} color="#6608ff" />
          )}
        </TouchableOpacity>
      </View>
      {editar ? (
        <IconButton
          icon={icon}
          text="Eliminar rutina"
          onPress={() => {}}
          textStyle={{ color: '#E34716' }}
          style={{ backgroundColor: '#FFBBB9', shadowColor: '#E34716' }}
        />
      ) : (
        <IconButton icon={iconSum} text="Empezar entrenamiento" onPress={() => {}} />
      )}

      <Text style={[styles.fecha, { paddingBottom: 15, flex: 1 }]}>Ejercicios</Text>
      <FlatList
        scrollEnabled={false}
        data={ejercicios}
        keyExtractor={(item) => item.Nombre}
        renderItem={({ item }) => (
          <ResumenEjercicio
            idEjercicio={item.id}
            idRutina={getRutinaIdByNombre(rutinaStr) || undefined}
            editar={editar}
          />
        )}
      />
    </ScrollView>
  );
};

export default DetallesRutina;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
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
  fecha: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 10,
    paddingTop: 15,
  },
  empezarEntrenamiento: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
    fontWeight: '700',
    color: '#6608ff',
  },
  separator: {
    height: 2,
    backgroundColor: '#dddddd',
  },
  empezarButton: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#6608ff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
