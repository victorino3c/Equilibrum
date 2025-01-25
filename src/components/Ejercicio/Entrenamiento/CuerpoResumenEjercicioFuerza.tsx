import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';

import { entrenamientoStore } from '~/src/store/Entrenamientostore';
import rutinaStore from '~/src/store/RutinaStore';

import { SerieFuerzaType } from '~/src/types/types';

//TEMP
import { findSeriesFuerzaByEjercicio } from '~/assets/ejercicio/entrenamientos';
import CustomCheckbox from '../../Utils/CustomCheckBox';

type CuerpoResumenEjercicioFuerzaProps = {
  actual?: boolean;
  idEjercicio: string;
  idEntrenamiento?: number;
  idRutina?: string;
  editar?: boolean;
  showCheck?: boolean;
};

const CuerpoResumenEjercicioFuerza = ({
  actual,
  idEjercicio,
  idEntrenamiento,
  idRutina,
  editar = false,
  showCheck = true,
}: CuerpoResumenEjercicioFuerzaProps) => {
  const {
    getSeriesFuerzaByEjericio,
    updateSerieFuerzaPeso,
    updateSerieFuerzaRepeticiones,
    updateCheckSerie,
  } = entrenamientoStore();

  const {
    getSeriesByEjercicioAndRutina,
    updateSerieFuerzaRutinaPeso,
    updateSerieFuerzaRutinaRepeticiones,
  } = rutinaStore();

  if (typeof idRutina === 'undefined' && !idEntrenamiento && !actual) {
    return <Text>No hay datos</Text>;
  }

  let series;
  if (!actual && typeof idRutina === 'undefined' && idEntrenamiento) {
    series = findSeriesFuerzaByEjercicio(
      //TODO: Cambiar a api de supabase (busca por ej y ent)
      idEntrenamiento || -1,
      parseInt(idEjercicio)
    );
  } else if (typeof idRutina !== 'undefined') {
    series = getSeriesByEjercicioAndRutina(idRutina, idEjercicio);
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
        {showCheck && <View style={{ width: 25 }} />}
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
                onChangeText={(value) =>
                  typeof idRutina === 'undefined'
                    ? updateSerieFuerzaRepeticiones(item.id!, parseInt(value))
                    : updateSerieFuerzaRutinaRepeticiones(idRutina, item.id!, parseInt(value))
                }>
                {item.Repeticiones}
              </TextInput>
              <TextInput
                editable={editar}
                style={styles.datos}
                keyboardType="decimal-pad"
                onChangeText={(value) =>
                  typeof idRutina === 'undefined'
                    ? updateSerieFuerzaPeso(item.id!, parseInt(value))
                    : updateSerieFuerzaRutinaPeso(idRutina, item.id!, parseInt(value))
                }>
                {item.Peso}
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
