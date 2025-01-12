import { View, FlatList } from 'react-native';
import { entrenamientoStore } from '~/src/store/Entrenamientostore';
import FooterEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/EnCurso/FooterEntrenamiento';
import TarjetaEjercicio from '~/src/components/Ejercicio/Entrenamiento/EnCurso/TarjetaEjercicio';

import React, { memo } from 'react';

const Entrenamiento = () => {
  const { stopTimer, ejercicios } = entrenamientoStore();

  return (
    <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
      {/*ELEMENTOS*/}
      <FlatList
        keyboardDismissMode="on-drag"
        data={ejercicios}
        renderItem={({ item }) => <TarjetaEjercicio key={item.id} idEjercicio={item.id} />}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<FooterEntrenamiento />}
      />
    </View>
  );
};

export default Entrenamiento;
