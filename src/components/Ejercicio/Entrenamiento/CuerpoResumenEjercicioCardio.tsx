import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';

import { appStore } from '~/src/store/store';

//TEMP
import {
  findSeriesCardioByEntrenamientoAndEjercicio,
  getSeriesRutinaCardioByRutinaAndEjercicio,
  SerieCardioType,
} from '~/assets/ejercicio/entrenamientos';
import CustomCheckbox from '../../Utils/CustomCheckBox';

type CuerpoResumenEjercicioCardioProps = {
  actual?: boolean;
  idEjercicio: number;
  idEntrenamiento?: number;
  idRutina?: number;
  editar?: boolean;
};

const CuerpoResumenEjercicioCardio = ({
  actual,
  idEjercicio,
  idEntrenamiento,
  idRutina,
  editar = false,
}: CuerpoResumenEjercicioCardioProps) => {
  const {
    getSeriesCardioByEjericio,
    updateSerieCardioCalorias,
    updateSerieCardioTiempo,
    updateSerieCardioDistancia,
    updateCheckSerie,
  } = appStore();

  if (!idRutina && !idEntrenamiento && !actual) {
    return <Text>No hay datos</Text>;
  }

  let series;
  if (!actual) {
    series = idEntrenamiento
      ? findSeriesCardioByEntrenamientoAndEjercicio(idEntrenamiento || -1, idEjercicio)
      : getSeriesRutinaCardioByRutinaAndEjercicio(idRutina || -1, idEjercicio);
  } else {
    series = getSeriesCardioByEjericio(idEjercicio);
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={styles.titulos}>
          <Text style={styles.cabecera}>SERIE </Text>
          <Text style={styles.cabecera}> DIST </Text>
          <Text style={styles.cabecera}>TIEMPO</Text>
          <Text style={styles.cabecera}> KCAL </Text>
        </View>
        <View style={{ width: 25 }} />
      </View>
      <FlatList
        data={series as SerieCardioType[]}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.series}>
              <Text style={styles.datos}>{index + 1}</Text>
              <TextInput
                editable={editar}
                style={styles.datos}
                keyboardType="decimal-pad"
                onChangeText={(value) => updateSerieCardioDistancia(item.id, parseInt(value))}>
                {item.Distancia}
              </TextInput>
              <TextInput
                editable={editar}
                style={styles.datos}
                keyboardType="decimal-pad"
                onChangeText={(value) => updateSerieCardioTiempo(item.id, value)}>
                {item.Tiempo}
              </TextInput>
              <TextInput
                editable={editar}
                style={styles.datos}
                keyboardType="numeric"
                onChangeText={(value) => updateSerieCardioCalorias(item.id, parseInt(value))}>
                {item.Calorias}
              </TextInput>
              <View style={{ alignItems: 'flex-end' }}>
                <CustomCheckbox
                  idSerie={item.id}
                  isChecked={item.check}
                  onToggle={updateCheckSerie}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CuerpoResumenEjercicioCardio;

const styles = StyleSheet.create({
  cabecera: {
    fontWeight: 'light',
    fontSize: 18,
    textAlign: 'center',
  },
  titulos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    flex: 1,
  },
  series: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  datos: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});
