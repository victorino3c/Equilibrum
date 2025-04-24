import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

import { Feather } from '@expo/vector-icons';
import CustomInput from '@components/Utils/CustomInput';
import { useGetAlimentos } from '@api/nutricion';

const Alimentos = () => {
  const { data: alimentos } = useGetAlimentos();

  return (
    <View>
      <Stack.Screen
        name="Nutricion/Alimentos"
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: 'Alimentos',
        }}
      />

      <ScrollView style={{ flex: 1, paddingTop: 20 }}>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Periodo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Tipo</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 10, gap: 10, marginBottom: 20 }}>
          <CustomInput placeholder="Buscar alimento" style={{ flex: 1 }} />
          <View
            style={{
              backgroundColor: '#6608ff',
              height: 'auto',
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Feather name="search" size={24} color="white" />
          </View>
        </View>
        <View
          style={[
            styles.headerButton,
            { marginHorizontal: 10, flex: 0, borderRadius: 15, marginBottom: 20 },
          ]}>
          {alimentos ? (
            alimentos!.map((alimento, index) => (
              <View key={index} style={{ margin: 10 }}>
                <TouchableOpacity onPress={() => {}}>
                  <View style={{ flexDirection: 'column', gap: 5 }}>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                      <View style={styles.image}></View>
                      <Text style={styles.tituloAlimento}>{alimento.nombre}</Text>
                    </View>
                    <Text style={{ fontSize: 18, color: '#555' }}>
                      {alimento.calorias} kcal | {alimento.proteina} P | {alimento.carbohidratos} C
                      | {alimento.grasa} G
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500', margin: 20 }}>
              No hay alimentos disponibles
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Alimentos;

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
  },
  headerButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerButtonText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  tituloAlimento: {
    fontSize: 20,
    fontWeight: '500',
    color: '#6608ff',
  },
});
