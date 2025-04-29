import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

import { Feather } from '@expo/vector-icons';

import appStore from '@store/AppStore';

const iconUser = <Feather name="user" size={26} color="#000" />;
const iconAccount = <Feather name="unlock" size={26} color="black" />;
const iconNotifications = <Feather name="bell" size={26} color="black" />;
const iconChevronDown = <Feather name="chevron-right" size={26} color="black" />;

const Cuenta = () => {
  const { notificaciones, setNotifiaciones } = appStore();

  return (
    <View style={styles.container}>
      <Link href="/(protected)/Profile/DetallesPerfil" asChild>
        <TouchableOpacity style={styles.item}>
          <View style={styles.itemLeft}>
            {iconUser}
            <Text style={styles.text}>Usuario</Text>
          </View>
          <View>{iconChevronDown}</View>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          {iconAccount}
          <Text style={styles.text}>Cuenta</Text>
        </View>
        <View>{iconChevronDown}</View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => setNotifiaciones(!notificaciones)}>
        <View style={styles.itemLeft}>
          {iconNotifications}
          <Text style={styles.text}>Notificaciones</Text>
        </View>
        <View>
          <Switch
            value={notificaciones}
            //onValueChange={setNotifiaciones}
            disabled
            trackColor={{ true: '#6608ff' }}
            thumbColor={notificaciones ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Cuenta;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
    gap: 15,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});
