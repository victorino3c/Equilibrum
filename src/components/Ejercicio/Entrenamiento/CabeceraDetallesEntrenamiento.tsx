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

import { Database } from '~/src/database.types';
import Skeleton from '../../Utils/SkeletonView';

type CabeceraDetallesEntrenamientoProps = {
  entrenamiento: Database['public']['Tables']['entrenamiento']['Row'];
  loading?: boolean;
  editar?: boolean;
};

const CabeceraDetallesEntrenamiento = ({
  entrenamiento,
  loading = false,
  editar,
}: CabeceraDetallesEntrenamientoProps) => {
  const [date, setDate] = useState(moment(entrenamiento.fecha).toDate());
  const [show, setShow] = useState(false);
  const [duracion, setDuracion] = useState<string>(entrenamiento?.duracion?.toString() || '');

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  if (loading) {
    return <Skeleton height={160} />;
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.tittle} editable={editar}>
        {entrenamiento.titulo}
      </TextInput>
      {entrenamiento.notas && (
        <TextInput style={styles.descripcion} editable={editar} multiline={true} numberOfLines={4}>
          {entrenamiento.notas}
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
              {moment(entrenamiento.fecha).format('DD MMM, YYYY')}
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
