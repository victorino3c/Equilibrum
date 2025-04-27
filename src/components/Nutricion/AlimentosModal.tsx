import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons/';

import CustomInput from '~/src/components/Utils/CustomInput';
import { alimentoType } from '~/src/types/types';

import { useNutricionStore } from '@store/NutricionStore';
import logrosStore from '@store/LogrosStore';

type AlimentoModalProps = {
  visible: boolean;
  alimentos: alimentoType[] | undefined;
  alimentosPeriodo: alimentoType[] | undefined;
  periodo: 'Desayuno' | 'Comida' | 'Cena' | 'Snacks';
  setModalVisible: (visible: boolean) => void;
};

const AlimentosModal = ({
  visible,
  alimentos,
  alimentosPeriodo,
  periodo,
  setModalVisible,
}: AlimentoModalProps) => {
  const { addAlimento } = useNutricionStore();
  const { updateValor, valores } = logrosStore();
  const [cantidad, setCantidad] = useState<number>(1);
  const [selectedAlimento, setSelectedAlimento] = useState<alimentoType | null>(null);

  const handlePress = (id: string) => {
    const alimento = alimentos?.find((item) => item.id === id);

    if (alimentosPeriodo?.find((item) => item.id === id)) {
      alert('Este alimento ya fue agregado a este periodo');
      return;
    }

    if (alimento) {
      setSelectedAlimento(alimento);
    }
  };

  useEffect(() => {
    if (selectedAlimento) {
      addAlimento(periodo, { alimento: selectedAlimento, cantidad });

      const valor = {
        ...valores,
        ...{
          caloriasConsumidasTotal:
            valores.caloriasConsumidasTotal + (selectedAlimento.calorias || 0) * cantidad,
          proteinasTotal: valores.proteinasTotal + (selectedAlimento.proteina || 0) * cantidad,
          grasasTotal: valores.grasasTotal + (selectedAlimento.grasa || 0) * cantidad,
          carbohidratosTotal:
            valores.carbohidratosTotal + (selectedAlimento.carbohidratos || 0) * cantidad,
        },
      };

      updateValor(valor);
      setSelectedAlimento(null);
      setModalVisible(false);
    }
  }, [selectedAlimento]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setModalVisible(!visible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={() => setModalVisible(!visible)}>
                <Entypo name="circle-with-cross" size={24} color="#555" />
              </TouchableOpacity>
            </View>
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
            <ScrollView>
              <View
                style={[
                  styles.headerButton,
                  { marginHorizontal: 10, flex: 0, borderRadius: 15, marginBottom: 20 },
                ]}>
                {alimentos ? (
                  alimentos!.map((alimento, index) => (
                    <View key={index} style={{ margin: 10 }}>
                      <TouchableOpacity onPress={() => handlePress(alimento.id)}>
                        <View style={{ flexDirection: 'column', gap: 5 }}>
                          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <View style={styles.image}></View>
                            <Text style={styles.tituloAlimento}>{alimento.nombre}</Text>
                          </View>
                          <Text style={{ fontSize: 18, color: '#555' }}>
                            {alimento.calorias} kcal | {alimento.proteina} P |{' '}
                            {alimento.carbohidratos} C | {alimento.grasa} G
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text
                    style={{ textAlign: 'center', fontSize: 18, fontWeight: '500', margin: 20 }}>
                    No hay alimentos disponibles
                  </Text>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  modalView: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#e5e5e5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    marginVertical: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
  },
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

export default AlimentosModal;
