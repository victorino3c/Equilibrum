import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons/';

import { Link } from 'expo-router';

import { entrenamientoStore } from '~/src/store/Entrenamientostore';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { isRunning, resetEntrenamiento } = entrenamientoStore();

  const icons: { [key: string]: (props: any) => JSX.Element } = {
    '(exercise)': (props) => (
      <Text style={{ fontFamily: 'IcoMoon', fontSize: 24, color: props.color }}>&#xe901;</Text>
    ),
    '(nutrition)': (props) => (
      <Text style={{ fontFamily: 'IcoMoon', fontSize: 24, color: props.color }}>&#xe900;</Text>
    ),
    '(health)': (props) => <Feather name="home" size={24} {...props} />,
    '(profile)': (props) => <AntDesign name="user" size={24} {...props} />,
  };

  const iconFocused = '#ffffff';
  const iconUnfocused = '#777777';

  return (
    <View
      style={[
        styles.container,
        isRunning && { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
      ]}>
      <View>
        {isRunning && (
          <>
            <Text style={styles.enCursoText}>Entrenamiento en curso</Text>
            <View style={styles.enCursoView}>
              <Link href="/(protected)/Ejercicio/Entrenamiento" asChild>
                <TouchableOpacity style={styles.continuarButton}>
                  <Feather name="play-circle" size={24} color="#6608ff" />
                  <Text style={{ color: '#6608ff', fontSize: 18 }}>Continuar</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity style={styles.descartarButton} onPress={resetEntrenamiento}>
                <MaterialCommunityIcons name="cancel" size={24} color="#E34716" />
                <Text style={{ color: '#E34716', fontSize: 18, fontWeight: 'bold' }}>
                  Descartar
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={styles.tabbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              //console.log('route.name:', route.name); // Add this line for debugging
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          //console.log('route.name:', route.name); // Add this line for debugging

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <View style={isFocused ? styles.tabFocused : null}>
                {icons[route.name]
                  ? icons[route.name]({
                      color: isFocused ? iconFocused : iconUnfocused,
                    })
                  : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: '10%',
    paddingVertical: 15,
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    //opacity: 0.9,
    //overflow: 'hidden',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabFocused: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#6608ff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#66608ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  enCursoText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  enCursoView: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  continuarButton: {
    borderRadius: 15,
    flexDirection: 'row',
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descartarButton: {
    borderRadius: 15,
    backgroundColor: '#FFBBB9',
    paddingVertical: 10,
    flexDirection: 'row',
    flex: 1,
    gap: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBar;
