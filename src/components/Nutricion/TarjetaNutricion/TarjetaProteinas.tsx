import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';

import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import moment from 'moment';

type TarjetaDuracionProps = {
  username: string;
  fecha: string;
  calorias: number;
  proteinas: number;
  grasas: number;
  carbohidratos: number;
};

const TarjetaProteinas = (props: TarjetaDuracionProps) => {
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
          <Text style={styles.entrenamientoNumber}>
            {moment(props.fecha).format('DD MMM, YYYY').toLowerCase()}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={[styles.footerText, styles.seriesText, { fontSize: 55 }]}>P</Text>
        <Text style={styles.kcal}>{props.proteinas} g</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Ionicons name="flame-outline" size={30} color="#6608ff" />
          <Text style={styles.footerText}>{props.calorias} kcal</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={[styles.footerText, styles.seriesText]}>C</Text>
          <Text style={styles.footerText}>{props.carbohidratos} g</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={[styles.footerText, styles.seriesText]}>G</Text>
          <Text style={styles.footerText}>{props.grasas} g</Text>
        </View>
      </View>
    </View>
  );
};

export default TarjetaProteinas;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  logo: {
    height: 50,
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
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerText: {
    fontSize: 20,
  },
  seriesText: {
    fontSize: 30,
    fontWeight: '400',
    color: '#6608ff',
    marginTop: 0,
  },
});
