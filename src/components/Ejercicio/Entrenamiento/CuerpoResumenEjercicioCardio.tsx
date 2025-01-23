import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';

import { entrenamientoStore } from '~/src/store/Entrenamientostore';
import { rutinaStore } from '~/src/store/RutinaStore';

import { SerieCardioType } from '~/src/types/types';

//TEMP
import { findSeriesCardioByEntrenamientoAndEjercicio } from '~/assets/ejercicio/entrenamientos';
import CustomCheckbox from '../../Utils/CustomCheckBox';

type CuerpoResumenEjercicioCardioProps = {
  actual?: boolean;
  idEjercicio: string;
  idEntrenamiento?: number;
  idRutina?: string;
  editar?: boolean;
  showCheck?: boolean;
};

const CuerpoResumenEjercicioCardio = ({
  actual,
  idEjercicio,
  idEntrenamiento,
  idRutina,
  editar = false,
  showCheck = true,
}: CuerpoResumenEjercicioCardioProps) => {
  const {
    getSeriesCardioByEjericio,
    updateSerieCardioCalorias,
    updateSerieCardioTiempo,
    updateSerieCardioDistancia,
    updateCheckSerie,
  } = entrenamientoStore();

  const {
    getSeriesByEjercicioAndRutina,
    updateSerieCardioRutinaCalorias,
    updateSerieCardioRutinaTiempo,
    updateSerieCardioRutinaDistancia,
  } = rutinaStore();

  if (!idRutina && !idEntrenamiento && !actual) {
    return <Text>No hay datos</Text>;
  }

  let series;
  if (!actual && !idRutina && idEntrenamiento) {
    series = findSeriesCardioByEntrenamientoAndEjercicio(
      idEntrenamiento || -1,
      parseInt(idEjercicio)
    );
  } else if (typeof idRutina != 'undefined') {
    series = getSeriesByEjercicioAndRutina(idRutina, idEjercicio);
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
        {showCheck && <View style={{ width: 25 }} />}
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
                onChangeText={(value) =>
                  typeof idRutina === 'undefined'
                    ? updateSerieCardioDistancia(item.id!, parseInt(value))
                    : updateSerieCardioRutinaDistancia(idRutina, item.id!, parseInt(value))
                }>
                {item.Distancia}
              </TextInput>
              <TextInput
                editable={editar}
                style={styles.datos}
                //keyboardType="default"
                onChangeText={(value) =>
                  typeof idRutina === 'undefined'
                    ? updateSerieCardioTiempo(item.id!, value)
                    : updateSerieCardioRutinaTiempo(idRutina, item.id!, value)
                }>
                {item.Tiempo}
              </TextInput>
              <TextInput
                editable={editar}
                style={styles.datos}
                keyboardType="numeric"
                onChangeText={(value) =>
                  typeof idRutina === 'undefined'
                    ? updateSerieCardioCalorias(item.id!, parseInt(value))
                    : updateSerieCardioRutinaCalorias(idRutina, item.id!, parseInt(value))
                }>
                {item.Calorias}
              </TextInput>
              {showCheck && (
                <View style={{ alignItems: 'flex-end' }}>
                  <CustomCheckbox
                    idSerie={item.id}
                    isChecked={item.check}
                    onToggle={updateCheckSerie}
                  />
                </View>
              )}
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
