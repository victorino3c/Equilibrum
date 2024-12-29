import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

//TEMP
import { EntrenamientosType, findEntrenamientoByDate } from '~/assets/ejercicio/entrenamientos';

type CabeceraDetallesEntrenamientoProps = {
  fecha: string;
  editar?: boolean;
};

const CabeceraDetallesEntrenamiento = ({ fecha, editar }: CabeceraDetallesEntrenamientoProps) => {
  const actual: EntrenamientosType | null = findEntrenamientoByDate(fecha);
  const [date, setDate] = useState(new Date(fecha));
  const [show, setShow] = useState(false);
  const [duracion, setDuracion] = useState(actual?.Duracion || '');

  if (!actual) {
    return null;
  }

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.tittle} editable={editar}>
        {actual.Nombre}
      </TextInput>
      {actual.Descripcion && (
        <TextInput style={styles.descripcion} editable={editar} multiline={true} numberOfLines={4}>
          {actual.Descripcion}
        </TextInput>
      )}
      <View style={styles.info}>
        <View style={{ flexDirection: 'row', gap: 10, alignContent: 'center' }}>
          <Feather name="calendar" size={24} color="#6608ff" />
          {editar ? (
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={[styles.text, editar && { color: '#6608ff' }]}>
                {moment(date).format('DD MMM, YYYY')}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.text, editar && { color: '#6608ff' }]}>
              {moment(fecha).format('DD MMM, YYYY')}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: 'row', gap: 10, alignContent: 'center' }}>
          <AntDesign name="clockcircleo" size={24} color="#6608ff" />
          {editar ? (
            <TextInput
              style={[styles.text, styles.textInput, editar && { color: '#6608ff' }]}
              value={duracion}
              onChangeText={setDuracion}
            />
          ) : (
            <Text style={[styles.text, editar && { color: '#6608ff' }]}>{duracion} h</Text>
          )}
        </View>
      </View>
      {show && <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />}
    </View>
  );
};

export default CabeceraDetallesEntrenamiento;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 15,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    padding: 0,
  },
  descripcion: {
    fontSize: 16,
    textAlignVertical: 'top',
  },
  info: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 20,
  },
  textInput: {
    padding: 0, // Ajusta el padding para que coincida con el Text
  },
});
