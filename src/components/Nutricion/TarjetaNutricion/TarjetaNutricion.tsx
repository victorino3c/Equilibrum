import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import TarjetaCalorias from './TarjetaCalorias';
import TarjetaProteinas from './TarjetaProteinas';

import AntDesign from '@expo/vector-icons/AntDesign';

//TEMP
import { findNutricionById, NutricionType } from '~/assets/nutricion/nutricion';

type TarjetaEntrenamientoProps = {
  idNutricion: number;
};

const TarjetaNutricion = ({ idNutricion }: TarjetaEntrenamientoProps) => {
  const renderItem = ({ item }: { item: JSX.Element }) => <View>{item}</View>;

  const [currentPage, setCurrentPage] = React.useState(0);

  const nutricion: NutricionType | null = findNutricionById(idNutricion);

  if (!nutricion) {
    return null;
  }

  const NutricionData = {
    username: nutricion.idUsuario,
    fecha: nutricion.fecha,
    calorias: nutricion.macros.Calorias,
    proteinas: nutricion.macros.Proteinas,
    grasas: nutricion.macros.Grasas,
    carbohidratos: nutricion.macros.Carbohidratos,
  };

  const data = [<TarjetaCalorias {...NutricionData} />, <TarjetaProteinas {...NutricionData} />];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        style={{ flex: 1 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        //keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        pagingEnabled
        decelerationRate="fast"
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const currentPage = Math.floor(contentOffsetX / 320);
          setCurrentPage(currentPage);
        }}
      />

      <View style={styles.puntos}>
        {data.map((item, index) => (
          <View
            key={index}
            style={[styles.punto, index === currentPage ? { backgroundColor: '#666666' } : {}]}
          />
        ))}
      </View>
      <View style={styles.actionButtons}>
        <AntDesign name="download" size={24} color="black" />
        <AntDesign name="sharealt" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    flex: 1,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  puntos: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  punto: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: '#AAAAAA',
    marginHorizontal: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: '35%',
  },
});

export default TarjetaNutricion;
