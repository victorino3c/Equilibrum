import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';

import { appStore } from '@store/AppStore';
import IconInputSelector from '@components/inputs/IconInputSelector';
import IconInputDateSelector from '@components/inputs/IconInputDateSelector';

import { Generos, Peso, Distancia } from 'src/types/types';

import { Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const sobreTi = () => {
  const {
    setHasEnteredUserInfo,
    genero,
    peso,
    distancia,
    nacimiento,
    setNacimiento,
    setDistancia,
    setGenero,
    setPeso,
  } = appStore();

  const [Fecha, setFecha] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const iconGender = <Feather name="user" size={26} color="#6608ff" />;
  const iconPeso = <MaterialCommunityIcons name="weight-kilogram" size={24} color="#6608ff" />;
  const iconDistancia = <Entypo name="ruler" size={24} color="#6608ff" />;
  const iconDate = <Feather name="calendar" size={24} color="#6608ff" />;

  return (
    <View style={styles.container}>
      {false && (
        <TouchableOpacity
          style={{ marginHorizontal: 'auto' }}
          onPress={() => {
            setHasEnteredUserInfo(true);
          }}>
          <Text className="rounded-lg bg-blue-500 p-3 text-center text-xl">User info false</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.titleText}>Sobre ti</Text>
      <IconInputSelector
        icon={iconGender}
        text="Genero"
        options={Object.keys(Generos)}
        style={{ marginHorizontal: 10 }}
        selected={genero}
        setSelected={setGenero}
      />
      {false && (
        <IconInputDateSelector
          icon={iconDate}
          text="Fecha nacimiento"
          style={{ marginHorizontal: 10, paddingVertical: 15 }}
          selected={nacimiento}
          setSelected={setNacimiento}
          open={open}
          setOpen={setOpen}
        />
      )}
      <IconInputSelector
        icon={iconPeso}
        text=" Unidades Peso"
        options={Object.keys(Peso)}
        style={{ marginHorizontal: 10 }}
        selected={peso}
        setSelected={setPeso}
      />
      <IconInputSelector
        icon={iconDistancia}
        text="Unidades Distancia"
        options={Object.keys(Distancia)}
        style={{ marginHorizontal: 10 }}
        selected={distancia}
        setSelected={setDistancia}
      />

      <Link href="/(userInfo)/objetivos" asChild>
        <TouchableOpacity style={styles.continuarButton} onPress={() => {}}>
          <Text style={{ color: 'white', fontSize: 30, fontWeight: '500' }}>Continuar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default sobreTi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 35,
    color: '#6608ff',
    fontWeight: '700',
    marginBottom: 20,
  },
  continuarButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#6608ff',
    borderRadius: 30,
    padding: 15,
    paddingHorizontal: 50,
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
