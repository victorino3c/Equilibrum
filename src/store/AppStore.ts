import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Generos, Peso, Distancia, ObjetivosNutricion } from 'src/types/types';

export interface RutinaState {
  idUsuario?: string;
  hasLogged: boolean;
  hasEnteredUserInfo: boolean;
  notificaciones: boolean;
  genero: Generos;
  peso: Peso;
  distancia: Distancia;
  nacimiento: Date;
  objetivosNutricion: ObjetivosNutricion;
  objetivoSueño: number;
  objetivoAgua: number;
  setNotifiaciones: (enabled: boolean) => void;
  setGenero: (genero: Generos) => void;
  setPeso: (peso: Peso) => void;
  setDistancia: (distancia: Distancia) => void;
  setNacimiento: (nacimiento: Date) => void;
  setObjetivoCalorias: (objetivoCalorias: number) => void;
  setObjetivoProteinas: (objetivoProteinas: number) => void;
  setObjetivoCarbohidratos: (objetivoCarbohidratos: number) => void;
  setObjetivoGrasas: (objetivoGrasas: number) => void;
  setObjetivoNutricion: (objetivosNutricion: ObjetivosNutricion) => void;
  setObjetivoSueño: (objetivoSueño: number) => void;
  setObjetivoAgua: (objetivoAgua: number) => void;
  setHasEnteredUserInfo: (hasEnteredUserInfo: boolean) => void;
}

export const appStore = create<RutinaState>()(
  persist(
    (set) => ({
      idUsuario: undefined,
      hasLogged: false,
      hasEnteredUserInfo: false,
      notificaciones: true,
      genero: Generos.Masculino,
      peso: Peso.Kilgramos,
      distancia: Distancia.Kilometros,
      nacimiento: new Date(),
      objetivosNutricion: {
        objetivoCalorias: 2200,
        objetivoProteinas: 100,
        objetivoCarbohidratos: 100,
        objetivoGrasas: 100,
      },
      objetivoSueño: 8,
      objetivoAgua: 3.3,
      setNotifiaciones: (enabled) => set((state) => ({ ...state, notificaciones: enabled })),
      setGenero: (genero) => set((state) => ({ ...state, genero })),
      setPeso: (peso) => set((state) => ({ ...state, peso })),
      setDistancia: (distancia) => set((state) => ({ ...state, distancia })),
      setNacimiento: (nacimiento) => set((state) => ({ ...state, nacimiento })),
      setObjetivoCalorias: (objetivoCalorias) =>
        set((state) => ({
          ...state,
          objetivosNutricion: { ...state.objetivosNutricion, objetivoCalorias },
        })),
      setObjetivoProteinas: (objetivoProteinas) =>
        set((state) => ({
          ...state,
          objetivosNutricion: { ...state.objetivosNutricion, objetivoProteinas },
        })),
      setObjetivoCarbohidratos: (objetivoCarbohidratos) =>
        set((state) => ({
          ...state,
          objetivosNutricion: { ...state.objetivosNutricion, objetivoCarbohidratos },
        })),
      setObjetivoGrasas: (objetivoGrasas) =>
        set((state) => ({
          ...state,
          objetivosNutricion: { ...state.objetivosNutricion, objetivoGrasas },
        })),
      setObjetivoNutricion: (objetivosNutricion) =>
        set((state) => ({ ...state, objetivosNutricion })),
      setObjetivoSueño: (objetivoSueño) => set((state) => ({ ...state, objetivoSueño })),
      setObjetivoAgua: (objetivoAgua) => set((state) => ({ ...state, objetivoAgua })),
      setHasEnteredUserInfo: (hasEnteredUserInfo) =>
        set((state) => ({ ...state, hasEnteredUserInfo })),
    }),
    {
      name: 'app-storage',
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
      onRehydrateStorage: (state: RutinaState) => {
        if (state) {
        }
      },
    }
  )
);

export default appStore;
