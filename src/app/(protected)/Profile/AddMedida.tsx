import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { router, Stack } from 'expo-router';
import IconInputText from '~/src/components/inputs/IconInputText';

import { Feather, FontAwesome6 } from '@expo/vector-icons';
import moment from 'moment';
import AddImagen from '~/src/components/Medidas/AddMedida/AddImagen';
import IconInputSelector from '~/src/components/inputs/IconInputSelector';
import { tipoMedidaEnum } from '~/src/types/types';
import { medida_unidades } from '~/src/utils/medida_unidades';
import { medidasStore } from '@store/MedidasStore';

const datePickerIcon = <Feather name="calendar" size={24} color="black" />;

const AddMedida = () => {
  const { addMedida } = medidasStore();

  const [fecha, setFecha] = useState<string>(moment().format('YYYY-MM-DD'));
  const [medida, setMedida] = useState<keyof typeof medida_unidades>('Peso');
  const [value, setValue] = useState<number>(0);

  const getUnidades = (medida: keyof typeof medida_unidades) => {
    return medida_unidades[medida];
  };

  const handleAdd = () => {
    if (!isDateValid(fecha)) {
      Alert.alert('Fecha no es valida');
      return;
    }

    if (!Number.isInteger(Number(value)) || value <= 0) {
      Alert.alert('Valor no valido');
      return;
    }

    const new_medida = {
      id: '1',
      tipo_medida: medida as tipoMedidaEnum,
      fecha: fecha,
      valor: value,
      unidad: getUnidades(medida),
    };

    addMedida(new_medida);

    if (router.canGoBack()) {
      router.back();
    } else {
      router.navigate('/(protected)/Profile/Medidas');
    }
  };

  const isDateValid = (dateString: string): boolean => {
    return moment(dateString, 'YYYY-MM-DD', true).isValid();
  };

  return (
    <View>
      <Stack.Screen
        name="Profile/AddMedida"
        options={{
          headerShown: true,
          title: 'Añadir medida',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                handleAdd();
              }}
              style={{
                backgroundColor: '#6608ff',
                padding: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Añadir</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <IconInputText
        icon={datePickerIcon}
        inputText=""
        text="Fecha (y-m-d)"
        selected={fecha}
        style={{ marginTop: 20, marginHorizontal: 10 }}
        setSelected={setFecha}
      />
      <AddImagen />
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 20 }}>Medidas</Text>
      <IconInputSelector
        icon={<FontAwesome6 name="ruler" size={24} color="black" />}
        text="Tipo de medida"
        selected={medida}
        setSelected={setMedida}
        options={Object.values(tipoMedidaEnum).map((medida) => medida)}
        style={{ marginHorizontal: 10 }}
      />
      <IconInputText
        keyBoardType="numeric"
        icon={<Feather name="bar-chart" size={24} color="black" />}
        inputText={getUnidades(medida)}
        text="Valor"
        selected={value.toString()}
        style={{ marginHorizontal: 10 }}
        setSelected={setValue}
      />
    </View>
  );
};

export default AddMedida;
