import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';

import { appStore } from '@store/AppStore';

import { Feather, Ionicons } from '@expo/vector-icons';
import IconInputText from '~/src/components/inputs/IconInputText';

const sobreTi = () => {
  const {
    setHasEnteredUserInfo,
    objetivoAgua,
    objetivosNutricion,
    objetivoSueño,
    setObjetivoAgua,
    setObjetivoCalorias,
    setObjetivoSueño,
  } = appStore();

  const iconFire = <Ionicons name="flame-outline" size={26} color="#FF6F15" />;
  const iconSueño = <Feather name="moon" size={26} color="#6608ff" />;
  const iconAgua = <Ionicons name="water-outline" size={26} color="#00BFFF" />;

  const handleEmpezar = () => {
    setHasEnteredUserInfo(true);
    //router.push('/(protected)/(tabs)/(health)');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <Text style={styles.titleText}>Tus objetivos</Text>
        <IconInputText
          icon={iconFire}
          text="Objetivo calorias"
          inputText="kcal"
          selected={objetivosNutricion.objetivoCalorias.toString()}
          setSelected={setObjetivoCalorias}
        />
        <IconInputText
          icon={iconSueño}
          text="Objetivo sueño"
          inputText="horas"
          selected={objetivoSueño.toString()}
          setSelected={setObjetivoSueño}
        />
        <IconInputText
          icon={iconAgua}
          text="Objetivo agua"
          inputText="litros"
          selected={objetivoAgua.toString()}
          setSelected={setObjetivoAgua}
        />
        <View style={styles.bottomArea}>
          <Link href="/(userInfo)">
            <Text style={styles.buttonText}>Atras</Text>
          </Link>
          <TouchableOpacity
            style={styles.continuarButton}
            onPress={() => {
              handleEmpezar();
            }}>
            <Text style={{ color: 'white', fontSize: 30, fontWeight: '500' }}>Empezar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: '#6608ff',
    borderRadius: 30,
    padding: 15,
    marginTop: 10,
    paddingHorizontal: 55,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomArea: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6608ff',
    textDecorationLine: 'underline',
  },
});
