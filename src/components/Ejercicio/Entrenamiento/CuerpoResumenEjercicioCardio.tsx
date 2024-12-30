import { View, Text, FlatList, StyleSheet } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

//TEMP
import {
  findSeriesCardioByEntrenamientoAndEjercicio,
  getSeriesRutinaCardioByRutinaAndEjercicio,
} from '~/assets/ejercicio/entrenamientos';

type CuerpoResumenEjercicioCardioProps = {
  idEjercicio: number;
  idEntrenamiento?: number;
  idRutina?: number;
};

const CuerpoResumenEjercicioCardio = ({
  idEjercicio,
  idEntrenamiento,
  idRutina,
}: CuerpoResumenEjercicioCardioProps) => {
  if (!idRutina && !idEntrenamiento) {
    return <Text>No hay datos</Text>;
  }
  const series = idEntrenamiento
    ? findSeriesCardioByEntrenamientoAndEjercicio(idEntrenamiento || -1, idEjercicio)
    : getSeriesRutinaCardioByRutinaAndEjercicio(idRutina || -1, idEjercicio);

  return (
    <View>
      <View style={styles.titulos}>
        <Text style={styles.cabecera}>SERIE </Text>
        <Text style={styles.cabecera}> DIST </Text>
        <Text style={styles.cabecera}>TIEMPO</Text>
        <Text style={styles.cabecera}> KCAL </Text>
      </View>
      <FlatList
        data={series as Array<{ Distancia: number; Tiempo: string; Calorias: number }>}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.titulos}>
              <Text style={styles.datos}>{index + 1}</Text>
              <Text style={styles.datos}>{item.Distancia}</Text>
              <Text style={styles.datos}>{item.Tiempo}</Text>
              <Text style={styles.datos}>{item.Calorias}</Text>
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
  },
  datos: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});
