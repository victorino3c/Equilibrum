import { View, StyleSheet } from 'react-native';
import React from 'react';
import IconButton from '~/src/components/Buttons/IconButton';

import EjerciciosModal from '~/src/components/Ejercicio/Entrenamiento/EnCurso/EjerciciosModal';
import { appStore } from '~/src/store/store';

import { Feather, Ionicons } from '@expo/vector-icons';

const FooterEntrenamiento = () => {
  const sumIcon = <Feather name="plus-circle" size={45} color="#6608ff" />;
  const optionsIcon = <Ionicons name="options-outline" size={30} color="#6608ff" />;
  const descartarIcon = <Feather name="delete" size={30} color="#E34716" />;

  const { resetEntrenamiento } = appStore();

  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View>
      <EjerciciosModal visible={modalVisible} setModalVisible={setModalVisible} />
      <IconButton
        icon={sumIcon}
        text="Añadir ejercicio"
        style={{ marginBottom: 0 }}
        onPress={() => setModalVisible(true)}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <IconButton
          style={styles.botonesPequeños}
          textStyle={styles.botonOpcionesText}
          icon={optionsIcon}
          text="Opciones"
        />
        <IconButton
          style={[styles.botonesPequeños, { backgroundColor: '#FFBBB9' }]}
          textStyle={styles.botonBorrarText}
          icon={descartarIcon}
          onPress={() => resetEntrenamiento()} // TEMP
          text="Descartar entreno"
        />
      </View>
    </View>
  );
};

export default FooterEntrenamiento;

const styles = StyleSheet.create({
  botonesPequeños: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 10,
  },
  botonOpcionesText: {
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  botonBorrarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E34716',
    textAlign: 'center',
  },
});
