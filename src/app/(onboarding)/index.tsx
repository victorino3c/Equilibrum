import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

import IconButton from '@components/Buttons/IconButton';
import EntrenamientoOnboarding from '@components/Onboarding/entrenamiento';
import NutricionOnboarding from '~/src/components/Onboarding/nutricion';
import EquilibrioOnboaring from '~/src/components/Onboarding/equilibrio';

const iconoEmpezar = <AntDesign name="playcircleo" size={24} color="#6608ff" />;

const cardContent = [
  <View style={{ height: 370, width: 370 }} />,
  <EntrenamientoOnboarding />,
  <NutricionOnboarding />,
  <EquilibrioOnboaring />,
  <View style={{ height: 370, width: 370 }} />,
];
const overTittleContent: string[] = [
  'Bienvenido a',
  'Registra tu',
  'Registra tu',
  'Equilibra tu',
  'Sigue tu',
];
const mainTittleContent: string[] = [
  'Equilibrum',
  'Ejercicio',
  'Nutrición',
  'Ejercicio y Nutrición',
  'Progreso',
];
const subTextContent: string[] = [
  'Equilibrum permite llevar un estilo de vida saludable, equilibrando el ejercicio con la nutrición.',
  'Realiza un seguimiento de tus entrenamientos.',
  'Logra tus objetivos nutricionales registrando tus comidas.',
  'Equilibra el ejercicio con la nutrición, y mide tus niveles de sueño e hidratación.',
  'Sigue tus progresos registrándolos con imagenes.',
];

const onboarding = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const renderItem = ({ item }: { item: JSX.Element }) => <>{item}</>;

  const nextPage = () => {
    if (currentPage < cardContent.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View style={{ marginTop: 30, alignItems: 'flex-end', paddingRight: 20 }}>
        <Link href="/(onboarding)/signUp" style={styles.textButton}>
          Saltar
        </Link>
      </View>
      <View
        style={{
          flex: 1,
          //justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.titleTextView}>
          <Text style={styles.titleText}>{overTittleContent[currentPage]}</Text>
          <Text style={{ ...styles.titleText, fontWeight: 700 }}>
            {mainTittleContent[currentPage]}
          </Text>
        </View>
        <View style={styles.card}>
          <FlatList
            data={cardContent}
            style={{ flex: 1, padding: 0 }}
            //contentContainerStyle={{ marginHorizontal: 30 }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
            renderItem={renderItem}
            decelerationRate="fast"
            onScroll={(event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const cardWidth = event.nativeEvent.layoutMeasurement.width; // Dynamically get card width
              const currentPage = Math.floor(contentOffsetX / (cardWidth - 1));
              setCurrentPage(currentPage);
            }}
            scrollEventThrottle={16} // Ensure smooth scroll event handling
          />
        </View>
        <View style={styles.puntos}>
          {cardContent.map((item, index) => (
            <View
              key={index}
              style={[styles.punto, index === currentPage ? { backgroundColor: '#666666' } : {}]}
            />
          ))}
        </View>
        {currentPage === cardContent.length - 1 && (
          <Link href="/(onboarding)/signUp" asChild>
            <IconButton
              icon={iconoEmpezar}
              text="Empezar"
              onPress={() => {}}
              style={{ marginTop: 20 }}
            />
          </Link>
        )}
        <View style={styles.subTextView}>
          <Text style={styles.subText}>{subTextContent[currentPage]}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default onboarding;

const styles = StyleSheet.create({
  textButton: {
    color: '#6608ff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  titleText: {
    fontSize: 35,
    color: '#6608ff',
    letterSpacing: 1,
    marginBottom: 0,
    textAlign: 'center',
  },
  titleTextView: {
    marginTop: '10%',
    marginBottom: '10%',
  },
  card: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',

    //overflow: 'hidden',
    aspectRatio: 1,
    //flex: 1,
    backgroundColor: '#fff',
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
  subText: {
    textAlign: 'center',
    fontSize: 16,
  },
  subTextView: {
    width: '90%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  puntos: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  punto: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: '#AAAAAA',
    marginHorizontal: 5,
  },
});
