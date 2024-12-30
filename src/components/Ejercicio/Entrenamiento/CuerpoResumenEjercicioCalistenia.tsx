import { View, Text, FlatList, StyleSheet } from 'react-native';

//TEMP
import {
  findSeriesCalisteniaByEntrenamientoAndEjercicio,
  getSeriesRutinaCalisteniaByRutinaAndEjercicio,
} from '~/assets/ejercicio/entrenamientos';

type CuerpoResumenEjercicioCalisteniaProps = {
  idEjercicio: number;
  idEntrenamiento?: number;
  idRutina?: number;
};

const CuerpoResumenEjercicioCalistenia = ({
  idEjercicio,
  idEntrenamiento,
  idRutina,
}: CuerpoResumenEjercicioCalisteniaProps) => {
  if (!idRutina && !idEntrenamiento) {
    return <Text>No hay datos</Text>;
  }

  const series = idEntrenamiento
    ? findSeriesCalisteniaByEntrenamientoAndEjercicio(idEntrenamiento || -1, idEjercicio)
    : getSeriesRutinaCalisteniaByRutinaAndEjercicio(idRutina || -1, idEjercicio);

  return (
    <View>
      <View style={styles.titulos}>
        <Text style={styles.cabecera}>SERIE</Text>
        <Text style={styles.cabecera}>REPS </Text>
      </View>
      <FlatList
        data={series as Array<{ Repeticiones: number }>}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.titulos}>
              <Text style={styles.datos}>{index + 1}</Text>
              <Text style={styles.datos}>{item.Repeticiones}</Text>
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
    textAlign: 'center',
  },
  titulos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  datos: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
