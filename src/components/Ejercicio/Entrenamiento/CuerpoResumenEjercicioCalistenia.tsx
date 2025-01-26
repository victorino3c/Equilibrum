import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';

import { entrenamientoStore } from '~/src/store/Entrenamientostore';
import rutinaStore from '~/src/store/RutinaStore';
import { getSeriesByEjercicioAndEntrenamiento } from '@api/series';

import { Database } from '~/src/database.types';

import CustomCheckbox from '../../Utils/CustomCheckBox';

type CuerpoResumenEjercicioCalisteniaProps = {
  actual?: boolean;
  idEjercicio: string;
  idEntrenamiento?: string;
  idRutina?: string;
  editar?: boolean;
  showCheck?: boolean;
};

const CuerpoResumenEjercicioCalistenia = ({
  actual,
  idEjercicio,
  idEntrenamiento,
  idRutina,
  editar = false,
  showCheck = true,
}: CuerpoResumenEjercicioCalisteniaProps) => {
  const { getSeriesCalisteniaByEjericio, updateSerieCalisteniaRepeticiones, updateCheckSerie } =
    entrenamientoStore();

  const { getSeriesByEjercicioAndRutina, updateSerieCalisteniaRutinaRepeticiones } = rutinaStore();

  if (!idRutina && !idEntrenamiento && !actual) {
    return <Text>No hay datos</Text>;
  }

  let series;
  if (!actual && !idRutina && idEntrenamiento) {
    series = getSeriesByEjercicioAndEntrenamiento(idEjercicio, idEntrenamiento, 'calistenia').data;
  } else if (typeof idRutina != 'undefined') {
    series = getSeriesByEjercicioAndRutina(idRutina, idEjercicio);
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
        {showCheck && <View style={{ width: 25 }} />}
      </View>
      <View style={styles.titulos}></View>
      <FlatList
        data={series as Database['public']['Tables']['series_calistenia']['Row'][]}
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
                    ? updateSerieCalisteniaRepeticiones(item.id!, parseInt(value))
                    : updateSerieCalisteniaRutinaRepeticiones(idRutina, item.id!, parseInt(value))
                }>
                {item.repeticiones}
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
