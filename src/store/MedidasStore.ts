import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

import { medidaType, tipoMedidaEnum } from '~/src/types/types';

export interface MedidasState {
  medidas: medidaType[];
  addMedida: (medida: medidaType) => void;
  removeMedida: (fecha: string, tipo: tipoMedidaEnum, valor: number) => void;
  updateMedida: (
    fecha: string,
    tipo: tipoMedidaEnum,
    valor: number,
    updatedMedida: Partial<medidaType>
  ) => void;
  clearMedidas: () => void;
  getMedidas: () => medidaType[];
  getMedidaByDate: (date: string) => medidaType | undefined;
  getMedidaByType: (type: string) => medidaType | undefined;
}

export const medidasStore = create<MedidasState>()(
  persist(
    (set, get) => ({
      medidas: [],
      addMedida: (medida) => {
        set((state) => ({
          medidas: [...state.medidas, { ...medida, id: uuid.v4() }],
        }));
      },
      removeMedida: (fecha, tipo, valor) => {
        set((state) => ({
          medidas: state.medidas.filter(
            (medida) =>
              !(medida.fecha === fecha && medida.tipo_medida === tipo && medida.valor === valor)
          ),
        }));
      },
      updateMedida: (fecha, tipo, valor, updatedMedida) => {
        set((state) => ({
          medidas: state.medidas.map((medida) =>
            medida.fecha === fecha && medida.valor === valor && medida.tipo_medida === tipo
              ? { ...medida, ...updatedMedida }
              : medida
          ),
        }));
      },
      clearMedidas: () => {
        set({ medidas: [] });
      },
      getMedidas: () => {
        return get().medidas;
      },
      getMedidaByDate: (date) => {
        return get().medidas.find((medida) => medida.fecha === date);
      },
      getMedidaByType: (type) => {
        return get().medidas.find((medida) => medida.tipo_medida === type);
      },
    }),
    {
      name: 'medidas-storage',
      storage: {
        getItem: async (key) => {
          const item = await AsyncStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
      onRehydrateStorage: (state: MedidasState) => {
        if (state) {
        }
      },
    }
  )
);

export default medidasStore;
