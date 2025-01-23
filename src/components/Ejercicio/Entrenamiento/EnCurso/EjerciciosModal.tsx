import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons/';
import CustomInput from '~/src/components/Utils/CustomInput';

import { entrenamientoStore } from '~/src/store/Entrenamientostore';
import { rutinaStore } from '~/src/store/RutinaStore';

import { useGetEjercicios } from '@api/ejercicios';
import { supabase } from '@libs/supabase'; // Para llamadas directas a la API

import Skeleton from '@components/Utils/SkeletonView';

type EjerciciosModalProps = {
  visible: boolean;
  setModalVisible: (visible: boolean) => void;
  rutina?: string;
};

const EjerciciosModal = ({ visible, setModalVisible, rutina }: EjerciciosModalProps) => {
  const { addEjercicio } = entrenamientoStore();
  const { addEjercicioToRutina } = rutinaStore();

  const { data: ejercicios, isLoading } = useGetEjercicios();

  const [selectedEjercicio, setSelectedEjercicio] = useState<any | null>(null);
  const [loadingEjercicio, setLoadingEjercicio] = useState(false);

  const fetchEjercicioById = async (id: string) => {
    setLoadingEjercicio(true);
    try {
      const { data, error } = await supabase.from('ejercicios').select().eq('id', id).single();
      if (error) throw error;
      setSelectedEjercicio(data);
    } catch (error) {
      console.error('Error fetching ejercicio:', error);
    } finally {
      setLoadingEjercicio(false);
    }
  };

  useEffect(() => {
    if (selectedEjercicio) {
      if (rutina) {
        addEjercicioToRutina(rutina, selectedEjercicio);
      } else {
        addEjercicio(selectedEjercicio);
      }
      setSelectedEjercicio(null);
      setModalVisible(false);
    }
  }, [selectedEjercicio, rutina, addEjercicioToRutina, addEjercicio, setModalVisible]);

  const handlePress = (id: string) => {
    fetchEjercicioById(id); // Llamada a la API para obtener el ejercicio
  };

  if (isLoading) return <Skeleton height={90} />;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setModalVisible(!visible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ margin: 10 }}>
              <TouchableOpacity onPress={() => setModalVisible(!visible)}>
                <Entypo name="circle-with-cross" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerButton}>
                <Text style={styles.headerButtonText}>Material</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Text style={styles.headerButtonText}>Músculos</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, gap: 10, marginBottom: 20 }}>
              <CustomInput placeholder="Buscar ejercicio" style={{ flex: 1 }} />
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
                {ejercicios!.map((ejercicio, index) => (
                  <View key={index} style={{ margin: 10 }}>
                    <TouchableOpacity
                      onPress={() => handlePress(ejercicio.id)}
                      disabled={loadingEjercicio}>
                      <View style={{ flexDirection: 'row', gap: 10 }}>
                        <View style={styles.image} />
                        <View style={{ justifyContent: 'space-between' }}>
                          <Text style={styles.tituloEjercicio}>{ejercicio.nombre}</Text>
                          <Text>{ejercicio.musculos?.map((m) => `${m}, `)}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
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
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dimmed background
  },
  modalView: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#e5e5e5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
    marginHorizontal: 10,
    marginBottom: 15,
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
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
  },
  tituloEjercicio: {
    fontSize: 20,
    fontWeight: '500',
    color: '#6608ff',
  },
});

export default EjerciciosModal;
