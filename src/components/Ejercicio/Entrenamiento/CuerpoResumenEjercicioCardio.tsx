import { View, Text, FlatList, StyleSheet } from 'react-native';

//TEMP
import { findSeriesCardioByEntrenamientoAndEjercicio } from '~/assets/ejercicio/entrenamientos';

type CuerpoResumenEjercicioCardioProps = {
  idEjercicio: number;
  idEntrenamiento: number | null;
};

const CuerpoResumenEjercicioCardio = ({
  idEjercicio,
  idEntrenamiento,
}: CuerpoResumenEjercicioCardioProps) => {
  const series =
    findSeriesCardioByEntrenamientoAndEjercicio(idEntrenamiento || -1, idEjercicio) || [];

  return (
    <View>
      <View style={styles.titulos}>
        <Text style={styles.cabecera}>SERIE </Text>
        <Text style={styles.cabecera}> DIST </Text>
        <Text style={styles.cabecera}>TIEMPO</Text>
        <Text style={styles.cabecera}> KCAL </Text>
      </View>
      <FlatList
        data={series}
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
