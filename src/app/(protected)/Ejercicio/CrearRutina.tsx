import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { Feather, FontAwesome6 } from '@expo/vector-icons';
import IconButton from '~/src/components/Buttons/IconButton';
import EjerciciosModal from '~/src/components/Ejercicio/Entrenamiento/EnCurso/EjerciciosModal';

import { rutinaStore } from '~/src/store/RutinaStore';
import TarjetaEjercicio from '~/src/components/Ejercicio/Entrenamiento/EnCurso/TarjetaEjercicio';

const CrearRutina = () => {
  const {
    addRutina,
    getRutina,
    removeRutina,
    tituloNuevaRutina: titulo,
    setTituloNuevaRutina,
  } = rutinaStore();

  const [modalVisible, setModalVisible] = useState(false);

  const rutinas = getRutina('temp');

  useEffect(() => {
    addRutina({
      //Create a new rutina and when the user saves it, change the name to a unique name
      Nombre: 'temp',
      Ejercicios: [],
      SeriesCardio: [],
      SeriesFuerza: [],
      SeriesCalistenia: [],
    });
    return () => {
      removeRutina('temp');
    };
  }, []);

  return (
    <ScrollView>
      <EjerciciosModal visible={modalVisible} setModalVisible={setModalVisible} rutina="temp" />

      <Text style={styles.tituloText}>Titulo rutina</Text>
      <TextInput
        style={styles.tituloInput}
        onChangeText={(text) => setTituloNuevaRutina(text)}
        value={titulo}
      />

      <FlatList
        scrollEnabled={false}
        data={rutinas?.Ejercicios}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <TarjetaEjercicio key={item.id} rutina="temp" idEjercicio={item.id} showCheck={false} />
          </View>
        )}
      />

      <IconButton
        icon={<Feather name="plus-circle" size={45} color="#6608ff" />}
        text="Añadir Ejercicio"
        onPress={() => setModalVisible(!modalVisible)}
      />
    </ScrollView>
  );
};

export default CrearRutina;

const styles = StyleSheet.create({
  tituloInput: {
    backgroundColor: 'white',
    fontSize: 20,
    fontWeight: '500',
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
  tituloText: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 10,
    paddingTop: 15,
  },
});
