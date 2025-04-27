import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { valoresLogros } from '~/src/types/types';

export interface LogrosState {
  valores: valoresLogros;
  modifyValores: (valores: valoresLogros) => void;
  addValor: (valor: string, cantidad: number) => void;
  minusValor: (valor: string, cantidad: number) => void;
  changeValor: (valor: string, newValue: number) => void;
  updateValor: (newValores: valoresLogros) => void;
}

export const logrosStore = create<LogrosState>()(
  persist(
    (set, get) => ({
      valores: {
        volumenTotal: 0,
        distanciaTotal: 0,
        entrenamientosTotal: 0,
        caloriasConsumidasTotal: 0,
        proteinasTotal: 0,
        grasasTotal: 0,
        carbohidratosTotal: 0,
        diasObjetivoAgua: 0,
        diasObjetivoSueño: 0,
      },
      modifyValores: (valores) => {
        set({ valores: valores });
      },
      addValor: (valor, cantidad) => {
        set((state) => ({
          valores: {
            ...state.valores,
            [valor]: (state.valores[valor] || 0) + cantidad, // Add the cantidad to the existing value
          },
        }));
      },
      minusValor: (valor, cantidad) => {
        set((state) => ({
          valores: {
            ...state.valores,
            [valor]: Math.max((state.valores[valor] || 0) - cantidad, 0), // Subtract cantidad but ensure it doesn't go below 0
          },
        }));
      },
      changeValor: (valor, newValue) => {
        set((state) => ({
          valores: {
            ...state.valores,
            [valor]: newValue, // Replace the value of the specified "valor" with "newValue"
          },
        }));
      },
      updateValor: (newValores) => {
        set((state) => {
          //console.log('Before update:', state.valores);
          //console.log(newValores);
          const updatedValores = { ...state.valores, ...newValores };
          //console.log('After update:', updatedValores);
          return { valores: updatedValores };
        });
      },
    }),
    {
      name: 'logros-storage',
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
      onRehydrateStorage: (state: LogrosState) => {
        if (state) {
        }
      },
    }
  )
);

export default logrosStore;
