import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';

type EjerciciosModalProps = {
  visible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const EjerciciosModal = ({ visible, setModalVisible }: EjerciciosModalProps) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setModalVisible(!visible);
        }}>
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
                <Text style={styles.headerButtonText}>Musculos</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Dimmed background
  },
  modalView: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#e5e5e5',
    borderRadius: 20,
  },
  modalText: {
    marginBottom: 15,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerButton: {
    flex: 1,
    marginHorizontal: 10,
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
});

export default EjerciciosModal;
