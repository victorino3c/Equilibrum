import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';

import { appStore } from '~/src/store/store';

//TEMP
import {
  findSeriesFuerzaByEntrenamientoAndEjercicio,
  getSeriesRutinaFuerzaByRutinaAndEjercicio,
  SerieFuerzaType,
} from '~/assets/ejercicio/entrenamientos';
import CustomCheckbox from '../../Utils/CustomCheckBox';

type CuerpoResumenEjercicioFuerzaProps = {
  actual?: boolean;
  idEjercicio: number;
  idEntrenamiento?: number;
  idRutina?: number;
  editar?: boolean;
};

const CuerpoResumenEjercicioFuerza = ({
  actual,
  idEjercicio,
  idEntrenamiento,
  idRutina,
  editar = false,
}: CuerpoResumenEjercicioFuerzaProps) => {
  const {
    getSeriesFuerzaByEjericio,
    updateSerieFuerzaPeso,
    updateSerieFuerzaRepeticiones,
    updateCheckSerie,
  } = appStore();

  if (!idRutina && !idEntrenamiento && !actual) {
    return <Text>No hay datos</Text>;
  }

  let series;
  if (!actual) {
    series = idEntrenamiento
      ? findSeriesFuerzaByEntrenamientoAndEjercicio(idEntrenamiento || -1, idEjercicio)
      : getSeriesRutinaFuerzaByRutinaAndEjercicio(idRutina || -1, idEjercicio);
  } else {
    series = getSeriesFuerzaByEjericio(idEjercicio);
  }
  return (
    <View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={styles.titulos}>
          <Text style={styles.cabecera}>SERIE</Text>
          <Text style={styles.cabecera}>REPS </Text>
          <Text style={styles.cabecera}>PESO </Text>
        </View>
        <View style={{ width: 25 }} />
      </View>
      <FlatList
        data={series as SerieFuerzaType[]}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.series}>
              <Text style={styles.datos}>{index + 1}</Text>
              <TextInput
                editable={editar}
                style={styles.datos}
                keyboardType="decimal-pad"
                onChangeText={(value) => updateSerieFuerzaRepeticiones(item.id, parseInt(value))}>
                {item.Repeticiones}
              </TextInput>
              <TextInput
                editable={editar}
                style={styles.datos}
                keyboardType="decimal-pad"
                onChangeText={(value) => updateSerieFuerzaPeso(item.id, parseInt(value))}>
                {item.Peso}
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

export default CuerpoResumenEjercicioFuerza;

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
