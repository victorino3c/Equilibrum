import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { medidaType } from '~/src/types/types';
import moment from 'moment';

import { AntDesign } from '@expo/vector-icons';

interface HistorialMedidasProps {
  medida: string;
  medidas: medidaType[];
}

const calendarIcon = <AntDesign name="calendar" size={22} color="#6608ff" />;

const HistorialMedidas = ({ medida, medidas }: HistorialMedidasProps) => {
  if (medidas.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noItemsText}>No hay medidas</Text>
      </View>
    );
  }

  return (
    <FlatList
      scrollEnabled={false}
      style={{ flex: 1, paddingBottom: 20 }}
      data={medidas}
      columnWrapperStyle={{ gap: 20 }}
      contentContainerStyle={{ marginLeft: 20, marginRight: 40, marginTop: 20 }}
      numColumns={2}
      renderItem={({ item, index }) => {
        return (
          <View style={{ width: '50%' }}>
            <View
              style={{
                ...styles.itemView,
                ...(index % 2 ? { marginTop: '20%' } : { marginTop: 0 }),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                {calendarIcon}
                <Text style={{ color: '#6608ff', fontSize: 16 }}>
                  {moment(item.fecha).format('DD MMM, YYYY')}
                </Text>
              </View>
              <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 35 }}>
                  {item.valor} {item.unidad.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default HistorialMedidas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    elevation: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    padding: 20,
  },
  itemView: {
    width: '100%',
    aspectRatio: 3 / 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  noItemsText: {
    color: '#9f9f9f',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
