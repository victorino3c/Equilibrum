import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';

import { entrenamientoStore } from '~/src/store/store';

//TEMP
import {
  findSeriesCalisteniaByEntrenamientoAndEjercicio,
  getSeriesRutinaCalisteniaByRutinaAndEjercicio,
  SerieCalisteniaType,
} from '~/assets/ejercicio/entrenamientos';
import CustomCheckbox from '../../Utils/CustomCheckBox';

type CuerpoResumenEjercicioCalisteniaProps = {
  actual?: boolean;
  idEjercicio: number;
  idEntrenamiento?: number;
  idRutina?: number;
  editar?: boolean;
};

const CuerpoResumenEjercicioCalistenia = ({
  actual,
  idEjercicio,
  idEntrenamiento,
  idRutina,
  editar = false,
}: CuerpoResumenEjercicioCalisteniaProps) => {
  const { getSeriesCalisteniaByEjericio, updateSerieCalisteniaRepeticiones, updateCheckSerie } =
    entrenamientoStore();

  if (!idRutina && !idEntrenamiento && !actual) {
    return <Text>No hay datos</Text>;
  }

  let series;
  if (!actual) {
    series = idEntrenamiento
      ? findSeriesCalisteniaByEntrenamientoAndEjercicio(idEntrenamiento || -1, idEjercicio)
      : getSeriesRutinaCalisteniaByRutinaAndEjercicio(idRutina || -1, idEjercicio);
  } else {
    series = getSeriesCalisteniaByEjericio(idEjercicio);
  }
  return (
    <View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={styles.titulos}>
          <Text style={styles.cabecera}>SERIE</Text>
          <Text style={styles.cabecera}>REPS </Text>
        </View>
        <View style={{ width: 25 }} />
      </View>
      <View style={styles.titulos}></View>
      <FlatList
        data={series as SerieCalisteniaType[]}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.series}>
              <Text style={styles.datos}>{index + 1}</Text>
              <TextInput
                editable={editar}
                style={styles.datos}
                keyboardType="decimal-pad"
                onChangeText={(value) =>
                  updateSerieCalisteniaRepeticiones(item.id, parseInt(value))
                }>
                {item.Repeticiones}
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

export default CuerpoResumenEjercicioCalistenia;

const styles = StyleSheet.create({
  cabecera: {
    fontWeight: 'light',
    fontSize: 18,
    //flex: 1,
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
