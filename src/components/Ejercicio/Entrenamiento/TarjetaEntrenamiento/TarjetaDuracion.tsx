import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';

import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

type TarjetaDuracionProps = {
  username: string;
  entrenamientoNumber: string;
  kcal: number;
  duration: string;
  weight: string;
  series: number;
};

const TarjetaDuracion = (props: TarjetaDuracionProps) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        width: Dimensions.get('window').width - 20,
        padding: 20,
      }}>
      <View style={styles.header}>
        <View style={styles.logo}></View>
        <View>
          <Text style={styles.username}>{props.username}</Text>
          <Text style={styles.entrenamientoNumber}>Entrenamiento #{props.entrenamientoNumber}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <FontAwesome name="clock-o" size={55} color="#6608ff" />
        <Text style={styles.kcal}>{props.duration} h</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Ionicons name="flame-outline" size={24} color="#6608ff" />
          <Text style={styles.footerText}>{props.kcal} kcal</Text>
        </View>
        <View style={styles.footerItem}>
          <MaterialIcons name="fitness-center" size={24} color="#6608ff" />
          <Text style={styles.footerText}>{props.weight}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={[styles.footerText, styles.seriesText]}>S</Text>
          <Text style={{ fontSize: 14 }}>{props.series} series</Text>
        </View>
      </View>
    </View>
  );
};

export default TarjetaDuracion;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  logo: {
    height: 40,
    aspectRatio: 1,
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: '500',
  },
  entrenamientoNumber: {
    fontSize: 14,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 70,
  },
  kcal: {
    fontSize: 40,
    fontWeight: '500',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    marginTop: 5,
    fontSize: 14,
  },
  seriesText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6608ff',
    marginTop: 0,
  },
});
