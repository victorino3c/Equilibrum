import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

import { medidaType } from '~/src/types/types';

import { Database } from '~/src/database.types';

export interface MedidasState {
  medidas: medidaType[];
  addMedida: (medida: medidaType) => void;
  removeMedida: (id: string) => void;
  updateMedida: (id: string, updatedMedida: Partial<medidaType>) => void;
  clearMedidas: () => void;
  getMedidas: () => medidaType[];
  getMedidaById: (id: string) => medidaType | undefined;
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
      removeMedida: (id) => {
        set((state) => ({
          medidas: state.medidas.filter((medida) => medida.id !== id),
        }));
      },
      updateMedida: (id, updatedMedida) => {
        set((state) => ({
          medidas: state.medidas.map((medida) =>
            medida.id === id ? { ...medida, ...updatedMedida } : medida
          ),
        }));
      },
      clearMedidas: () => {
        set({ medidas: [] });
      },
      getMedidas: () => {
        return get().medidas;
      },
      getMedidaById: (id) => {
        return get().medidas.find((medida) => medida.id === id);
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
