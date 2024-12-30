import { View, Text, FlatList, StyleSheet } from 'react-native';

//TEMP
import {
  findSeriesFuerzaByEntrenamientoAndEjercicio,
  getSeriesRutinaFuerzaByRutinaAndEjercicio,
} from '~/assets/ejercicio/entrenamientos';

type CuerpoResumenEjercicioFuerzaProps = {
  idEjercicio: number;
  idEntrenamiento?: number;
  idRutina?: number;
};

const CuerpoResumenEjercicioFuerza = ({
  idEjercicio,
  idEntrenamiento,
  idRutina,
}: CuerpoResumenEjercicioFuerzaProps) => {
  if (!idRutina && !idEntrenamiento) {
    return <Text>No hay datos</Text>;
  }
  const series = idEntrenamiento
    ? findSeriesFuerzaByEntrenamientoAndEjercicio(idEntrenamiento || -1, idEjercicio)
    : getSeriesRutinaFuerzaByRutinaAndEjercicio(idRutina || -1, idEjercicio);

  return (
    <View>
      <View style={styles.titulos}>
        <Text style={styles.cabecera}>SERIE</Text>
        <Text style={styles.cabecera}>REPS </Text>
        <Text style={styles.cabecera}>PESO </Text>
      </View>
      <FlatList
        data={series as Array<{ Repeticiones: number; Peso: number }>}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.titulos}>
              <Text style={styles.datos}>{index + 1}</Text>
              <Text style={styles.datos}>{item.Repeticiones}</Text>
              <Text style={styles.datos}>{item.Peso}</Text>
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
